
from io import BytesIO

import pytest
from fastapi.testclient import TestClient
from PIL import Image

import app as api
from model import DigitClassifier


@pytest.fixture
def client(monkeypatch):
    # Use an untrained model so API tests don't depend on model artifacts.
    monkeypatch.setattr(
        api,
        "load_model",
        lambda: DigitClassifier(),
    )

    with TestClient(api.app) as test_client:
        yield test_client


def create_test_image() -> bytes:
    image = Image.new("L", (28, 28), color=0)
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    return buffer.getvalue()


def test_health_endpoint(client):
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_predict_accepts_valid_image(client):
    image_bytes = create_test_image()

    response = client.post(
        "/predict",
        files={
            "file": (
                "digit.png",
                image_bytes,
                "image/png",
            )
        },
    )

    assert response.status_code == 200

    result = response.json()
    assert isinstance(result["digit"], int)
    assert 0 <= result["digit"] <= 9
    assert 0.0 <= result["confidence"] <= 1.0


def test_predict_rejects_unsupported_content_type(client):
    response = client.post(
        "/predict",
        files={
            "file": (
                "notes.txt",
                b"hello",
                "text/plain",
            )
        },
    )

    assert response.status_code == 415


def test_predict_rejects_empty_file(client):
    response = client.post(
        "/predict",
        files={
            "file": (
                "empty.png",
                b"",
                "image/png",
            )
        },
    )

    assert response.status_code == 400


def test_predict_rejects_corrupt_image(client):
    response = client.post(
        "/predict",
        files={
            "file": (
                "broken.png",
                b"this is not an image",
                "image/png",
            )
        },
    )

    assert response.status_code == 400


def test_predict_rejects_oversized_file(client):
    oversized_content = b"x" * (api.MAX_FILE_SIZE + 1)

    response = client.post(
        "/predict",
        files={
            "file": (
                "large.png",
                oversized_content,
                "image/png",
            )
        },
    )

    assert response.status_code == 413
