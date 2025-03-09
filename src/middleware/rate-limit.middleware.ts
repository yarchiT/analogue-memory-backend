import rateLimit from 'express-rate-limit'
import { Request, Response } from 'express'
import config from '../config'
import logger from '../utils/logger'
import { createTooManyRequestsError } from '../utils/error.utils'

/**
 * Rate limiting middleware to prevent abuse
 */
export const rateLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs, // Time window in milliseconds
  max: config.rateLimitMax, // Max number of requests per IP in the window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  
  // Custom handler for when rate limit is exceeded
  handler: (req: Request, res: Response) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`)
    
    const error = createTooManyRequestsError(
      `Too many requests from this IP, please try again after ${Math.ceil(config.rateLimitWindowMs / 60000)} minute(s)`
    )
    
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    })
  },
  
  // Skip rate limiting for certain IPs (e.g., internal services)
  skip: (req: Request) => {
    // Example: Skip rate limiting for localhost in development
    if (config.nodeEnv === 'development' && (req.ip === '127.0.0.1' || req.ip === '::1')) {
      return true
    }
    return false
  },
}) 