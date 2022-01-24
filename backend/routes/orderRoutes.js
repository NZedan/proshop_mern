import express from 'express';
const router = express.Router();
import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	getMyOrders,
	getOrders,
	updateOrderToDelivered,
	// paypalCapture,
} from '../controllers/orderController.js';
import { refreshToken, protect, admin } from '../middleware/authMiddleware.js';

// This route is protected by passing in the protect middleware as the first argument in the get request
router.route('/').post(refreshToken, protect, addOrderItems).get(refreshToken, protect, admin, getOrders);
router.route('/myorders').get(refreshToken, protect, getMyOrders);
// router.route('/capture-paypal-transaction').get(protect, paypalCapture);
// Routes with a param should be placed at the bottom otherwise another extension could be taken for the id
router.route('/:id').get(refreshToken, protect, getOrderById);
router.route('/:id/pay').put(refreshToken, protect, updateOrderToPaid);
router.route('/:id/deliver').put(refreshToken, protect, admin, updateOrderToDelivered);

export default router;
