import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env file
dotenv.config()

interface Config {
  port: number
  nodeEnv: string
  mongodbUri: string
  jwtSecret: string
  jwtExpiresIn: string
  logLevel: string
  corsAllowedOrigins: string
  rateLimitMax: number
  rateLimitWindowMs: number
  requestTimeout: number
}

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/analogue-memory',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  logLevel: process.env.LOG_LEVEL || 'info',
  corsAllowedOrigins: process.env.CORS_ALLOWED_ORIGINS || '*',
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10), // 1 minute
  requestTimeout: parseInt(process.env.REQUEST_TIMEOUT || '30000', 10), // 30 seconds
}

export default config 