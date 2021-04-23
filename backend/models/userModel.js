import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			// So that new users aren't admin by default
			default: false,
		},
	},
	// Mongoose options - will create these fields automatically
	{
		timestamps: true,
	}
);

const User = mongoose.model('User', userSchema);

export default User;
