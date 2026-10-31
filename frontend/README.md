# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

----------------------------------

# Frontend – Digit Recognition Platform

## Overview

The frontend is the user interface of the Digit Recognition Platform. It allows users to upload handwritten digit images and interact with the machine learning prediction system.

The application is built with React, TypeScript, and Vite.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Building the user interface |
| TypeScript | Static type checking |
| Vite | Development server and build tool |
| React Router DOM | Client-side routing |
| CSS Modules | Component-scoped styling |
| npm | Package management |

## Project Structure

```text
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── ImageUploader/
│   │       ├── ImageUploader.tsx
│   │       └── ImageUploader.module.css
│   ├── pages/
│   │   └── HomePage/
│   │       ├── HomePage.tsx
│   │       └── HomePage.module.css
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173/
```

### Production Build

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Implemented Features

### Homepage

- Initial homepage layout
- React Router configuration
- CSS Modules styling

### Image Uploader

- Image selection using file browser
- Drag and drop support
- PNG and JPEG format validation
- Maximum file size validation (5 MB)
- Empty file validation
- Image preview
- Remove selected image
- Image decoding validation

## Upcoming Features

- Backend API integration
- Image prediction requests
- Loading and error states
- Prediction result visualization
- Prediction history

## Related Services

The frontend is part of a larger platform consisting of:

- **Backend:** Node.js, Express, and TypeScript
- **ML Service:** Python, FastAPI, and PyTorch

The frontend communicates with the central backend, which manages communication with the ML service and other future services.