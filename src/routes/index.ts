import { Router } from 'express'
import categoryRoutes from './category.routes'
import itemRoutes from './item.routes'
import userRoutes from './user.routes'

const router = Router()

// API routes
router.use('/categories', categoryRoutes)
router.use('/items', itemRoutes)
router.use('/users', userRoutes)

// Documentation route
router.get('/docs', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API documentation will be available here',
  })
})

export default router 