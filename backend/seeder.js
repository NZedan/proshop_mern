// Creates database entries to pre-populate database

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

// Clears DB collections then populates them with datasets imported here
const importData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		// Also stored in a variable as array so the admin id can be accessed and added to the products entries
		const createdUsers = await User.insertMany(users);
		// Gets the adminUser id
		const adminUser = createdUsers[0]._id;
		// Adds the adminId to the user field in products
		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});

		await Product.insertMany(sampleProducts);

		console.log(colors.info('Data imported'));
		process.exit();
	} catch (err) {
		console.error(colors.error(`${error}`));
		// 1 means exit with failure
		process.exit(1);
	}
};

// Clear DB collections
const destroyData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log(colors.warn('Data destroyed!'));
		process.exit();
	} catch (err) {
		console.error(colors.error(`${error}`));
		// 1 means exit with failure
		process.exit(1);
	}
};

// set colors theme
colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: ['blue', 'underline'],
	prompt: 'grey',
	info: ['green', 'inverse'],
	data: 'grey',
	help: 'cyan',
	warn: ['red', 'inverse'],
	debug: 'blue',
	error: ['red', 'inverse'],
});

// This function is called from CLI with 'node backend/seeder'
// argv[2] refers to the command flag so dstroy data is run with
// 'node backend/seeder -d'
// This can then be given a script in package.json to be called with
// npm run data:import or data:destroy
if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
