import { Request, Response, NextFunction } from 'express'
import config from '../config'
import logger from '../utils/logger'

/**
 * Middleware to handle request timeouts
 */
export function timeoutMiddleware(req: Request, res: Response, next: NextFunction) {
  // Set a timeout for the request
  const timeout = setTimeout(() => {
    logger.warn(`Request timeout: ${req.method} ${req.originalUrl}`)
    
    // Only send a response if one hasn't been sent yet
    if (!res.headersSent) {
      res.status(503).json({
        status: 'error',
        message: 'Request timeout - the server took too long to respond',
      })
    }
  }, config.requestTimeout)
  
  // Clear the timeout when the response is sent
  res.on('finish', () => {
    clearTimeout(timeout)
  })
  
  // Clear the timeout if there's an error
  res.on('close', () => {
    clearTimeout(timeout)
  })
  
  next()
} 