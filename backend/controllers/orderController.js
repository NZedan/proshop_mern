// Middleware to simplify the error handling in asynchronous interaction with the database
// Simply wrap the async function
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// Route handled in server.js
// express-async-handler simplifies the try/catch syntax for express routes
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
// @called  createOrder() PlaceOrderScreen.js
export const addOrderItems = asyncHandler(async (req, res) => {
	// Should send only productId's and qty's and calculate prices in backend to avoid user sending false info
	// MUST FIX THIS ISSUE

	const { orderItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice } = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();
		// 201 - something created
		res.status(201).json(createdOrder);
	}
});
