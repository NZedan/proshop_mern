import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
	let token;
	// Checks if the token in the header, if any, as convention, starts with Bearer
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			// Splits into two array items at the space, 'Bearer' at position 0 and token at pos 1
			token = req.headers.authorization.split(' ')[1];
			// Decodes the token body (user id, issued at, expires at)
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			// Sets req.user to authenticated users profile minus the password, now accessible on all protected routes
			req.user = await User.findById(decoded.id).select('-password');

			next();
		} catch (err) {
			console.error(err);
			res.status(401);
			throw new Error('Not authorised, no token');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not authorised, no token');
	}
});
