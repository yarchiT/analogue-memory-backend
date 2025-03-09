import { Request, Response, NextFunction } from 'express'
import mockDataService from '../services/mock-data.service'
import logger from '../utils/logger'
import { createNotFoundError, createInternalServerError } from '../utils/error.utils'

/**
 * Get all memory items with pagination and sorting
 */
export const getAllItems = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Get pagination and sorting parameters from query
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const sort = req.query.sort as string || 'name'
    
    // Get items with pagination and sorting
    const { items, total } = mockDataService.getAllItemsPaginated(page, limit, sort)
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1
    
    res.status(200).json({
      status: 'success',
      results: items.length,
      pagination: {
        page,
        limit,
        totalItems: total,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
      data: {
        items,
      },
    })
  } catch (error) {
    logger.error('Error fetching memory items:', error)
    next(createInternalServerError('Failed to fetch memory items'))
  }
}

/**
 * Get a memory item by ID
 */
export const getItemById = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { id } = req.params
    const item = mockDataService.getItemById(id)
    
    if (!item) {
      next(createNotFoundError(`Memory item with ID ${id} not found`))
      return
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        item,
      },
    })
  } catch (error) {
    logger.error(`Error fetching memory item with ID ${req.params.id}:`, error)
    next(createInternalServerError('Failed to fetch memory item'))
  }
}

/**
 * Get memory items by category with pagination and sorting
 */
export const getItemsByCategory = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { categoryId } = req.params
    
    // Get pagination and sorting parameters from query
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const sort = req.query.sort as string || 'name'
    
    // Get items with pagination and sorting
    const { items, total } = mockDataService.getItemsByCategoryPaginated(categoryId, page, limit, sort)
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1
    
    res.status(200).json({
      status: 'success',
      results: items.length,
      pagination: {
        page,
        limit,
        totalItems: total,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
      data: {
        items,
      },
    })
  } catch (error) {
    logger.error(`Error fetching memory items for category ${req.params.categoryId}:`, error)
    next(createInternalServerError('Failed to fetch memory items by category'))
  }
}

/**
 * Search memory items
 */
export const searchItems = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { query } = req.query
    
    if (!query || typeof query !== 'string') {
      next(createNotFoundError('Search query is required'))
      return
    }
    
    const items = mockDataService.searchItems(query)
    
    res.status(200).json({
      status: 'success',
      results: items.length,
      data: {
        items,
      },
    })
  } catch (error) {
    logger.error(`Error searching memory items with query ${req.query.query}:`, error)
    next(createInternalServerError('Failed to search memory items'))
  }
} 