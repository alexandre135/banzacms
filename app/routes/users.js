const controller = require('../controllers/users.js')

module.exports = app =>{
	app.get('/user/:email', (req, res)=>{
		controller.users(app, req, res).get()
	})
	app.get('/user', (req, res)=>{
		controller.users(app, req, res).get()
	})
	app.post('/user', (req, res)=>{	
		controller.users(app, req, res).insert()	
	})
	app.put('/user', (req, res)=>{	
		controller.users(app, req, res).update()	
	})
	app.delete('/user', (req, res)=>{	
		controller.users(app, req, res).del()	
	})
}