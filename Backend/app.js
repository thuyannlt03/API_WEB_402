var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require ('express-session');
var mongoose = require('mongoose');
require('./components/category/Model');
var cors = require('cors');

//cookies và session

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var Lab2DienTich = require('./routes/dientichlab2');
var Lab2ChuVi = require('./routes/chuvilab2');
var userAPIRouter = require('./routes/api/User');
var productAPIRouter = require('./routes/api/Product');
var userCpanelRouter = require('./routes/cpanel/User');
var productCpanelRouter = require('./routes/cpanel/Product');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'iloveyou',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(cors())
mongoose.connect('mongodb://127.0.0.1:27017/MOB402', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));

// http://localhost:3000/
app.use('/', indexRouter);
// http://localhost:3000/users
app.use('/users', usersRouter);
// http://localhost:3000/dien-tich
app.use('/dien-tich', Lab2DienTich);
// http://localhost:3000/chu-vi
app.use('/chu-vi', Lab2ChuVi);
// http://localhost:3000/api/user
app.use('/api/user', userAPIRouter);
// http://localhost:3000/api/product
app.use('/api/product', productAPIRouter);
// http://localhost:3000/cpanel/user
app.use('/cpanel/user', userCpanelRouter);
// http://localhost:3000/cpanel/product
app.use('/cpanel/product', productCpanelRouter);


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


// http://localhost:3000/

//chuoi send mail
//sqeotfunvrndoytz