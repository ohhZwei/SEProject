/**
 * Created by 别人都叫我小马 on 2018/11/22.
 */
let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')
let session = require('express-session')
let md5 = require('md5')
let DB = require('../modules/db')
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

//登陆页
router.get('/', function (req, res) {
  res.render('login/login')
})

router.get('/register', function (req, res) {
  res.render('login/register')
})

router.post('/dologin', function (req, res) {

  let map = {
    0: 'user',
    1: 'admin',
    2: 'su'
  }

  let username = req.body.username;
  let password = md5(req.body.password);

  DB.find('user', {
    username,
    password,
  }, function (err, data) {
    if (data.length > 0) {

      //保存用户信息,经测试是有效的，勿删
      req.session.userinfo = data[0]
      //保存用户信息,经测试是有效的，供全局页面使用，勿删，否则header报错
      req.app.locals['userinfo'] = data[0];
        console.log(data[0]);
        //路由重定向

        // res.send("<script>alert(12321323);location.href='/routes/' + map[parseInt(data[0].status)]</script>")
      res.redirect('/routes/' + map[parseInt(data[0].status)]) // 登录成功，跳转详情界面
    } else {
      res.send("<script>alert('登陆失败');location.href='/routes/login'</script>")
    }
  })

})

router.post('/doRegister',function (req,res) {
  console.log(req.body);
  let userinfo = {
    username:req.body.username,
    password:md5(req.body.password),
    status:"0"
  }
  DB.insert('user',userinfo,function (err,data) {
    if(!err){
      res.send("<script>alert('注册成功');location.href='/routes/login'</script>")
    }

  })

})

router.get('/isExisted',function (req,res) {
  let username = req.query.username

  DB.find('user',{username,"status":"0"},function (err,data) {
    if(!err){
      console.log(data);
      if(data.length !=0){
        res.json({isExisted:1})
      }
      else {
        res.json({isExisted:0})
      }
    }
  })

})



router.get('/logout', function (req, res) {
  //销毁seesion
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send("<script>alert('注销成功');location.href='/routes/login'</script>")
    }
  })
})

module.exports = router
