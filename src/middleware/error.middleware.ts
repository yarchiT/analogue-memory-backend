import { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger'
import { AppError } from '../utils/error.utils'

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default error values
  let statusCode = 500
  let status = 'error'
  let message = err.message || 'Something went wrong'
  let stack = err.stack

  // Check if error is an AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode
    status = err.status
  }

  // Log the error
  logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
  if (stack) {
    logger.error(stack)
  }

  // Send error response
  res.status(statusCode).json({
    status,
    message,
    stack: process.env.NODE_ENV === 'development' ? stack : undefined,
  })
}

/**
 * 404 Not Found middleware
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Not Found - ${req.originalUrl}`, 404))
} 