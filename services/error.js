const errorHandler = (msg, rejectFunction)=>{

	rejectFunction({error:{ msg: msg}})

}

module.exports = ()=>{ return errorHandler }