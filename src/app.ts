import express, { Application } from 'express'
import helmet from 'helmet'
import morganMiddleware from './middleware/morgan.middleware'
import { errorHandler, notFound } from './middleware/error.middleware'
import { corsMiddleware, handlePreflight } from './middleware/cors.middleware'
import { securityMiddleware, additionalSecurityHeaders } from './middleware/security.middleware'
import { rateLimiter } from './middleware/rate-limit.middleware'
import { timeoutMiddleware } from './middleware/timeout.middleware'
import { requestLogger } from './middleware/request-logger.middleware'
import routes from './routes'
import logger from './utils/logger'

// Initialize Express app
const app: Application = express()

// Apply security middleware
app.use(securityMiddleware) // Security headers via helmet
app.use(additionalSecurityHeaders) // Additional security headers

// Apply CORS middleware
app.use(corsMiddleware) // CORS configuration
app.use(handlePreflight) // Handle preflight requests

// Apply request parsing middleware
app.use(express.json({ limit: '10kb' })) // Parse JSON bodies with size limit
app.use(express.urlencoded({ extended: true, limit: '10kb' })) // Parse URL-encoded bodies with size limit

// Apply rate limiting
app.use(rateLimiter) // Prevent abuse

// Apply request timeout
app.use(timeoutMiddleware) // Handle long-running requests

// Apply logging middleware
app.use(morganMiddleware) // HTTP request logging
app.use(requestLogger) // Custom request logging

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Server is healthy' })
})

// API routes
app.use('/api/v1', routes)

// Handle 404 errors
app.use(notFound)

// Global error handler
app.use(errorHandler)

export default app 