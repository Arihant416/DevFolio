const express = require('express'),
	router = express.Router();

// @Route Get api/posts
// @desc  Test User
// @access Pulbic
router.get('/', (req, res) => {
	res.send('Posts Route');
});

module.exports = router;
