
import { Router } from 'express'

import { predictController } from '../controllers/prediction.controller.js'
import { uploadImage } from '../middleware/upload.middleware.js'

const router = Router()

router.post('/predict', uploadImage, predictController)

export default router
