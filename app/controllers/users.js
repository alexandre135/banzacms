const model = require('../models/usersDAO.js')


const users = (app, req, res)=>{
	
	const { dbSchema, dbConnect } = app.services.database

	return {

		get: async ()=>{
			
			let email = req.params.email
			try{
				const userInfo = await model.users(dbConnect, dbSchema, res).list(email)
				res.send(userInfo)
			}catch(error){
				res.status(422).send(error)
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
			if (errors) {
			    return res.status(422).json({ errors })
			  }else{
				model.users(dbConnect, dbSchema, res).insert(res, data, (result)=>{

					res.send(result)
				})
			}
		},

		update: async ()=>{
			const data = req.body
			try{
				const update = await model.users(dbConnect, dbSchema, res).update(data)
				res.send(update)
			}catch(error){
				res.status(422).send(error)
			}
		},

		del: async ()=>{
			const data = req.body
			try{
				const deleted = await model.users(dbConnect, dbSchema, res).del(data)
				res.send(deleted)
			}catch(error){
				res.status(422).send(error)
			}
		}

	}
}

module.exports = { users }