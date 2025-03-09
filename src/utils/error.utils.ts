/**
 * Custom error class for operational errors
 * Operational errors are errors that we can anticipate and handle gracefully
 */
export class AppError extends Error {
  statusCode: number
  status: string
  isOperational: boolean

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true

    // Capture stack trace, excluding the constructor call from the stack
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Creates a 404 Not Found error
 * @param message - Error message
 */
export function createNotFoundError(message: string): AppError {
  return new AppError(message, 404)
}

/**
 * Creates a 400 Bad Request error
 * @param message - Error message
 */
export function createBadRequestError(message: string): AppError {
  return new AppError(message, 400)
}

/**
 * Creates a 401 Unauthorized error
 * @param message - Error message
 */
export function createUnauthorizedError(message: string): AppError {
  return new AppError(message, 401)
}

/**
 * Creates a 403 Forbidden error
 * @param message - Error message
 */
export function createForbiddenError(message: string): AppError {
  return new AppError(message, 403)
}

/**
 * Creates a 429 Too Many Requests error
 * @param message - Error message
 */
export function createTooManyRequestsError(message: string): AppError {
  return new AppError(message, 429)
}

/**
 * Creates a 500 Internal Server Error
 * @param message - Error message
 */
export function createInternalServerError(message: string): AppError {
  return new AppError(message, 500)
} 