const model = require('../models/usersDAO.js')


const users = (app, req, res)=>{

	return {

		list: ()=>{
			
			res.send('estou no controller list\n')

		},
		insert: ()=>{
			const data = req.body
			const { dbSchema, dbConnect } = app.services.database
			model.users(dbConnect, dbSchema).insert(data, function(result){

				res.send(result)
			})

		},
		update: ()=>{
			//var connection = app.services.database.dbConnect;
			//console.log(connection)
			res.send('estou no controller update\n')

		},
		del: ()=>{
			
			res.send('estou no controller delete\n')

		}

	}
}

module.exports = { users }