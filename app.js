var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index.js');
var usersRouter = require('./routes/users');
var hotelsRouter = require('./routes/hotels');
var adminstratorRouter = require('./routes/adminstrator');
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUI = require('swagger-ui-express');
var cors = require('cors')
var dotenv = require("dotenv").config();
require('./models/db');

var app = express();

// Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0.', 
  info: {
    title: 'Express API to manage hotels and bookings', 
    version: '1.0.0', 
    description: 'This is a REST API using express for managing hotels and its reservations',
    servers: [{
      url: 'https://swtabe-ass1-grp6.herokuapp.com/', 
      description: 'In development',
    }, ],
  },
};
 
const options = {
  swaggerDefinition, 
  apis: ['routes/*.js'], //Paths to files containing OpenAPI definitions
}; 

const swaggerSpec = swaggerJSDoc(options); 

// Adding and endpoint path to swagger 
app.use(cors());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec)); 


// View engine setup
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hotels', hotelsRouter); 
app.use('/adminstrators', adminstratorRouter);

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
