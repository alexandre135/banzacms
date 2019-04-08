const model = require('../models/usersDAO.js')


const users = (app, req, res)=>{
	
	const { dbSchema, dbConnect } = app.services.database

	return {

		get: async ()=>{
			
			const email = req.params.email
			try{
				const userInfo = await model.users(dbConnect, dbSchema).list(email)
				res.send({userInfo})
			}catch(error){
				res.send(error)
			}

		},
		insert: ()=>{
			const data = req.body

			//Data validation
			req.check('password')
			.isLength({ min: 6, max:15 }).withMessage('O password deve conter entre 6 e 15 caracteres')
    		.matches(/([a-zA-Z_@.#$&%*!()]\d)|(\d[a-zA-Z_@.#*$&%!()])/).withMessage('O password precisa conter números e letras')

    		req.check('email')
    		.isEmail().withMessage('Email inválido')

    		

    		const errors = req.validationErrors();
    		console.log('erros'+errors)

			if (errors) {
			    return res.status(422).json({ errors })
			  }else{
				model.users(dbConnect, dbSchema).insert(res, data, (result)=>{

					res.send(result)
				})
			}
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