import express from 'express'
import cors, { type CorsOptions } from 'cors'

import healthRouter from './routes/health.routes.js'
import { env } from './config/env.js'

import { notFoundHandler } from './middleware/not-found.middleware.js'
import { errorHandler } from './middleware/error.middleware.js'

import predictionRouter from './routes/prediction.routes.js'

const app = express()

// CORS Configuration
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin === env.frontendUrl) {
      callback(null, true)
    } else {
      callback(null, false)
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}

app.use(cors(corsOptions))

// Global Middlewares
app.use(express.json())

// API Routes
app.use('/api', healthRouter)
app.use('/api', predictionRouter)

// 404 Handler
app.use(notFoundHandler)

// Centralized Error Handler
app.use(errorHandler)

export default app
