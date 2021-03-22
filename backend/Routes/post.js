const express = require('express');

const router = express.Router();

const PostModel = require('../Models/Post');

router.post('/', async (req, res) => {
	let { username } = req.body;

	let posts = await PostModel.find({ username });

	console.log(posts);

	res.send(posts);
});

router.post('/addpost', async (req, res) => {
	console.log(req.body);

	let { username, title, type, genre } = req.body;

	let post = new PostModel({
		username,
		title,
		type,
		genre
	});

	try {
		let savedPost = await post.save();

		res.json({ message: 'postadded' });
	} catch (err) {
		res.json({ message: err });
	}
});

router.delete('/deletepost', async (req, res) => {
	let { _id } = req.body;

	let post = await PostModel.deleteOne({ _id });

	res.send({
		message: 'post_deleted'
	});
});

module.exports = router;
