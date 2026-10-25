
from pathlib import Path

import torch

from model import DigitClassifier


MODEL_PATH = (
    Path(__file__).resolve().parent
    / "artifacts"
    / "mnist_model.pth"
)


def load_model(
    model_path: Path = MODEL_PATH,
) -> DigitClassifier:
    """Load a trained digit classifier from a state dictionary."""

    if not model_path.is_file():
        raise FileNotFoundError(
            f"Trained model not found: {model_path}"
        )

    model = DigitClassifier()

    state_dict = torch.load(
        model_path,
        map_location="cpu",
        weights_only=True,
    )

    model.load_state_dict(state_dict)
    model.eval()

    return model


def predict_digit(
    model: DigitClassifier,
    image: torch.Tensor,
) -> int:
    """Predict a digit from a preprocessed 28x28 grayscale image."""

    if image.shape != (1, 1, 28, 28):
        raise ValueError(
            "Expected an image tensor with shape (1, 1, 28, 28)."
        )

    model.eval()

    with torch.no_grad():
        logits = model(image)
        predicted_digit = logits.argmax(dim=1).item()

    return int(predicted_digit)
