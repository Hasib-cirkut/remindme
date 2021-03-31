const express = require('express');

const router = express.Router();

const UserModel = require('../Models/User');

router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;

		let post = await UserModel.find({ username, password });

		if (post.length === 0) {
			res.send({
				message: 'usernotfound'
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

router.post('/info', async (req, res) => {
	try {
		const { username } = req.body;

		let userInfo = await UserModel.findOne({ username }, { password: 0 });

		if (userInfo === null || userInfo === undefined) {
			res.send({ message: 'nouserfound' });
		} else res.send(userInfo);
	} catch (e) {
		console.log(e);
	}
});

router.put('/update', async (req, res) => {
	try {
		const { username, type, data } = req.body;

		console.log(req.body);

		let userInfo = await UserModel.findOne({ username });

		if (type === 'displayName') {
			userInfo.displayName = data;
		} else if (type === 'password') {
			userInfo.password = data;
		} else if (type === 'email') {
			userInfo.email = data;
		} else if (type === 'private') {
			if (data) {
				userInfo.private = true;
			} else {
				userInfo.private = false;
			}
		}

		let savedInfo = await userInfo.save();

		res.send({
			message: 'updated'
		});
	} catch (e) {}
});

module.exports = router;
