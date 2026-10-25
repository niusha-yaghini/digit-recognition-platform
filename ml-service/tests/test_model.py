
import torch

from model import DigitClassifier


def test_model_output_shape() -> None:
    model = DigitClassifier()
    images = torch.randn(4, 1, 28, 28)

    predictions = model(images)

    assert predictions.shape == (4, 10)


def test_model_outputs_finite_values() -> None:
    model = DigitClassifier()
    images = torch.randn(4, 1, 28, 28)

    predictions = model(images)

    assert torch.isfinite(predictions).all().item()
