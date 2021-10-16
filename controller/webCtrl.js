const User = require('../model/user');
const jwt = require('jsonwebtoken');


exports.regPage = (req,res,next) => {
	res.render('register');
}

exports.loginPage = async (req,res,next) => {
	res.render('login');
}

exports.checkLogin = (req,res,next) => {
	res.render('checkLogin');
}

exports.authUser = async (req,res,next) => {
	try {

		const email = req.body.email, password = req.body.password;

		if(!email || !password)
		{
			const err = {
				code : 400,
				message : 'provide email and password'
			}
			return next(err);
		}

		const user = await User.findOne({email :  req.body.email}).select('+password');

		//const test = await (user.checkPassword(password,user.password));
		if(!user || !(await (user.checkPassword(password,user.password))))
		{
			const err = {
				code : 401,
				message : 'email or password is wrong'
			}
			return next(err);
		}	

		const token = jwt.sign({id : user._id},process.env.JWT_KEY,{
			expiresIn : process.env.JWT_EXPIRESIN
		});

		res.status(200).json({
			status : 'success',
			token
		});
		//console.log(token);
	}	catch (err) {
		console.log(err);
	}
}

exports.verifyToken = async (req,res,next) => {
	const token = req.body.token ;
	let user;
	try {
		 user = await jwt.verify(token,process.env.JWT_KEY);	
	} catch(e) {
		const err = {
			code : 400,
			message : 'Invalid Token'
		}
		return next(err);
	}

	const data = await User.findOne({_id : user.id}).select('-_id -__v');

	if(!data)
	{
		const err = {
			code : 401,
			message : 'User not found'
		}
		return next(err);
	}

	res.status(200).json({
		status : 'success',
		email  : data.email
	});
}

exports.regUser = async (req,res,next) => {
	try {
			const newuser = await User.create({
			email : req.body.email,
			password : req.body.password,
			confirmpassword : req.body.confirmpassword
			});

			newuser.password = undefined;
			//console.log(req.body);
			res.status(201).json({
				status : 'created',
				data : {
					newuser
				}
			});
 		} catch(err) {
 			next(err);
 		}

}
