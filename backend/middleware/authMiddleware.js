import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// Status(401) is not authorised

const refreshToken = asyncHandler(async (req, res, next) => {
	// Check if user logged in
	if (req.cookies.id) {
		try {
			const user = await User.findById(req.cookies.id);
			if (user) {
				const token = generateToken(user._id, user.password);
				req.headers.authorization = `Bearer ${token}`;
			}

			next();
		} catch (err) {
			console.error(err);
			res.status(401);
			throw new Error('Session expired');
		}
	}

	if (!req.cookies.id) {
		res.status(401);
		throw new Error('Session expired');
	}
});

const protect = asyncHandler(async (req, res, next) => {
	let token;
	// Checks if the token in the cookie and header, if any, as convention, starts with Bearer
	if (req.cookies.id && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			const user = await User.findById(req.cookies.id);
			// Splits into two array items at the space, 'Bearer' at position 0 and token at pos 1
			token = req.headers.authorization.split(' ')[1];
			// Decodes the token body (user id, issued at, expires at)
			const decoded = jwt.verify(token, process.env.JWT_SECRET + user.password);
			// Sets req.user to authenticated users profile minus the password, now accessible on all protected routes
			// req.user = await User.findById(decoded.id).select('-password');
			// If token valid send user data with request
			const currentTime = new Date().getTime() / 1000;
			if (decoded.exp > currentTime) {
				req.user = { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin };
			}

			next();
		} catch (err) {
			console.error(err);
			res.status(401);
			throw new Error('Not authorised, token error');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not authorised, no token');
	}
});

// Checks if user is an admin
const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error('Not authorised as an admin');
	}
};

export { refreshToken, protect, admin };
