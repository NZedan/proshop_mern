// Middleware to simplify the error handling in asynchronous interaction with the database
// Simply wrap the async function
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// Route handled in server.js
// express-async-handler simplifies the try/catch syntax for express routes
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
// @called  createOrder() PlaceOrderScreen.js
export const addOrderItems = asyncHandler(async (req, res) => {
	// Gets prices and stock quantities from DB and calculates shipping, tax and total avoiding tampering in front end
	const { orderItems, deliveryAddress, paymentMethod } = req.body;
	let priceOfItems;

	let deliveryPriceChecked;
	let taxPriceChecked;
	let totalChecked;
	const checkedPrices = {
		delivery: deliveryPriceChecked,
		tax: taxPriceChecked,
		total: totalChecked,
	};

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
	} else {
		// Check prices & update quantity in stock
		const getItemsFromDB = (order) => {
			return new Promise((resolve, reject) => {
				const productPrices = [];
				order.forEach(async (orderItem) => {
					const product = await Product.findById(orderItem.productId);

					priceOfItems = Number((product.price * orderItem.qty).toFixed(2));
					productPrices.push(priceOfItems);

					if (product.countInStock >= orderItem.qty) {
						product.countInStock -= orderItem.qty;
						await product.save();
					} else if (product.countInStock < orderItem.qty) {
						orderItem.qty = product.countInStock;
						orderItem.message = 'One or more items unavailable, your order has been updated';
						product.countInStock = 0;
						await product.save();
					} else if (!product.countInStock) {
						orderItem.qty = 0;
						orderItem.message = 'Item out of stock, your order has been updated';
					}

					if (productPrices.length === order.length) {
						resolve(productPrices);
					}
				});
			});
		};

		const checkPrices = (prices) => {
			return new Promise((resolve, reject) => {
				const subtotal = prices.reduce((acc, item) => acc + item, 0);
				checkedPrices.delivery = subtotal > 100 ? Number(0) : Number(10);
				checkedPrices.tax = Number((subtotal - subtotal / 1.2).toFixed(2));
				checkedPrices.total = Number(subtotal) > 100 ? Number(subtotal) : Number(subtotal + 10);

				resolve(checkedPrices);
			});
		};

		const createOrder = (checkedPrices) => {
			return new Promise((resolve, reject) => {
				const order = new Order({
					orderItems,
					user: req.user._id,
					deliveryAddress,
					paymentMethod,
					deliveryPrice: checkedPrices.delivery,
					taxPrice: checkedPrices.tax,
					totalPrice: checkedPrices.total,
				});

				resolve(order);
			});
		};

		const saveOrder = async (newOrder) => {
			const createdOrder = await newOrder.save();
			// 201 - something created
			res.status(201).json(createdOrder);
		};

		// Run asynchronous checks to the database
		getItemsFromDB(orderItems)
			.then((data1) => {
				return checkPrices(data1);
			})
			.then((data2) => {
				return createOrder(data2);
			})
			.then((data3) => {
				saveOrder(data3);
			})
			.catch((error) => {
				console.error(error);
				throw new Error('Create order failed', error);
			});
	}
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
// @called  getOrderDetails() OrderScreen.js -> orderActions.js -> orderRoutes.js
export const getOrderById = asyncHandler(async (req, res) => {
	// Populate references fields from other documents, in this case getting name and email from the user document
	const order = await Order.findById(req.params.id).populate('user', 'name email');

	// Check if user is admin or order belongs to user
	if (order && (req.user.isAdmin || req.user._id.equals(order.user._id))) {
		// Check time elapsed since order created
		const orderCreatedAt = new Date(order.createdAt);
		const timeElapsedHrs = (Date.now() - orderCreatedAt.getTime()) / (1000 * 60 * 60) + 1;

		if (timeElapsedHrs > 2 && !order.isPaid && !order.message) {
			order.message = 'Order timed out and has been deleted';
			order.isDeleted = true;
			const updatedOrder = await order.save();
			// Reset products quantity in stock
			order.orderItems.forEach(async (orderItem) => {
				const product = await Product.findById(orderItem.productId);
				product.countInStock += orderItem.qty;
				await product.save();
				console.log('Product updated');
			});
			res.json(updatedOrder);
		} else {
			res.json(order);
		}
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
