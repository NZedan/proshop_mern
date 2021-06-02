// Middleware is a function that has access to request and response objects
import express from 'express';
// // Now handled in controller
// // Middleware to simplify the error handling in asynchronous interaction with the database
// // Simply wrap the async function
// import asyncHandler from 'express-async-handler';
// import Product from '../models/productModel.js';
const router = express.Router();
import {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.get('/top', getTopProducts);
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);

// // Refactored to the above two lines as functionality now handled in productController.js

// // Route pointed to productRoutes from server.js
// // Route function handled here in the controller
// // express-async-handler simplifies the try/catch syntax for express routes
// // @desc    Fetch all products
// // @route   GET /api/products
// // @access  Public
// router.get(
// 	'/',
// 	asyncHandler(async (req, res) => {
// 		const products = await Product.find({});
// 		// throw new Error('Test Error');
// 		res.json(products);
// 	})
// );

// // @desc    Fetch single product
// // @route   GET /api/products/:id
// // @access  Public
// router.get(
// 	'/:id',
// 	asyncHandler(async (req, res) => {
// 		const product = await Product.findById(req.params.id);
// 		// throw new Error('Test Error');
// 		if (product) {
// 			res.json(product);
// 		} else {
// 			// Sets specific error of 404 (not found) default (if none set) is 500 (server error)
// 			res.status(404);
// 			// This get caught and handled by the custom error handler in errorMiddleware.js
// 			throw new Error('Product not found');
// 		}
// 	})
// );

export default router;
