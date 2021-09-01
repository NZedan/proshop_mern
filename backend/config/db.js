import mongoose from 'mongoose';
import colors from 'colors/safe.js';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		console.log(colors.verbose(`MongoDB Connected: ${conn.connection.host}`));
	} catch (error) {
		console.error(colors.error(`Error: ${error.message}`));
		// 1 means exit with failure
		process.exit(1);
	}
};

// set theme
colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: ['blue', 'underline'],
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: ['red', 'underline'],
});

export default connectDB;
