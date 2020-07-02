const express = require('express'),
	router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const normalize = require('normalize-url');

// @Route  Post api/users
// @desc   Register User
// @access Pulbic
router.post(
	'/',
	[
		check('name', 'Oh Come on? No name!!!').not().isEmpty(),
		check('email', 'Please add valid Email').isEmail(),
		check('password', 'Please enter a password with 6 or more chars').isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;

		try {
			//Check if user exists
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({
					errors: [{ msg: 'User already exists' }],
				});
			}

			//Get User's Gravatar

			const avatar = normalize(
				gravatar.url(email, {
					s: '200',
					r: 'pg',
					d: 'mm',
				}),
				{ forceHttps: true }
			);

			user = new User({
				name,
				email,
				avatar,
				password,
			});

			//Encrypt Password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();
			const payload = {
				user: {
					id: user.id,
				},
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
