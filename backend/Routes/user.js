const express = require('express');

const router = express.Router();

const UserModel = require('../Models/User');

router.post('/login', async (req, res) => {
	try {
		const { username } = req.body;

		let post = await UserModel.find({ username });

		if (post.length === 0) {
			res.send({
				message: 'nouserfound'
			});
		} else {
			res.send({
				message: 'userfound'
			});
		}
	} catch (e) {
		res.send(e);
	}
});

router.post('/register', async (req, res) => {
	try {
		const { name, username, email, password } = req.body;

		let user = new UserModel({
			name,
			username,
			email,
			password
		});

		let savedUser = await user.save();

		res.send({
			message: 'useradded'
		});
	} catch (e) {
		if (e.code === 11000) {
			res.send({
				message: 'duplicate'
			});
		}
	}
});

module.exports = router;
