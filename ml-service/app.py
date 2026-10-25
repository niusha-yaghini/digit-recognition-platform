
from contextlib import asynccontextmanager
from io import BytesIO

import torch
from fastapi import FastAPI, File, HTTPException, UploadFile
from PIL import Image, UnidentifiedImageError
from torchvision import transforms

from predict import load_model, predict_digit


MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB

preprocess = transforms.Compose(
    [
        transforms.Grayscale(num_output_channels=1),
        transforms.Resize((28, 28)),
        transforms.ToTensor(),
    ]
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.model = load_model()
    yield


app = FastAPI(
    title="Digit Recognition API",
    description="API for handwritten digit classification.",
    version="0.1.0",
    lifespan=lifespan,
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if file.content_type not in {
        "image/png",
        "image/jpeg",
    }:
        raise HTTPException(
            status_code=415,
            detail="Only PNG and JPEG images are supported.",
        )

    contents = await file.read(MAX_FILE_SIZE + 1)

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="Image must be 5 MB or smaller.",
        )

    if not contents:
        raise HTTPException(
            status_code=400,
            detail="Uploaded image is empty.",
        )

    try:
        with Image.open(BytesIO(contents)) as image:
            image.load()
            image_tensor = preprocess(image).unsqueeze(0)
    except (
        UnidentifiedImageError,
        OSError,
        ValueError,
    ):
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is not a valid image.",
        ) from None

    model = app.state.model

    prediction = predict_digit(model, image_tensor)

    with torch.no_grad():
        logits = model(image_tensor)
        probabilities = torch.softmax(logits, dim=1)
        confidence = probabilities[0, prediction].item()

    return {
        "digit": prediction,
        "confidence": round(confidence, 4),
    }
