import morgan, { StreamOptions } from 'morgan'
import logger from '../utils/logger'

// Override the stream method by telling Morgan to use our custom logger instead of console.log
const stream: StreamOptions = {
  // Use the http severity
  write: (message) => logger.http(message.trim()),
}

// Skip all the Morgan http log if the application is not running in development mode
const skip = () => {
  const env = process.env.NODE_ENV || 'development'
  return env !== 'development'
}

// Build the morgan middleware
const morganMiddleware = morgan(
  // Define message format string (this is the default format)
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
)

export default morganMiddleware 