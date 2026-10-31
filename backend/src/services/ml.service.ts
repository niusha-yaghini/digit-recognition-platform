import { env } from '../config/env.js'
import { AppError } from '../types/app-error.js'
import type { MLPredictionResponse } from '../types/ml.types.js'
import type { Request } from 'express'
import type { UploadedImage } from '../types/ml.types.js'

const ML_TIMEOUT_MS = 30_000

export const predictWithML = async (
  file: UploadedImage,
): Promise<MLPredictionResponse> => {
  const formData = new FormData()

  const imageBlob = new Blob([new Uint8Array(file.buffer)], {
    type: file.mimetype,
  })

  formData.append('file', imageBlob, file.originalname)

  let response: Response

  try {
    response = await fetch(`${env.mlServiceUrl}/predict`, {
      method: 'POST',
      body: formData,
      signal: AbortSignal.timeout(ML_TIMEOUT_MS),
    })
  } catch {
    throw new AppError(
      'ML service is currently unavailable.',
      503,
    )
  }

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      throw new AppError(
        'ML service rejected the uploaded image.',
        response.status === 413 ? 413 : 400,
      )
    }

    throw new AppError(
      'ML service failed to process the image.',
      502,
    )
  }

  let result: unknown

  try {
    result = await response.json()
  } catch {
    throw new AppError(
      'ML service returned an invalid response.',
      502,
    )
  }

  if (
    typeof result !== 'object' ||
    result === null ||
    !('digit' in result) ||
    !('confidence' in result)
  ) {
    throw new AppError(
      'ML service returned an invalid response.',
      502,
    )
  }

  const prediction = result as Record<string, unknown>

  if (
    typeof prediction.digit !== 'number' ||
    !Number.isInteger(prediction.digit) ||
    prediction.digit < 0 ||
    prediction.digit > 9 ||
    typeof prediction.confidence !== 'number' ||
    !Number.isFinite(prediction.confidence) ||
    prediction.confidence < 0 ||
    prediction.confidence > 1
  ) {
    throw new AppError(
      'ML service returned an invalid prediction.',
      502,
    )
  }

  return {
    digit: prediction.digit,
    confidence: prediction.confidence,
  }
}
