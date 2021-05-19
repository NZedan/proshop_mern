// Middleware to simplify the error handling in asynchronous interaction with the database
// Simply wrap the async function
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// Route handled in server.js
// express-async-handler simplifies the try/catch syntax for express routes
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
// @called  listProducts() productActions.js
export const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	// throw new Error('Test Error');
	res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
// @called  listProductDetails() productActions.js
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

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
// @called  deleteProduct() ProductListScreen -> productActions -> productRoutes
export const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	// throw new Error('Test Error');
	if (product) {
		await product.remove();
		res.json({ message: 'Product removed' });
	} else {
		// Sets specific error of 404 (not found) default (if none set) is 500 (server error)
		res.status(404);
		// This get caught and handled by the custom error handler in errorMiddleware.js
		throw new Error('Product not found');
	}
});

// Skip this step and go straight to edit product screen so no sample is saved to DB
// // @desc    Create a product
// // @route   POST /api/products
// // @access  Private/Admin
// // @called
// export const createProduct = asyncHandler(async (req, res) => {
// 	const product = new Product({
// 		name: 'Sample Name',
// 		price: 0,
// 		user: req.user._id,
// 		image: '/images/sample.jpg',
// 		brand: 'Sample Brand',
// 		category: 'Sample Category',
// 		countInStock: 0,
// 		numReviews: 0,
// 		description: 'Sample Description',
// 	});

// 	const createdProduct = await product.save();
// 	// 201 - something created
// 	res.status(201).json(createdProduct);
// });

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
// @called
export const createProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, brand, category, countInStock, numReviews } = req.body;

	const productExists = await Product.findOne({ name });

	if (productExists) {
		res.status(400);
		throw new Error('Product already exists');
	}

	const product = await Product.create({
		user: req.user._id,
		name,
		price,
		description,
		image,
		brand,
		category,
		countInStock,
		numReviews,
	});

	if (product) {
		// 201 - something created
		res.status(201).json({
			name: product.name,
			price: product.price,
			description: product.description,
			image: product.image,
			brand: product.brand,
			category: product.category,
			countInStock: product.countInStock,
		});
	} else {
		res.status(400);
		throw new Error('Invalid product data');
	}
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
// @called
export const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, brand, category, countInStock } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});
