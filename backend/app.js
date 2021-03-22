const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());
require('dotenv').config();

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

let uri = `mongodb+srv://root:${process.env.DB_PASS}@cluster0.80o53.mongodb.net/remindmeDB?retryWrites=true&w=majority`;

console.log(uri);

try {
	mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected'));
} catch (error) {
	console.log('could not connect');
}

app.listen(5000, () => {
	console.log(`Listening on http://localhost:5000/`);
});
