import multer from 'multer'
import type { RequestHandler } from 'express'

import { AppError } from '../types/app-error.js'

const MAX_FILE_SIZE = 5 * 1024 * 1024

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: MAX_FILE_SIZE,
  },

  fileFilter: (_req, file, callback) => {
    const allowedTypes = ['image/png', 'image/jpeg']

    if (!allowedTypes.includes(file.mimetype)) {
      callback(
        new AppError(
          'Only PNG and JPEG images are supported.',
          415,
        ),
      )
      return
    }

    callback(null, true)
  },
})

const singleFileUpload = upload.single('file')

export const uploadImage: RequestHandler = (req, res, next) => {
  singleFileUpload(req, res, (error) => {
    if (!error) {
      next()
      return
    }

    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        next(
          new AppError(
            'Image must be 5 MB or smaller.',
            413,
          ),
        )
        return
      }

      next(new AppError('Invalid file upload.', 400))
      return
    }

    next(error)
  })
}
