import { Router } from 'express'
import * as itemController from '../controllers/item.controller'

const router = Router()

/**
 * @route   GET /api/items
 * @desc    Get all memory items
 * @access  Public
 */
router.get('/', itemController.getAllItems)

/**
 * @route   GET /api/items/search
 * @desc    Search memory items
 * @access  Public
 */
router.get('/search', itemController.searchItems)

/**
 * @route   GET /api/items/category/:categoryId
 * @desc    Get memory items by category
 * @access  Public
 */
router.get('/category/:categoryId', itemController.getItemsByCategory)

/**
 * @route   GET /api/items/:id
 * @desc    Get a memory item by ID
 * @access  Public
 */
router.get('/:id', itemController.getItemById)

export default router 