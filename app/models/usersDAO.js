const users = (dbConnect, dbSchema, res) =>{
	
	const errorHandler = require('../../services/error.js')() 
	const conn = dbConnect(res)
	const schema = dbSchema.userSchema()
	const user = conn.model('user', schema, 'users')


	const returnUserId = async (email)=>{
		const findUser = await user.findOne({email}) 		
		return findUser._id
	}

	return{
		list: async (email)=>{
			let userInfo

			if(!email){
				userInfo = await user.find({})
			}else{
				userInfo = await user.find({ email }, (err)=>{ if(err)console.error('erro '+err)})
			}
			conn.close()
			return new Promise((resolve, reject)=>{	
				if(userInfo.length !== 0){
					resolve({userInfo})
				}else{
					errorHandler('usuário não encontrado', reject)
					//reject({error:{msg:'usuário não encontrado'}})
				}		
			})
		},

		insert: (res, data, callback)=>{
			
			conn.on('error', ()=>{
				console.error.bind(console, 'connection error:')

			})
			
			conn.once('open', ()=>{
				

				const newUser = new user(data)
			
				newUser.save(err=>{
					
					msg = { msg: 'usuário cadastrado com sucesso'}
					conn.close();

					if(err){
						errors = { msg: 'email em uso'}
						console.error(err)
						return res.status(422).json({ errors })
					}
					
					callback(msg)
				
				});

			});

		},

		update: async (data)=>{
			const id = data._id
			const update = await user.findOneAndUpdate({_id: id}, data)
			conn.close()
			return new Promise((resolve, reject)=>{
				if(update){
					resolve({msg: 'atualizado com sucesso'})
				}else{
					errorHandler('ocorreu um erro na atualização', reject)
					//reject({msg: 'ocorreu um erro na atualização'})
				}
			})
		},

		del: async (_id)=>{
			const deleted = await user.findOneAndDelete({_id})
			conn.close()
			return new Promise((resolve, reject)=>{
				if(deleted){
					resolve({msg:'Usuário removido com sucesso'})
				}else{
					errorHandler('Não foi possível remover o usuário', reject)
					//reject({error:{msg:'Não foi possível remover o usuário'}})
				}
			})
		},

		searchUserByEmail: (userEmail)=>{
			
				var teste =  user.findOne({ email: userEmail })

				return teste.then(result=>{
					return result
				}).catch(err=>{
					console.log(err)
					throw err
				})
					
				
				
				//console.log(resultado)
				
		},

	}
}

module.exports = { users }