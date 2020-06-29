const express = require('express'),
	router = express.Router();
const auth = require('../../controller/authController');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// @route GET api/auth
// @desc Test route
// @access Public
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @Route  Post api/auth
// @desc   Authenticate and Get token
// @access Pulbic
router.post(
	'/',
	[
		check('email', 'Please add valid Email').isEmail(),
		check('password', 'Password is required..!').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;

		try {
			//Check if user exists
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({
					errors: [{ message: 'Invalid Credentials' }]
				});
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({
					errors: [{ message: 'Invalid Credentials' }]
				});
			}
			const payload = {
				user: {
					id: user.id
				}
			};
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (error) {
			console.log(error.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
