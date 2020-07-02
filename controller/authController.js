const jwt = require('jsonwebtoken'),
	config = require('config');

module.exports = function (req, res, next) {
	// Get Token from header
	const token = req.header('x-auth-token');

	//Check if no token
	if (!token) {
		return res.status(401).json({ msg: 'Authorization failed' });
	}
	//Verify token
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Invalid Token' });
	}
};
