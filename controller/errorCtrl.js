

module.exports = (err,req,res,next) => {
  	if(err.code=='11000')
    {
        return res.status(422).json({
            status : 'fail',
            message : 'The usermail is exist already !'
        });
    }

  	res.status(err.code).json({
  		status : 'fail',
        message : err.message
  	});
 }