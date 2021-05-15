import express from 'express';
const router = express.Router();
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// This route is protected by passing in the protect middleware as the first argument in the get request
router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
// Routes with a param should be placed at the bottom otherwise another extension could be taken for the id
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
