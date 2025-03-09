import { Router } from 'express'
import * as userController from '../controllers/user.controller'

const router = Router()

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Public
 */
router.get('/', userController.getAllUsers)

/**
 * @route   GET /api/users/username/:username
 * @desc    Get a user by username
 * @access  Public
 */
router.get('/username/:username', userController.getUserByUsername)

/**
 * @route   GET /api/users/:id
 * @desc    Get a user by ID
 * @access  Public
 */
router.get('/:id', userController.getUserById)

/**
 * @route   POST /api/users/login
 * @desc    Authenticate a user
 * @access  Public
 */
router.post('/login', userController.login)

export default router 