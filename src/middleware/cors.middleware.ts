import cors from 'cors'
import { Request, Response, NextFunction } from 'express'
import config from '../config'
import logger from '../utils/logger'

/**
 * Configure CORS options based on environment
 */
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps, curl, etc)
    if (!origin) {
      return callback(null, true)
    }
    
    // Check if the origin is allowed
    const allowedOrigins = config.corsAllowedOrigins.split(',')
    
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      logger.warn(`CORS blocked request from origin: ${origin}`)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 86400, // 24 hours
}

/**
 * CORS middleware
 */
export const corsMiddleware = cors(corsOptions)

/**
 * Preflight request handler for OPTIONS requests
 */
export const handlePreflight = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }
  next()
} 