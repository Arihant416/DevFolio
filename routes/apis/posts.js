const express = require('express'),
	router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../controller/authController');
const Post = require('../../models/postModel'),
	Profile = require('../../models/Profile'),
	User = require('../../models/User');
// @Route POST api/posts
// @desc  Create a post
// @access Private
router.post(
	'/',
	[auth, [check('text', 'Text cannot be empty').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const user = await User.findById(req.user.id).select('-password');

			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			});
			const post = await newPost.save();
			res.json(post);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
