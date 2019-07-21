const mongoose = require('mongoose')
const errorHandler = require('../error.js')()
mongoose.set('useFindAndModify', false);


const dbConnect = (res)=>{
	const conn = mongoose.connect('mongodb://localhost:27017/banza', {useCreateIndex: true, useNewUrlParser: true})
	const connection = mongoose.connection

	connection.on('error', (err)=>{
		console.error('connection Error: '+err)
		return res.status(500).send({error:{ msg: 'houve um problema ao se conectar com o banco de dados' }})
	})

	return connection
};

module.exports = ()=>{
	return dbConnect
}