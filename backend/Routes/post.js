const express = require('express');

const router = express.Router();

const PostModel = require('../Models/Post');

router.get('/', (req, res) => {
	res.send({
		message: 'We are in post route'
	});
});

router.post('/addpost', async (req, res) => {
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

module.exports = router;
