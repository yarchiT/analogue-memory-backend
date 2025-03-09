import { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger'

/**
 * Middleware to log request details
 */
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  // Get the start time
  const startTime = Date.now()
  
  // Log the request
  logger.info(`Request: ${req.method} ${req.originalUrl} from ${req.ip}`)
  
  // Log request body in development mode (but not passwords)
  if (process.env.NODE_ENV === 'development' && req.body) {
    const sanitizedBody = { ...req.body }
    
    // Remove sensitive fields
    if (sanitizedBody.password) sanitizedBody.password = '[REDACTED]'
    if (sanitizedBody.passwordConfirm) sanitizedBody.passwordConfirm = '[REDACTED]'
    if (sanitizedBody.token) sanitizedBody.token = '[REDACTED]'
    
    logger.debug(`Request body: ${JSON.stringify(sanitizedBody)}`)
  }
  
  // Log the response
  res.on('finish', () => {
    const duration = Date.now() - startTime
    const logMethod = res.statusCode >= 400 ? 'warn' : 'info'
    
    logger[logMethod](
      `Response: ${req.method} ${req.originalUrl} ${res.statusCode} ${res.statusMessage} - ${duration}ms`
    )
  })
  
  next()
} 