import { Router } from 'express'
import likes from './likes'

const router = Router()

router.get('/', (req, res) => {
  res.json({ msg: 'API Endpoint' })
})

router.use('/likes', likes)

export default router
