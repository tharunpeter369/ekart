var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();
var fileUpload=require('express-fileupload')   //file upload

var db=require('./config/connection')   // taking database
// taking session
var session=require('express-session');   
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload())    //using fileupload





db.connect((err)=>{      // connecting database
  if(err){
    console.log(err)
  }else{
    console.log('database connected')
  }
})

// const MongoClient = require('mongodb').MongoClient;

// Importing MongoClient from mongodb driver
// const { MongoClient } = require('mongodb');

// // Connecting to a local port
// const uri = 'mongodb://127.0.0.1:27017';

// const client = new MongoClient(uri, {
// 	useUnifiedTopology: true,
// 	useNewUrlParser: true
// });

// connect();

// // ESNext syntax using async-await
// async function connect() {
// 	try {
// 		await client.connect();
// 		const db = client.db('shopping');
// 		console.log(
// 	`Successfully connected to db ${db.databaseName}`);
// 	}
// 	catch (err) {
// 		console.error(`we encountered ${err}`);
// 	}
// 	finally {
// 		client.close();
// 	}
// }







//connecting session
app.use(session({          
  secret:'itsmykey',
  cookie:{maxAge:3600000000000}
}))



app.use('/', indexRouter);
app.use('/admin',adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
