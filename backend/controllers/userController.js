// Middleware to simplify the error handling in asynchronous interaction with the database
// Simply wrap the async function
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// Route handled in server.js
// express-async-handler simplifies the try/catch syntax for express routes
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
// @called  login() userActions.js
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	// // Test to show access to request object functions
	// res.send({email, password});
	const user = await User.findOne({ email });

	// Maybe refactor to only send id and token
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
// @called  register() userActions.js
export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
// @called  getUserDetails() ProfileScreen.js
export const getUserProfile = asyncHandler(async (req, res) => {
	// User is sent in the request object by the auth middleware
	const { user } = req;

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
// @called  updateUserProfile() ProfileScreen.js
export const updateUserProfile = asyncHandler(async (req, res) => {
	// User is sent in the request object by the auth middleware
	const { user } = req;

	if (user) {
		// Sets name and email to new details or if none then origianl value
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		// Only set if changed to avoid re-hashing
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});
