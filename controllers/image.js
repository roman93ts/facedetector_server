const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '3ac16dc01c03440ab29bb9fd102b90e4'
});

const handleApiCall = (req,res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json("incorrect work with API"))	
}


const handleImage = (req,res,db)=>{
	const {id} = req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('error with counting'))
}

module.exports = {
	handleImage,
	handleApiCall
	//handleImage - можно и так))
}