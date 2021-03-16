const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');

const postRoute = require('./Routes/post');
const userRoute = require('./Routes/user');

//Middleware

app.use(express.json());
app.use('/user', userRoute);
app.use('/post', postRoute);

app.use(
	express.urlencoded({
		extended: false
	})
);

app.get('/', (req, res) => {
	res.send({
		message: 'Hello'
	});
});

//conncecing to db

mongoose.connect('mongodb://localhost:27017/remindmeDB', { useNewUrlParser: true });

mongoose.connection.once('open', () => {
	console.log('database connection has been made');
});

app.listen(5000, () => {
	console.log(`Listening on http://localhost:5000/`);
});
