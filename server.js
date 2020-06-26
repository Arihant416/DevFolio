const express = require('express'),
	app = express(),
	PORT = process.env.PORT || 5000;

const connectDB = require('./config/db');
//Connecting to Atlas
connectDB();
app.get('/', (req, res) => {
	res.send('Hi');
});

//Defining Our Routes
app.use('/api/users', require('./routes/apis/users'));
app.use('/api/auth', require('./routes/apis/auth'));
app.use('/api/profile', require('./routes/apis/profile'));
app.use('/api/posts', require('./routes/apis/posts'));

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
