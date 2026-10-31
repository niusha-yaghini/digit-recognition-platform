
export interface UploadedImage {
  buffer: Buffer
  originalname: string
  mimetype: string
  size: number
}

export interface MLPredictionResponse {
  digit: number
  confidence: number
}
