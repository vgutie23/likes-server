import Joi from 'joi'

import logger from '../helpers/logger'
import db from '../helpers/db'

const likeSchema = Joi.object({
  objectId: Joi.string().required(),
  userId: Joi.string().required(),
})

export const getAll = async () => {
  const likes = await db('likes')
  logger.info('Getting all the likes')
  return likes
}

export const getByObjectId = async (objectId) => {
  const likes = await db('likes').where({ objectId })
  if (likes) return likes
  return null
}

export const getByUserId = async (userId) => {
  const likes = await db('likes').where({ userId })
  if (likes) return likes
  return null
}

export const countByObjectId = async (objectId) => {
  const count = await db('likes')
    .where({ objectId })
    .count('objectId', { as: 'count' })
    .first()
  if (count) return count
  return null
}

export const countByUserId = async (userId) => {
  const count = await db('likes')
    .where({ userId })
    .count('userId', { as: 'count' })
    .first()
  if (count) return count
  return null
}

export const getById = async (id) => {
  const like = await db('likes').where({ id }).first()
  if (like) return like
  return null
}

export const add = async (l) => {
  const { error } = likeSchema.validate(l)
  if (error) {
    logger.error(error)
    return { error: error.details[0].message }
  }

  const id = await db('likes').insert({
    ...l,
    created_at: new Date().toLocaleString(),
    updated_at: new Date().toLocaleString(),
  })
  const like = await getById(id[0])
  return like
}

export const removeById = async (id) => {
  await db('likes').where({ id }).del()
  const likes = await getAll()
  return likes
}

export const removeByLike = async (objectId, userId) => {
  await db('likes').where({ objectId, userId }).del()
  const likes = await getAll()
  return likes
}
