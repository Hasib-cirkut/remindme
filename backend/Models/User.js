var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	username: { type: String, unique: true, required: true },
	email: { type: String, unique: true, required: true },
	password: String,
	displayName: { type: String, default: '' },
	private: { type: Boolean, default: false }
});

module.exports = mongoose.model('users', userSchema);
