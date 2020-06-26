const express = require('express'),
	app = express(),
	PORT = process.env.PORT || 5000;

const connectDB = require('./config/db');
//Connecting to Atlas
connectDB();
app.get('/', (req, res) => {
	res.send('Hi');
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
