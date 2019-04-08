const users = (dbConnect, dbSchema) =>{
	
	const conn = dbConnect()
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
				userInfo = await user.find({ email })
			}
			conn.close()
			return new Promise((resolve, reject)=>{	
				if(userInfo.length !== 0){
					resolve({userInfo})
				}else{
					reject({error:{msg:'usuário não encontrado'}})
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
			return new Promise((resolve, reject)=>{
				if(update){
					resolve({msg: 'atualizado com sucesso'})
				}else{
					reject({msg: 'ocorreu um erro na atualização'})
				}
			})
		},
		del: async (_id)=>{
			const deleted = await user.findOneAndDelete({_id})
			console.log(deleted)
			conn.close()
			return new Promise((resolve, reject)=>{
				if(deleted){
					resolve({msg:'Usuário removido com sucesso'})
				}else{
					reject({error:{msg:'Não foi possível remover o usuário'}})
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