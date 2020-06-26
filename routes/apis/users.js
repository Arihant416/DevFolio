const express = require('express'),
	router = express.Router();
const { check, validationResult } = require('express-validator');

// @Route  Post api/users
// @desc   Register User
// @access Pulbic
router.post(
	'/',
	[
		check('name', 'Oh Come on? No name!!!').not().isEmpty(),
		check('email', 'Please add valid Email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more chars',
		).isLength({
			min: 6,
		}),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		res.send('User Route');
	},
);

module.exports = router;
