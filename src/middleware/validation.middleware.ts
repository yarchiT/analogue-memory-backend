import { Request, Response, NextFunction, RequestHandler } from 'express'
import Joi from 'joi'
import logger from '../utils/logger'

interface ValidationError extends Error {
  statusCode: number
  status: string
  isOperational: boolean
}

/**
 * Middleware factory that validates request data against a Joi schema
 * @param schema - Joi schema to validate against
 * @param property - Request property to validate (body, params, query)
 */
export function validate(schema: Joi.ObjectSchema, property: 'body' | 'params' | 'query' = 'body'): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Get the data to validate based on the specified property
    const data = req[property]
    
    // Validate the data against the schema
    const { error, value } = schema.validate(data, {
      abortEarly: false, // Return all errors, not just the first one
      stripUnknown: true, // Remove unknown properties
    })
    
    if (error) {
      // Create a validation error
      const validationError = new Error('Validation failed') as ValidationError
      validationError.statusCode = 400
      validationError.status = 'fail'
      validationError.isOperational = true
      
      // Format validation error details
      const details = error.details.map(detail => ({
        message: detail.message,
        path: detail.path,
      }))
      
      logger.warn(`Validation error: ${JSON.stringify(details)}`)
      
      // Send validation error response
      res.status(400).json({
        status: 'fail',
        message: 'Validation failed',
        errors: details,
      })
      return
    }
    
    // Replace the request data with the validated data
    req[property] = value
    next()
  }
} 