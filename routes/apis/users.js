const express = require('express'),
	router = express.Router();

// @Route Get api/users
// @desc  Test User
// @access Pulbic
router.get('/', (req, res) => {
	res.send('User Route');
});

module.exports = router;
