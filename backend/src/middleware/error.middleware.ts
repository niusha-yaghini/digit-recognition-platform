
import type { ErrorRequestHandler } from 'express'

import { AppError } from '../types/app-error.js'

export const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  if (res.headersSent) {
    return
  }

  let statusCode = 500
  let message = 'Internal server error'

  if (error instanceof AppError) {
    statusCode = error.statusCode
    message = error.message
  } else {
    console.error('Unexpected error:', error)
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
    },
  })
}
