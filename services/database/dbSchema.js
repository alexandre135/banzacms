const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = ()=>{
	const userSchema = new schema({
		name: String,
		email: {type: String, index: true, unique: true},
		password: {type: String, minlength: 6, maxlength: 15},
		accesslvl: {type:Number, min: 0, max:3}
	})
	
	return userSchema;
}

const postSchema = ()=>{
	const postSchema = new schema({
		title: String,
		content: String
	})
	return postSchema;
}

module.exports = { userSchema, postSchema }