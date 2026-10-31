# Backend Service

The backend service is the central API layer of the Digit Recognition Platform.

It is built with **Node.js, Express, and TypeScript** and acts as an intermediary between the React frontend and the ML service.

The backend handles incoming HTTP requests, validates uploaded images, communicates with the ML service, and returns standardized responses to the frontend.

---

## 1. Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express 5 | Backend web framework |
| TypeScript | Static type checking |
| Multer | Handling multipart file uploads |
| CORS | Cross-origin request configuration |
| dotenv | Environment variable management |
| tsx | Running TypeScript during development |
| Fetch API | HTTP communication with the ML service |

---

## 2. Architecture

The backend follows a layered architecture:

```text
Frontend (React)
       |
       | HTTP Request
       v
Backend (Express)
       |
       v
Routes
       |
       v
Middleware
       |
       v
Controllers
       |
       v
Services
       |
       | HTTP Request
       v
ML Service (FastAPI)
       |
       v
PyTorch Model
       |
       v
Prediction Result
```

### Main Responsibilities

- Receive requests from the frontend.
- Validate uploaded image files.
- Forward images to the ML service.
- Handle errors centrally.
- Return standardized JSON responses.

The backend does not execute the PyTorch model directly.

---

## 3. Project Structure

```text
backend/
│
├── src/
│   ├── config/
│   │   └── env.ts
│   │
│   ├── controllers/
│   │   ├── health.controller.ts
│   │   └── prediction.controller.ts
│   │
│   ├── middleware/
│   │   ├── error.middleware.ts
│   │   ├── not-found.middleware.ts
│   │   └── upload.middleware.ts
│   │
│   ├── routes/
│   │   ├── health.routes.ts
│   │   └── prediction.routes.ts
│   │
│   ├── services/
│   │   └── ml.service.ts
│   │
│   ├── types/
│   │   ├── app-error.ts
│   │   └── ml.types.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── tests/
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json
```

### Directory Responsibilities

| Directory | Responsibility |
|---|---|
| config | Environment and application configuration |
| controllers | Handling HTTP requests and responses |
| middleware | Request processing, validation, and error handling |
| routes | Defining API endpoints |
| services | Business logic and communication with external services |
| types | Shared TypeScript interfaces and custom types |
| tests | Backend automated tests |

---

## 4. Environment Variables

The backend uses environment variables to configure its runtime settings.

Create a `.env` file in the backend directory:

```env
PORT=3000
FRONTEND_URL=http://localhost:5173
ML_SERVICE_URL=http://localhost:8000
```

The `.env` file is excluded from Git.

A `.env.example` file is provided as a template for configuring new environments.

Never commit actual secrets or environment-specific credentials.

---

## 5. Installation

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Make sure the required environment variables are configured in `.env`.

---

## 6. Running the Backend

### Development Mode

Start the development server:

```bash
npm run dev
```

The backend will be available at:

```text
http://localhost:3000
```

### Production Build

Compile TypeScript:

```bash
npm run build
```

Run the compiled application:

```bash
npm start
```

### Type Checking

Run TypeScript type checking without generating build files:

```bash
npm run typecheck
```

---

## 7. API Endpoints

### Health Check

Checks whether the backend service is running.

**Endpoint**

```http
GET /api/health
```

**Response – 200 OK**

```json
{
  "status": "ok",
  "service": "backend"
}
```

### Image Prediction

Receives an image, forwards it to the ML service, and returns the prediction result.

**Endpoint**

```http
POST /api/predict
```

**Request Content-Type**

```text
multipart/form-data
```

**Request Body**

| Field | Type | Description |
|---|---|---|
| file | File | PNG or JPEG image |

**File Restrictions**

- Supported formats: PNG and JPEG.
- Maximum file size: 5 MB.
- Only one image per request.

**Successful Response – 200 OK**

```json
{
  "success": true,
  "data": {
    "digit": 7,
    "confidence": 0.9821
  }
}
```

The digit and confidence values depend on the uploaded image.

---

## 8. Error Handling

The backend uses centralized error handling.

Custom application errors are defined in:

```text
src/types/app-error.ts
```

Unknown routes are handled by:

```text
src/middleware/not-found.middleware.ts
```

Application errors are processed by:

```text
src/middleware/error.middleware.ts
```

### Error Response Format

```json
{
  "success": false,
  "error": {
    "message": "Error message"
  }
}
```

### Supported Error Scenarios

| Status Code | Description |
|---|---|
| 400 | Invalid request or missing image |
| 404 | Route not found |
| 413 | Uploaded image exceeds 5 MB |
| 415 | Unsupported image format |
| 502 | ML service processing or response error |
| 503 | ML service unavailable |
| 500 | Unexpected internal server error |

---

## 9. ML Service Integration

The backend communicates with the ML service through its prediction endpoint.

**ML Service Endpoint**

```http
POST /predict
```

**Default Local URL**

```text
http://localhost:8000/predict
```

The integration is implemented in:

```text
src/services/ml.service.ts
```

The backend forwards the uploaded image using `FormData` and the native Node.js Fetch API.

The ML service returns:

```json
{
  "digit": 7,
  "confidence": 0.9821
}
```

The backend validates the returned prediction before sending it to the frontend.

---

## 10. CORS Configuration

CORS is configured in:

```text
src/app.ts
```

The frontend origin is configured through:

```env
FRONTEND_URL=http://localhost:5173
```

Only the configured frontend origin is allowed to access the API through browser-based cross-origin requests.

---

## 11. Running the Complete Application Locally

The application currently consists of three independent services.

All three must be running for the complete prediction workflow.

### Step 1: Start the ML Service

From the project root:

```bash
docker compose up -d --build
```

Check container status:

```bash
docker compose ps
```

Verify the ML health endpoint:

```text
http://localhost:8000/health
```

### Step 2: Start the Backend

Open a new terminal:

```bash
cd backend
npm install
npm run dev
```

Backend URL:

```text
http://localhost:3000
```

Health endpoint:

```text
http://localhost:3000/api/health
```

### Step 3: Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

### Step 4: Test Image Prediction

1. Open the frontend in your browser.
2. Select a handwritten digit image.
3. Click the recognition button.
4. Wait for the prediction result.
5. Verify the recognized digit and confidence score.

---

## 12. Stopping the Services

Stop the frontend and backend development servers using:

```text
Ctrl + C
```

Stop the ML service containers from the project root:

```bash
docker compose down
```

---

## 13. Development Notes

- Keep controllers focused on HTTP request and response handling.
- Put business logic and external service communication inside services.
- Keep routes separate from controllers.
- Use centralized error handling instead of returning inconsistent error responses.
- Validate uploaded files before forwarding them to the ML service.
- Keep environment-specific configuration outside the source code.
- Do not commit `.env` or other sensitive configuration files.

---

## 14. Current Implementation Status

| Feature | Status |
|---|---|
| Express server initialization | Completed |
| TypeScript configuration | Completed |
| Environment configuration | Completed |
| Health check endpoint | Completed |
| CORS configuration | Completed |
| Centralized error handling | Completed |
| Image upload with Multer | Completed |
| Image validation | Completed |
| ML service integration | Completed |
| Prediction API | Completed |
| Frontend integration | Completed |
| Full application Dockerization | Planned |
| Backend automated test suite | Planned |

---

**Project:** Digit Recognition Platform  
**Service:** Backend API  
**Runtime:** Node.js  
**Framework:** Express  
**Language:** TypeScript