import { Router } from 'express'
import categoryRoutes from './category.routes'
import itemRoutes from './item.routes'
import userRoutes from './user.routes'
import healthRoutes from './health.routes'

const router = Router()

// Health check route
router.use('/health', healthRoutes)

// API routes
router.use('/api/categories', categoryRoutes)
router.use('/api/items', itemRoutes)
router.use('/api/users', userRoutes)

export default router 