import app from './app'
import config from './config'
import logger from './utils/logger'

// Start the server
const server = app.listen(config.port, () => {
  logger.info(`Server running in ${config.nodeEnv} mode on port ${config.port}`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('UNHANDLED REJECTION! Shutting down...')
  logger.error(err.name, err.message)
  
  // Close server & exit process
  server.close(() => {
    process.exit(1)
  })
})

// Handle SIGTERM signal
process.on('SIGTERM', () => {
  logger.info('SIGTERM RECEIVED. Shutting down gracefully')
  server.close(() => {
    logger.info('Process terminated!')
  })
}) 