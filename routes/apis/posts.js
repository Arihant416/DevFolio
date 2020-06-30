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
// @Route Get api/posts
// @desc  get all posts
// @access Private
router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});
// @Route Get api/posts/:id
// @desc  get specific post
// @access Private
router.get('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}
		res.json(post);
	} catch (error) {
		console.error(error.message);
		if (error.kind === 'ObjectId') {
			return res.status(404).json({ message: 'Post not found' });
		}
		res.status(500).send('Server Error');
	}
});
// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		//Check User
		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ message: 'Unauthorized User' });
		}
		await post.remove();
		res.json({ message: 'Post successfully removed' });
	} catch (error) {
		console.error(error.message);
		if (error.kind === 'ObjectId') {
			return res.status(404).json({ message: 'Post not found' });
		}
		res.status(500).send('Server Error');
	}
});
module.exports = router;
