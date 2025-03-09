import helmet from 'helmet'
import { Request, Response, NextFunction } from 'express'

/**
 * Security middleware using helmet
 */
export const securityMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:'],
    },
  },
  xssFilter: true,
  noSniff: true,
  referrerPolicy: { policy: 'same-origin' },
})

/**
 * Additional security headers middleware
 */
export function additionalSecurityHeaders(req: Request, res: Response, next: NextFunction) {
  // Add additional security headers not covered by helmet
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()') 
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  
  // Prevent browsers from caching API responses
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')
  
  next()
} 