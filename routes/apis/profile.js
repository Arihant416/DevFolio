const express = require('express'),
	router = express.Router();

// @Route Get api/profile
// @desc  Test User
// @access Pulbic
router.get('/', (req, res) => {
	res.send('Profile Route');
});

module.exports = router;
