var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dopostRouter = require('./routes/dopost');
var app = express();
const api = require('./routes/api');
var myossRouter = require('./routes/myoss');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/dopost', dopostRouter);
app.use('/myoss', myossRouter);
app.use('/users', usersRouter);
app.get('/style.css',function(req,res){
  res.sendFile(__dirname+'/views/style.css');
});

app.get('/lib/crypto1/crypto/crypto.js',function(req,res){
  res.sendFile(__dirname+'/views/lib/crypto1/crypto/crypto.js');
});

app.get('/lib/base64.js',function(req,res){
  res.sendFile(__dirname+'/views/lib/base64.js');
});

app.get('/lib/crypto1/hmac/hmac.js',function(req,res){
  res.sendFile(__dirname+'/views/lib/crypto1/hmac/hmac.js');
});

app.get('/lib/crypto1/sha1/sha1.js',function(req,res){
  res.sendFile(__dirname+'/views/lib/crypto1/sha1/sha1.js');
});
app.get('/lib/plupload-2.1.2/js/plupload.full.min.js',function(req,res){
  res.sendFile(__dirname+'/views/lib/plupload-2.1.2/js/plupload.full.min.js');
});
app.get('/lib/crypto1/hmac/hmac.js',function(req,res){
  res.sendFile(__dirname+'/views/lib/crypto1/hmac/hmac.js');
});
app.get('/upload.js',function(req,res){
  res.sendFile(__dirname+'/views/upload.js');
});
app.use('/api', api);
app.use(favicon(path.join(__dirname, 'public', 'images','favicon.ico')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
