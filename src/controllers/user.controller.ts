import { Request, Response } from 'express'
import mockDataService from '../services/mock-data.service'
import logger from '../utils/logger'

// Get all users
export const getAllUsers = (req: Request, res: Response) => {
  try {
    const users = mockDataService.getUsers()
    
    // Remove sensitive information
    const sanitizedUsers = users.map(user => {
      const { email, ...userWithoutEmail } = user
      return userWithoutEmail
    })
    
    return res.status(200).json({
      status: 'success',
      results: sanitizedUsers.length,
      data: {
        users: sanitizedUsers,
      },
    })
  } catch (error) {
    logger.error('Error fetching users:', error)
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch users',
    })
  }
}

// Get a user by ID
export const getUserById = (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = mockDataService.getUserById(id)
    
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: `User with ID ${id} not found`,
      })
    }
    
    // Remove sensitive information
    const { email, ...userWithoutEmail } = user
    
    return res.status(200).json({
      status: 'success',
      data: {
        user: userWithoutEmail,
      },
    })
  } catch (error) {
    logger.error(`Error fetching user with ID ${req.params.id}:`, error)
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch user',
    })
  }
}

// Get a user by username
export const getUserByUsername = (req: Request, res: Response) => {
  try {
    const { username } = req.params
    const user = mockDataService.getUserByUsername(username)
    
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: `User with username ${username} not found`,
      })
    }
    
    // Remove sensitive information
    const { email, ...userWithoutEmail } = user
    
    return res.status(200).json({
      status: 'success',
      data: {
        user: userWithoutEmail,
      },
    })
  } catch (error) {
    logger.error(`Error fetching user with username ${req.params.username}:`, error)
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch user',
    })
  }
}

// Mock login
export const login = (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email and password are required',
      })
    }
    
    const user = mockDataService.authenticate(email, password)
    
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid email or password',
      })
    }
    
    // In a real app, we would generate a JWT token here
    const token = 'mock-jwt-token-' + Date.now()
    
    return res.status(200).json({
      status: 'success',
      data: {
        token,
        user,
      },
    })
  } catch (error) {
    logger.error('Error during login:', error)
    return res.status(500).json({
      status: 'error',
      message: 'Failed to authenticate',
    })
  }
} 