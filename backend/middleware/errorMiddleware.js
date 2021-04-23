// 404 error handler for routes that don't exist
const notFound = (req, res, next) => {
	// originalUrl is from the request object
	const error = new Error(`Not Found - ${req.originalUrl}`);
	// Sets the response status to 404 (not found)
	res.status(404);
	// Calls the next middleware passing along the error
	next(error);
};

// Middleware for custom error handling - returns error message and stack trace in json format
// An error can return a 200 (ok) code, if so the first part changes this to 500 (server error)
const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: err.message,
		// Returns stack trace for debugging if not in production mode
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
};

export { notFound, errorHandler };
