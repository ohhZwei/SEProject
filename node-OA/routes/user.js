/**
 * Created by 别人都叫我小马 on 2018/11/23.
 */
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser')
let DB = require('../modules/db.js');

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())


router.get('/', function (req, res) {
  if (!req.session.userinfo) {
    res.send("<script>alert('请先登录');location.href='/routes/login'</script>")
  }
  else {
    DB.find('artical', {}, function (err, data) {
      let arr = [];

      for (let i = 0; i < data.length; i++) {
        arr.push(data[i].department_name)
      }
      let department_list = [...new Set(arr)]

      res.render('user', {
        list: data,
        department_list
      })
    })
  }


})

router.get('/departmentList',function (req,res) {
  DB.find('user', {"status":"1"}, function (err, data) {
    console.log(data)
    res.json(data)
  })
})


module.exports = router