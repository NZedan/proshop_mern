import bcrypt from 'bcryptjs';

// HashSync is only for this example dataset as hashing should be performed asynchronously on a live form

const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Jimi Hendrix',
		email: 'jimi@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Joni Mitchell',
		email: 'joni@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
];

export default users;
