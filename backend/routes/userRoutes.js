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
	clearRefreshToken,
} from '../controllers/userController.js';
import { refreshToken, protect, admin } from '../middleware/authMiddleware.js';

// post is to register a user, get is the admin route to get all users info, admin checked in authMiddleware
router.route('/').post(registerUser).get(refreshToken, protect, admin, getUsers);
router.post('/login', authUser);
// Refresh access token with httpOnly cookie
router.post('/logout', clearRefreshToken);
// This route is protected by passing in the protect middleware as the first argument in the get request
router.route('/profile').get(refreshToken, protect, getUserProfile).put(refreshToken, protect, updateUserProfile);
router
	.route('/:id')
	.delete(refreshToken, protect, admin, deleteUser)
	.get(refreshToken, protect, admin, getUserById)
	.put(refreshToken, protect, admin, updateUser);

export default router;
