const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const pug = require('pug');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const webCtrl = require(`${__dirname}/controller/webCtrl`); 
const errCtrl = require(`${__dirname}/controller/errorCtrl`);

const app = express();
dotenv.config({path : './config.env'})

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(`${__dirname}/public`));


//Routes

app.route('/').get(webCtrl.loginPage).post(webCtrl.authUser);

app.route('/check').get(webCtrl.checkLogin).post(webCtrl.verifyToken);

app.route('/register').get(webCtrl.regPage).post(webCtrl.regUser);

app.use(errCtrl);
dotenv.config({path : path.join(__dirname,'config.env')})

mongoose.connect(process.env.MONGODB_CLOUD_DB).then(() => console.log('DB connected..')).catch(err => console.log(err));

app.listen(1000,() => {
	console.log('TODO running ...');
}); 
