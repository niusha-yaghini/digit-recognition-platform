
import torch
from model import DigitClassifier
from predict import load_model, predict_digit

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


def test_prediction_returns_valid_digit() -> None:
    model = load_model()
    image = torch.rand(1, 1, 28, 28)

    prediction = predict_digit(model, image)

    assert isinstance(prediction, int)
    assert 0 <= prediction <= 9


def test_prediction_rejects_invalid_input_shape() -> None:
    model = load_model()
    invalid_image = torch.rand(1, 28, 28)

    try:
        predict_digit(model, invalid_image)
    except ValueError as error:
        assert "Expected an image tensor" in str(error)
    else:
        raise AssertionError("Expected ValueError for invalid input shape")
