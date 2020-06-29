const jwt = require('jsonwebtoken'),
	config = require('config');

module.exports = function (req, res, next) {
	// Get Token from header
	const token = req.header('x-auth-token');

	//Check if no token
	if (!token) {
		return res.status(401).json({ message: 'Authorization failed' });
	}
	//Verify token
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded.user;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Invalid Token' });
	}
};
