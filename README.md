# Digit Recognition Platform

A full-stack machine learning project for recognizing handwritten digits, built to explore the end-to-end process of developing, deploying, and maintaining an ML-powered web application.

## Project Goal

The goal of this project is to build a simple web application that allows users to upload an image of a handwritten digit and receive a prediction from a machine learning model.

Beyond model development, this project focuses on learning how to integrate machine learning into a real-world software system using APIs, containerization, automated testing, and CI/CD practices.

## Core Features

- **Handwritten Digit Recognition:** Predict digits from 0 to 9 using a labeled dataset.
- **Image Upload:** Allow users to upload an image for prediction.
- **Input Validation:** Validate uploaded files and reject unsupported or invalid inputs.
- **Sample Explorer:** Display four randomly selected labeled images from the dataset.
- **Interactive Predictions:** Reveal the correct label when a user selects a sample image.
- **Shuffle Samples:** Load four new random samples on demand.

## Technology Stack

- **Machine Learning:** Python and a suitable ML framework
- **ML API:** FastAPI
- **Backend:** Node.js and Express
- **Frontend:** React
- **Containerization:** Docker and Docker Compose
- **Testing:** Automated tests for the frontend, backend, and ML service
- **CI/CD:** GitHub Actions

*Technologies and tools will be introduced incrementally as the project develops.*

## Architecture

The application will consist of three main services:

1. **Frontend:** A React interface for uploading images, viewing predictions, and exploring sample images.
2. **Backend API:** A Node.js and Express service that communicates with the frontend and the ML service.
3. **ML Service:** A Python and FastAPI service responsible for loading the trained model, validating prediction requests, and returning results.

Docker Compose will be used to run the services together in a consistent development environment.

## Development Workflow

This project follows a pull-request-based development workflow:

- Create a dedicated branch for each feature or fix.
- Make small, focused commits.
- Push the branch to GitHub and open a Pull Request.
- Run automated tests and CI checks.
- Merge into `main` only after the required checks pass and the changes are reviewed.

GitHub Actions will be configured to automate testing and, as the project matures, support the deployment pipeline.

## Learning Objectives

- Build and evaluate a machine learning model.
- Design and consume REST APIs.
- Integrate Python services with a Node.js backend.
- Develop a React frontend.
- Containerize applications with Docker.
- Write and run automated tests.
- Implement CI/CD pipelines with GitHub Actions.
- Practice Git branching, pull requests, code review, and release workflows.

## Project Status

**Status:** Initial setup

The application, model, tests, and deployment pipeline will be developed incrementally.

## License

To be determined.
