var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	username: String,
	title: String,
	type: String
});

module.exports = mongoose.model('posts', postSchema);
