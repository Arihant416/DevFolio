const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Atlas Connected');
	} catch (error) {
		console.log(err.message);
		//Exit Process with status failure code 1
		process.exit(1);
	}
};

module.exports = connectDB;
