const express = require('express'),
	router = express.Router();

// @Route Get api/auth
// @desc  Test User
// @access Pulbic
router.get('/', (req, res) => {
	res.send('Auth Route');
});

module.exports = router;
