const model = require('../models/usersDAO.js')


const users = (app, req, res)=>{
	
	const { dbSchema, dbConnect } = app.services.database

	return {

		get: async ()=>{
			
			let email = req.params.email
			try{
				const userInfo = await model.users(dbConnect, dbSchema).list(email)
				res.send(userInfo)
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
		update: async ()=>{
			const data = req.body
			try{
				const update = await model.users(dbConnect, dbSchema).update(data)
				res.send(update)
			}catch(error){
				res.send(error)
			}
			
			//res.send('estou no controller update\n')

		},
		del: async ()=>{
			const data = req.body
			try{
				const deleted = await model.users(dbConnect, dbSchema).del(data)
				res.send(deleted)
			}catch(error){
				res.send(error)
			}
		}

	}
}

module.exports = { users }