import { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger'

interface AppError extends Error {
  statusCode?: number
  status?: string
  isOperational?: boolean
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  // Log the error
  logger.error(`${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
  logger.error(err.stack || '')

  // Send error response
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  })
}

// 404 Not Found middleware
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`) as AppError
  error.statusCode = 404
  error.status = 'fail'
  next(error)
} 