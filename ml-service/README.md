# Digit Recognition ML Service

A containerized Machine Learning API for handwritten digit recognition using PyTorch, FastAPI, and Docker.

This service receives handwritten digit images, processes them using a trained deep learning model, and returns prediction results through a REST API.

## 1. Project Overview

The ML service is responsible for:

- Loading the trained MNIST classification model.
- Processing and validating uploaded images.
- Predicting handwritten digits (0–9).
- Exposing predictions through a REST API.
- Running inside a Docker container.
- Supporting automated testing and CI validation through GitHub Actions.

### Technology Stack

| Technology | Purpose |
|---|---|
| Python 3.10 | Main programming language |
| PyTorch | Deep Learning framework |
| Torchvision | Image processing utilities |
| FastAPI | REST API development |
| Uvicorn | ASGI server |
| Pytest | Automated testing |
| Docker | Containerization |
| Docker Compose | Container orchestration |
| GitHub Actions | Continuous Integration |

## 2. Project Structure

```text
ml-service/
│
├── artifacts/
│   └── mnist_model.pth
│
├── tests/
│   ├── test_api.py
│   └── test_model.py
│
├── app.py
├── model.py
├── predict.py
├── requirements.txt
├── Dockerfile
├── .dockerignore
└── README.md
```

### Main Files

- `model.py`: Defines the neural network architecture.
- `predict.py`: Handles model loading and image prediction.
- `app.py`: Implements the FastAPI application and API endpoints.
- `artifacts/mnist_model.pth`: Contains the trained model weights.
- `tests/`: Contains automated API and model tests.
- `Dockerfile`: Defines the Docker image build process.
- `.dockerignore`: Excludes unnecessary files from the Docker build context.

## 3. API Endpoints

The service currently provides two endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Checks whether the API is running. |
| POST | `/predict` | Accepts an image and returns the prediction. |

### Interactive API Documentation

After starting the service, open:

```text
http://localhost:8000/docs
```

FastAPI automatically generates interactive Swagger documentation.

## 4. Local Setup

### Step 1: Navigate to the ML Service

```bash
cd ml-service
```

### Step 2: Create a Virtual Environment

```bash
python -m venv .venv
```

Activate it on Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

### Step 3: Install Dependencies

Install CPU-only PyTorch:

```bash
python -m pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
```

Install the remaining dependencies:

```bash
python -m pip install -r requirements.txt
```

### Step 4: Run the API

```bash
uvicorn app:app --reload
```

The API will be available at:

```text
http://localhost:8000
```

Swagger documentation:

```text
http://localhost:8000/docs
```

## 5. Automated Testing

The project uses Pytest to validate both the ML model and API behavior.

Run tests from the `ml-service` directory:

```bash
python -m pytest -v
```

### Test Coverage

**API Tests (`test_api.py`)**

- Health endpoint availability.
- Successful prediction with a valid image.
- Rejection of unsupported content types.
- Rejection of empty files.
- Handling corrupted images.
- Rejection of oversized files.

**Model Tests (`test_model.py`)**

- Validation of model output shape.
- Validation of finite model outputs.
- Verification of valid digit predictions.
- Rejection of invalid input shapes.

Current test result:

```text
10 passed
```

## 6. Dockerization

Docker is used to package the ML service and its dependencies into a portable image.

This makes it possible to run the application in an isolated environment without relying on the host machine's Python environment.

### Build Docker Image

Run this command from the repository root:

```bash
docker build -t digit-recognition-ml:local ./ml-service
```

### Run Docker Container

```bash
docker run --rm --name digit-recognition-api -p 8000:8000 digit-recognition-ml:local
```

The API will be available at:

```text
http://localhost:8000
```

### Check Running Containers

```bash
docker ps
```

### Stop the Container

If running in the foreground, press:

```text
CTRL + C
```

### Verify the API

Open:

```text
http://localhost:8000/docs
```

Or check the health endpoint:

```text
http://localhost:8000/health
```

## 7. Docker Compose

Docker Compose simplifies building and running the ML service.

The Compose configuration is located in the repository root.

Start the service:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up --build -d
```

Check service status:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f
```

Stop and remove the Compose containers:

```bash
docker compose down
```

## 8. Continuous Integration (CI)

GitHub Actions is used to automatically validate changes before they are merged into the `main` branch.

The workflow is defined in:

```text
.github/workflows/ci.yml
```

### CI Pipeline

The workflow currently contains two jobs:

**Job 1: Run ML Service Tests**

- Checks out the repository.
- Sets up Python 3.10.
- Installs CPU-only PyTorch.
- Installs project dependencies.
- Checks Python imports.
- Runs automated tests using Pytest.

**Job 2: Build and Test Docker Image**

- Builds the Docker image.
- Starts a Docker container.
- Checks the API health endpoint.
- Validates the health response.
- Displays container logs if a failure occurs.
- Stops and removes the container.
- Validates the Docker Compose configuration.

The Docker job depends on the successful completion of the test job.

### Workflow Execution

CI runs automatically on:

- Pull requests targeting `main`.
- Pushes to `main`.

Changes to the following paths trigger the workflow:

- `ml-service/**`
- `.github/workflows/ci.yml`
- `docker-compose.yml`

### Branch Protection

GitHub branch protection is configured to require both status checks before merging changes into `main`:

1. `Run ML Service Tests`
2. `Build and Test Docker Image`

This prevents merging pull requests when required checks fail.

## 9. Current Development Status

| Component | Status |
|---|---|
| ML Model | Implemented |
| Prediction Logic | Implemented |
| FastAPI | Implemented |
| API Testing | Passed |
| Model Testing | Passed |
| Dockerfile | Implemented |
| Docker Image Build | Successful |
| Docker Container | Successfully Running |
| Docker Compose | Implemented |
| GitHub Actions CI | Implemented |
| Docker Health Check in CI | Passed |
| Branch Protection | Configured |
| Continuous Deployment | Not implemented yet |

## 10. Future Improvements

Potential next development steps:

- Build a React frontend for image uploads and prediction visualization.
- Integrate the frontend with the FastAPI service.
- Improve prediction response handling and error reporting.
- Publish Docker images to a container registry.
- Implement Continuous Delivery and automated deployment.
- Deploy the application to a cloud environment.

---

**Project:** Digit Recognition Platform  
**Service:** ML Service  
**Framework:** PyTorch + FastAPI  
**Containerization:** Docker + Docker Compose  
**CI:** GitHub Actions