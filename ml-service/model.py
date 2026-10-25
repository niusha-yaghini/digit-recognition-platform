
import torch
from torch import nn


class DigitClassifier(nn.Module):
    """A simple neural network for handwritten digit classification."""

    def __init__(self) -> None:
        super().__init__()

        self.network = nn.Sequential(
            nn.Flatten(),
            nn.Linear(28 * 28, 128),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, 10),
        )

    def forward(self, images: torch.Tensor) -> torch.Tensor:
        return self.network(images)
