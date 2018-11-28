
const handleSignin = (req,res,db,bcrypt) => {
	const {name, email, password} = req.body;
	if (!email || !password) {
		return res.status(400).json("wrong registration information!");
	}
	db.select('email','hash').from('login')
		.where('email','=', email)
		.then(data => {
			const isOK = bcrypt.compareSync(password, data[0].hash);
			if (isOK) {
				return db.select('*').from('users')
				.where('email','=',email)
				.then(user => {
					res.json(user[0]);
				})
				.catch(err => res.status(400).json("error to get the user"))
			} else {
				res.status(400).json("incorrect credentials");
			}
		})
		.catch(err => res.status(400).json("wrong email or password"))
}

module.exports = {
	handleSignin: handleSignin
};