import express from 'express';
const router = express.Router();
import {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// post is to register a user, get is the admin route to get all users info, admin checked in authMiddleware
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
// This route is protected by passing in the protect middleware as the first argument in the get request
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser);

export default router;
