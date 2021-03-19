const express = require('express');

const router = express.Router();

const PostModel = require('../Models/Post');

router.get('/', async (req, res) => {
	let posts = await PostModel.find({});

	res.send(posts);
});

router.post('/addpost', async (req, res) => {
	console.log(req.body);

	let { username, title, type } = req.body;

	let post = new PostModel({
		username,
		title,
		type
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
