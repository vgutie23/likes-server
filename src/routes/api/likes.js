import { Router } from 'express'

import * as likesService from '../../services/likes'
import auth from '../../helpers/auth'

const router = Router()

router.use(auth.authenticate('local', { session: false }))

router.get('/', async (req, res) => {
  const likes = await likesService.getAll()
  res.send(likes)
})

router.post('/', async (req, res) => {
  const { like: newLike } = req.body
  if (newLike) {
    const like = await likesService.add(newLike)
    if (like.error) {
      res.status(400)
    }
    res.send(like)
  } else {
    res.status(400).send({ msg: 'Bad Status' })
  }
})

router.get('/count/object/:objectId', async (req, res) => {
  const count = await likesService.countByObjectId(req.params.objectId)
  res.send(count)
})

router.get('/count/user/:userId', async (req, res) => {
  const count = await likesService.countByUserId(req.params.userId)
  res.send(count)
})

router.delete('/', async (req, res) => {
  const { objectId, userId } = req.body.like
  res.send(await likesService.removeByLike(objectId, userId))
})

export default router
