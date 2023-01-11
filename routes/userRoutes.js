import express from 'express'

import {
  authUser,
  getUserProfile,
  registerUser,
  updatedUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updatedUser
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMddileware.js'

const router = express.Router()

router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updatedUserProfile)

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/:id').delete(protect, admin, deleteUser).get(protect,admin,getUserById).put(protect,admin,updatedUser)

export default router
