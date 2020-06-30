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
// @route   PUT api/post/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		//Check if Post's been liked already by a User
		if (
			post.likes.filter((like) => like.user.toString() === req.user.id).length >
			0
		) {
			return res.status(400).json({ message: 'Post already liked' });
		}
		post.likes.unshift({ user: req.user.id });
		await post.save();
		res.json(post.likes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});
// @route   PUT api/post/unlike/:id
// @desc    UnLike a post
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		//Check if Post's been liked already by a User
		if (
			post.likes.filter((like) => like.user.toString() === req.user.id)
				.length === 0
		) {
			return res.status(400).json({ message: 'Post was never liked' });
		}
		//Remove index Nikalna hoga
		const removeIndex = post.likes
			.map((like) => like.user.toString())
			.indexOf(req.user.id);
		post.likes.splice(removeIndex, 1);
		await post.save();
		res.json(post.likes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @Route POST api/post/comment/:id
// @desc  Post a comment on a post
// @access Private
router.post(
	'/comment/:id',
	[auth, [check('text', 'Text cannot be empty').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const user = await User.findById(req.user.id).select('-password');

			const post = await Post.findById(req.params.id);
			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			};
			post.comments.unshift(newComment);
			await post.save();
			res.json(post.comments);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route Delete api/posts/comment/:id/:comment_id
// @desc Delete a comment
// access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		//Pull the comment out
		const comment = post.comments.find(
			(comment) => comment.id === req.params.comment_id
		);
		//Making sure comment does exists
		if (!comment) {
			return res.status(404).json({ message: 'Comment does not exists' });
		}
		//Check user
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ message: 'Unauthorized User' });
		}
		//Remove index Nikalna hoga
		const removeIndex = post.comments
			.map((comment) => comment.user.toString())
			.indexOf(req.user.id);
		post.comments.splice(removeIndex, 1);
		await post.save();
		res.json(post.comments);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});
module.exports = router;
