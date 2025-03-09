import { Request, Response, NextFunction } from 'express'
import mockDataService from '../services/mock-data.service'
import logger from '../utils/logger'
import { createNotFoundError, createBadRequestError, createUnauthorizedError, createInternalServerError } from '../utils/error.utils'

/**
 * Get all users
 */
export const getAllUsers = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const users = mockDataService.getUsers()
    
    // Remove sensitive information
    const sanitizedUsers = users.map(user => {
      const { email, ...userWithoutEmail } = user
      return userWithoutEmail
    })
    
    res.status(200).json({
      status: 'success',
      results: sanitizedUsers.length,
      data: {
        users: sanitizedUsers,
      },
    })
  } catch (error) {
    logger.error('Error fetching users:', error)
    next(createInternalServerError('Failed to fetch users'))
  }
}

/**
 * Get a user by ID
 */
export const getUserById = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { id } = req.params
    const user = mockDataService.getUserById(id)
    
    if (!user) {
      next(createNotFoundError(`User with ID ${id} not found`))
      return
    }
    
    // Remove sensitive information
    const { email, ...userWithoutEmail } = user
    
    res.status(200).json({
      status: 'success',
      data: {
        user: userWithoutEmail,
      },
    })
  } catch (error) {
    logger.error(`Error fetching user with ID ${req.params.id}:`, error)
    next(createInternalServerError('Failed to fetch user'))
  }
}

/**
 * Get a user by username
 */
export const getUserByUsername = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { username } = req.params
    const user = mockDataService.getUserByUsername(username)
    
    if (!user) {
      next(createNotFoundError(`User with username ${username} not found`))
      return
    }
    
    // Remove sensitive information
    const { email, ...userWithoutEmail } = user
    
    res.status(200).json({
      status: 'success',
      data: {
        user: userWithoutEmail,
      },
    })
  } catch (error) {
    logger.error(`Error fetching user with username ${req.params.username}:`, error)
    next(createInternalServerError('Failed to fetch user'))
  }
}

/**
 * Mock login
 */
export const login = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { email, password } = req.body
    
    if (!email || !password) {
      next(createBadRequestError('Email and password are required'))
      return
    }
    
    const user = mockDataService.authenticate(email, password)
    
    if (!user) {
      next(createUnauthorizedError('Invalid email or password'))
      return
    }
    
    // In a real app, we would generate a JWT token here
    const token = 'mock-jwt-token-' + Date.now()
    
    res.status(200).json({
      status: 'success',
      data: {
        token,
        user,
      },
    })
  } catch (error) {
    logger.error('Error during login:', error)
    next(createInternalServerError('Failed to authenticate'))
  }
} 