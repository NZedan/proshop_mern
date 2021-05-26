// Path - node module for working with file paths
import path from 'path';
// Using ES module syntax by adding type: module to package.json
import express from 'express';
import dotenv from 'dotenv';
// Colours logs to the console
import colors from 'colors/safe.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// Node requires the file extension when importing files
import connectDB from './config/db.js';
// Only used in pre DB testing
// import products from './data/products.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

connectDB();

const app = express();

// Use bodyparser to access form data in request
app.use(express.json());

app.get('/', (req, res) => {
	res.send('API is running...');
});

// Anything that goes to this route is linked to productRoutes
app.use('/api/products', productRoutes);

// Anything that goes to this route is linked to userRoutes
app.use('/api/users', userRoutes);

// Route for orders
app.use('/api/orders', orderRoutes);

// For file uploads (product images)
app.use('/api/upload', uploadRoutes);

// Makes uploads dir 'static' - accessible to the browser
// __dirname only available under standard js modules, this syntax makes it behave as expected in ES6
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// For PayPal checkout process - Get PayPal Client ID
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

// // Used for initial setup before DB, now moved to productRoutes.js and handled by the above line
// app.get('/api/products', (req, res) => {
// 	res.json(products);
// });

// app.get('/api/products/:id', (req, res) => {
// 	const product = products.find((p) => p._id === req.params.id);
// 	res.json(product);
// });

// 404 error handler for routes that don't exist
app.use(notFound);

// Middleware for custom error handling - returns error message and stack trace in json format
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(colors.verbose(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`)));

// set colors theme
colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: ['blue', 'underline'],
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red',
});
