import { Request, Response, NextFunction } from 'express'
import mockDataService from '../services/mock-data.service'
import logger from '../utils/logger'
import { createNotFoundError, createInternalServerError } from '../utils/error.utils'

/**
 * Get all categories
 */
export const getAllCategories = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const categories = mockDataService.getCategories()
    
    res.status(200).json({
      status: 'success',
      results: categories.length,
      data: {
        categories,
      },
    })
  } catch (error) {
    logger.error('Error fetching categories:', error)
    next(createInternalServerError('Failed to fetch categories'))
  }
}

/**
 * Get a category by ID
 */
export const getCategoryById = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { id } = req.params
    const category = mockDataService.getCategoryById(id)
    
    if (!category) {
      next(createNotFoundError(`Category with ID ${id} not found`))
      return
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        category,
      },
    })
  } catch (error) {
    logger.error(`Error fetching category with ID ${req.params.id}:`, error)
    next(createInternalServerError('Failed to fetch category'))
  }
} 