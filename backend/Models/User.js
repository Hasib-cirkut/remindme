var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	username: { type: String, unique: true, required: true },
	email: String,
	password: String
});

module.exports = mongoose.model('users', userSchema);
