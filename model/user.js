const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	email : {
		type : String,
		required : true,
		trim : true ,
		unique : true,
		validate : [validator.isEmail,'User must enter valid Email']
	},
	password : {
		type : String,
		required : true,
		trim : true,
		minlength : [6,'The password should atleast be 6 letters'],
		select : false
	},
	confirmpassword : {
		type : String,
		required : true,
		trim : true,
		validate : {
			validator : function(el) {
				return el===this.password;
	 			},
	 		message: 'Passwords are not the same!'
		}
	}
});

userSchema.pre('save', async function(next) {

	this.password = await bcrypt.hash(this.password,10);

	this.confirmpassword = undefined;
	next();
});

userSchema.methods.checkPassword = async function(givenPassword,userPassword) {
	return await bcrypt.compare(givenPassword,userPassword);
}
 
const User = mongoose.model('user',userSchema);

module.exports = User;