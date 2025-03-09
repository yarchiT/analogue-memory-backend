import { Request, Response } from 'express'
import mockDataService from '../services/mock-data.service'
import logger from '../utils/logger'

// Get all categories
export const getAllCategories = (req: Request, res: Response) => {
  try {
    const categories = mockDataService.getCategories()
    
    return res.status(200).json({
      status: 'success',
      results: categories.length,
      data: {
        categories,
      },
    })
  } catch (error) {
    logger.error('Error fetching categories:', error)
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch categories',
    })
  }
}

// Get a category by ID
export const getCategoryById = (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const category = mockDataService.getCategoryById(id)
    
    if (!category) {
      return res.status(404).json({
        status: 'fail',
        message: `Category with ID ${id} not found`,
      })
    }
    
    return res.status(200).json({
      status: 'success',
      data: {
        category,
      },
    })
  } catch (error) {
    logger.error(`Error fetching category with ID ${req.params.id}:`, error)
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch category',
    })
  }
} 