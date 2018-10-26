const mongoose = require('mongoose')

const dbConnect = (callback)=>{
	const conn = mongoose.connect('mongodb://localhost:27017/banza', {useNewUrlParser: true})
	const connection = mongoose.connection
	
	return connection
};

module.exports = ()=>{
	return dbConnect
}