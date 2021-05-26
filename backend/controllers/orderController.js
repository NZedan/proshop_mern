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

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
// @called  getOrderDetails() OrderScreen.js -> orderActions.js -> orderRoutes.js
export const getOrderById = asyncHandler(async (req, res) => {
	// Populate references fields from other documents, in this case getting name and email from the user document
	const order = await Order.findById(req.params.id).populate('user', 'name email');

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
// @called  payOrder() OrderScreen.js -> orderActions.js -> orderRoutes.js
export const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		// Populated with data from PayPal (may need other fields for different pay clients)
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};

		const updatedOrder = await order.save();

		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
// @called  deliverOrder() OrderScreen.js -> orderActions.js -> orderRoutes.js
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();

		const updatedOrder = await order.save();

		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
// @called  listUserOrders() ProfileScreen.js -> orderActions.js -> orderRoutes.js
export const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });

	if (orders) {
		res.json(orders);
	} else {
		res.status(404);
		throw new Error('No orders found');
	}
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
// @called  listUserOrders() ProfileScreen.js -> orderActions.js -> orderRoutes.js
export const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate('user', 'id name');

	if (orders) {
		res.json(orders);
	} else {
		res.status(404);
		throw new Error('No orders found');
	}
});
