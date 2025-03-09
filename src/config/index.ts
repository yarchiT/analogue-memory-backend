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
}

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/analogue-memory',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  logLevel: process.env.LOG_LEVEL || 'info',
}

export default config 