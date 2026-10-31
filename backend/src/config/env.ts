
import 'dotenv/config'

const port = Number(process.env.PORT ?? 3000)

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('Invalid PORT configuration.')
}

export const env = {
  port,
  frontendUrl:
    process.env.FRONTEND_URL ?? 'http://localhost:5173',
  mlServiceUrl:
    process.env.ML_SERVICE_URL ?? 'http://localhost:8000',
}
