const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const router = require('router');
const passport = require('passport');
const session = require('express-session');
const URLSlugs = require('mongoose-url-slugs');

// learning
const favicon = require('serve-favicon');
const logger = require('morgan');

require('./db');
require('./auth');


app.use(express.urlencoded({ extended: false }));   //body parser


/************************************************** Setting Cookies Express *************************************/
const sessionOptions = {
  secret: 'secret for signing session id(store elsewhere)',
  saveUninitialized: true,
  resave: true
}
app.use(session(sessionOptions));
// req.session and req.session.id and req.sessionID available



app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});


const myRouter = require('./routes/myrouter');

app.use(function(req, res, next) {
  res.set('Server', 'My first deployed server');
  next();
});







// const publicPath = path.resolve(__dirname, "views");
// app.use(express.static(publicPath));

app.set('views', path.join(__dirname, 'views'));  // setting views
app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public'))); // for css

app.use('/', myRouter);





//need to see what this is doing

//404 and forward to error handler
app.use( function(req, res, next){
  let err = new Error('not found');
  err.status = 404;
  next(err);
});

//dev error handler .. will print stacktrace
if (app.get('env') == 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

//production error handler
// no stacktraced leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT);
console.log(`started server on port ${PORT}`);
