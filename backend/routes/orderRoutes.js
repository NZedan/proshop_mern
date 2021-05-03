import express from 'express';
const router = express.Router();
import { addOrderItems } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// This route is protected by passing in the protect middleware as the first argument in the get request
router.route('/').post(protect, addOrderItems);

export default router;
