import { Router } from 'express'
import * as categoryController from '../controllers/category.controller'

const router = Router()

/**
 * @route   GET /api/categories
 * @desc    Get all categories
 * @access  Public
 */
router.get('/', categoryController.getAllCategories)

/**
 * @route   GET /api/categories/:id
 * @desc    Get a category by ID
 * @access  Public
 */
router.get('/:id', categoryController.getCategoryById)

export default router 