let mongoose = require('mongoose');
var schema = mongoose.Schema;

const userSchema = ()=>{
	const userSchema = new schema({
		name: String,
		email: String,
		password: String,
		accesslvl: Number
	})
	
	return userSchema;
}

module.exports = { userSchema }