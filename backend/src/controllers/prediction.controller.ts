import type { RequestHandler } from 'express'

import { predictWithML } from '../services/ml.service.js'
import { AppError } from '../types/app-error.js'
import type { UploadedImage } from '../types/ml.types.js'

export const predictController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const file = (req as unknown as {
      file?: UploadedImage
    }).file

    if (!file) {
      throw new AppError('No image file was uploaded.', 400)
    }

    if (file.size === 0) {
      throw new AppError('Uploaded image is empty.', 400)
    }

    const prediction = await predictWithML(file)

    res.status(200).json({
      success: true,
      data: prediction,
    })
  } catch (error) {
    next(error)
  }
}
