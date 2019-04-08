const users = (dbConnect, dbSchema) =>{
	
	const conn = dbConnect()
	const schema = dbSchema.userSchema()
	const user = conn.model('user', schema, 'users')

	return{
		list: async (email)=>{
			const userInfo = await user.findOne({ email })
			conn.close()
			return new Promise((resolve, reject)=>{
				console.log(userInfo)
				if(userInfo){
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

		update: ()=>{

		},
		del: ()=>{

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
				
		}
	}
}

module.exports = { users }