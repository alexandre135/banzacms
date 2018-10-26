const users = (dbConnect, dbSchema) =>{

	return{
		list: ()=>{

		},

		insert: (data, callback)=>{
			const conn = dbConnect()
			const schema = dbSchema.userSchema()
			conn.on('error', ()=>{
				console.error.bind(console, 'connection error:')
				msg = 'ocorreu um problema ao cadastrar o usuário'
				callback(msg)
			})
			
			conn.once('open', function(){
				
				const user = conn.model('user', schema, 'users')
				const newUser = new user(data)
			
				newUser.save(function(err){
					
					msg = 'usuário cadastrado com sucesso'
					conn.close();

					if(err) return false
					callback(msg)
				
				});

			});

		},
		
		update: ()=>{

		},
		del: ()=>{

		}
	}
}

module.exports = { users }