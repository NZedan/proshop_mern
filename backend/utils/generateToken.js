import jwt from 'jsonwebtoken';

// By signing with users password, if account gets hacked, changing password invalidates previous tokens
const generateToken = (id, password) => {
	return jwt.sign({ id }, process.env.JWT_SECRET + password, {
		expiresIn: '1m',
	});
};

export default generateToken;
