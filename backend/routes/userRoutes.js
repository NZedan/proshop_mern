import express from 'express';
const router = express.Router();
import { authUser, registerUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser);
router.post('/login', authUser);
// This route is protected by passing in the protect middleware as the first argument in the get request
router.route('/profile').get(protect, getUserProfile);

export default router;
