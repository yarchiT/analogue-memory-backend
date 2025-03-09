import { Request, Response } from 'express'
import mockDataService from '../services/mock-data.service'
import logger from '../utils/logger'

// Get all memory items
export const getAllItems = (req: Request, res: Response) => {
  try {
    const items = mockDataService.getAllItems()
    
    return res.status(200).json({
      status: 'success',
      results: items.length,
      data: {
        items,
      },
    })
  } catch (error) {
    logger.error('Error fetching memory items:', error)
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch memory items',
    })
  }
}

// Get a memory item by ID
export const getItemById = (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const item = mockDataService.getItemById(id)
    
    if (!item) {
      return res.status(404).json({
        status: 'fail',
        message: `Memory item with ID ${id} not found`,
      })
    }
    
    return res.status(200).json({
      status: 'success',
      data: {
        item,
      },
    })
  } catch (error) {
    logger.error(`Error fetching memory item with ID ${req.params.id}:`, error)
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch memory item',
    })
  }
}

// Get memory items by category
export const getItemsByCategory = (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params
    const items = mockDataService.getItemsByCategory(categoryId)
    
    return res.status(200).json({
      status: 'success',
      results: items.length,
      data: {
        items,
      },
    })
  } catch (error) {
    logger.error(`Error fetching memory items for category ${req.params.categoryId}:`, error)
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch memory items by category',
    })
  }
}

// Search memory items
export const searchItems = (req: Request, res: Response) => {
  try {
    const { query } = req.query
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({
        status: 'fail',
        message: 'Search query is required',
      })
    }
    
    const items = mockDataService.searchItems(query)
    
    return res.status(200).json({
      status: 'success',
      results: items.length,
      data: {
        items,
      },
    })
  } catch (error) {
    logger.error(`Error searching memory items with query ${req.query.query}:`, error)
    return res.status(500).json({
      status: 'error',
      message: 'Failed to search memory items',
    })
  }
} 