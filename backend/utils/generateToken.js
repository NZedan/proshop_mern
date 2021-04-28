import jwt from 'jsonwebtoken';

// For production set token to expire in 30 mins, also send as http cookie instead of directly
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

export default generateToken;
