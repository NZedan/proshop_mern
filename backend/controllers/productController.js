// Middleware to simplify the error handling in asynchronous interaction with the database
// Simply wrap the async function
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// Route handled in server.js
// express-async-handler simplifies the try/catch syntax for express routes
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	// throw new Error('Test Error');
	res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	// throw new Error('Test Error');
	if (product) {
		res.json(product);
	} else {
		// Sets specific error of 404 (not found) default (if none set) is 500 (server error)
		res.status(404);
		// This get caught and handled by the custom error handler in errorMiddleware.js
		throw new Error('Product not found');
	}
});
