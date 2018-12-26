/**
 * Created by 别人都叫我小马 on 2018/11/22.
 */
let express = require('express');
let app = new express()
let session = require('express-session')
let admin = require('./routes/admin')
let indexRouter = require('./routes/index')
let adminRouter = require('./routes/admin')
let loginRouter = require('./routes/login')
let suRouter = require('./routes/su')
let userRouter = require('./routes/user')
let contentRouter = require('./routes/content')

let allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8001');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
};
app.use(allowCrossDomain);

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/upload-files',express.static('upload-files'))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    // secure: true
    maxAge: 1000 * 60 * 30
  },
  rolling: true
}))

app.use('/', indexRouter)
app.use('/index', indexRouter)
app.use('/routes', loginRouter)
app.use('/routes/login', loginRouter)
app.use('/routes/admin', adminRouter)
app.use('/routes/su', suRouter)
app.use('/routes/user', userRouter)
app.use('/routes/content', contentRouter)

app.listen(8001)