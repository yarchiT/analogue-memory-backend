import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morganMiddleware from './middleware/morgan.middleware'
import { errorHandler, notFound } from './middleware/error.middleware'
import routes from './routes'
import logger from './utils/logger'

// Initialize Express app
const app: Application = express()

// Apply middleware
app.use(helmet()) // Security headers
app.use(cors()) // Enable CORS
app.use(express.json()) // Parse JSON bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies
app.use(morganMiddleware) // HTTP request logging

// Routes
app.use('/', routes)

// Handle 404 errors
app.use(notFound)

// Global error handler
app.use(errorHandler)

export default app 