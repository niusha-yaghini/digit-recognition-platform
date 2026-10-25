
import random

import torch
from torchvision import datasets, transforms

from predict import load_model, predict_digit


def main() -> None:
    dataset = datasets.MNIST(
        root="data",
        train=False,
        download=False,
        transform=transforms.ToTensor(),
    )

    model = load_model()
    rng = random.Random(42)

    indices = rng.sample(range(len(dataset)), 4)

    correct = 0

    print("\nPredictions on real MNIST test images\n")

    for index in indices:
        image, true_label = dataset[index]
        prediction = predict_digit(model, image.unsqueeze(0))

        is_correct = prediction == true_label
        correct += int(is_correct)

        print(
            f"Index: {index:5d} | "
            f"True label: {true_label} | "
            f"Prediction: {prediction} | "
            f"{'PASS' if is_correct else 'WRONG'}"
        )

    print(f"\nSample accuracy: {correct}/4 ({correct / 4:.0%})")


if __name__ == "__main__":
    main()
