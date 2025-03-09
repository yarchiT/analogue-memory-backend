import { Router } from 'express'
import * as itemController from '../controllers/item.controller'
import { validate } from '../middleware/validation.middleware'
import { idParamSchema, categoryIdParamSchema, searchQuerySchema, paginationSchema } from '../models/validation.schemas'

const router = Router()

/**
 * @route   GET /api/v1/items
 * @desc    Get all memory items with pagination and sorting
 * @access  Public
 */
router.get('/', validate(paginationSchema, 'query'), itemController.getAllItems)

/**
 * @route   GET /api/v1/items/search
 * @desc    Search memory items
 * @access  Public
 */
router.get('/search', validate(searchQuerySchema, 'query'), itemController.searchItems)

/**
 * @route   GET /api/v1/items/category/:categoryId
 * @desc    Get memory items by category
 * @access  Public
 */
router.get('/category/:categoryId', 
  validate(categoryIdParamSchema, 'params'),
  validate(paginationSchema, 'query'),
  itemController.getItemsByCategory
)

/**
 * @route   GET /api/v1/items/:id
 * @desc    Get a memory item by ID
 * @access  Public
 */
router.get('/:id', validate(idParamSchema, 'params'), itemController.getItemById)

export default router 