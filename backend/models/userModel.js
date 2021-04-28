import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash new passwords
userSchema.pre('save', async function (next) {
	// If the password has not been modified, don't run hash function, move straight to next
	if (!this.isModified('password')) {
		next();
	}
	// Hash new password on save to DB
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
