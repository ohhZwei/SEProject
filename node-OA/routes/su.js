 /**
 * Created by 别人都叫我小马 on 2018/11/22.
 */

let express = require('express');
let bodyParser = require('body-parser')
let fs = require('fs');
let DB = require('../modules/db.js');
let md5 = require('md5')

let router = express.Router();

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.get('/', function (req, res) {
  if (!req.session.userinfo) {
    res.send("<script>alert('请先登录');location.href='/routes/login'</script>")
  }
  else {
     if (req.session.userinfo && parseInt(req.session.userinfo.status) == 2) {
      DB.find('artical', {}, function (err, data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i].department_name)
        }
        let department_list = [...new Set(arr)]

        res.render('su/su', {
          list: data,
          department_list
        })
      })
    }
    else {
      res.sendStatus(404)
    }
  }
})

router.get('/adminControll', function (req, res) {
  res.render('su/adminControll')
})

router.post('/doAdd', function (req, res) {
    let newData = {
        "username": req.body.username,
        "password": md5(req.body.password),
        "department_name": req.body.department_name,
        "status": req.body.status
    }


  DB.insert('user', newData
    , function (err, data) {
      if (!err) {
        res.send("<script>alert('添加成功');history.go(-1)</script>")
      }
    })
})

 router.get("/isExisted",function (req,res) {

   let username = req.query.username
   console.log(username);
   DB.find('user',{username,"status":"1"},function (err,data) {
     if(!err){
       if(data.length!=0){
         res.json({"isExisted":"1"})
       }
     }
   })
 })

router.get('/editAdmin', function (req, res) {
  let id = req.query.id

  DB.find('user', {"_id": new DB.ObjectID(id)}, function (err,data) {
    if (!err) {
      res.json(data[0])
    }
  })

})
router.post('/doEditAdmin', function (req, res) {

  let id = req.body._id;
  let newData = {
    "username": req.body.username,
    "password": md5(req.body.password),
    "department_name": req.body.department_name,
    "status": req.body.status
  }

  DB.update('user', {"_id": new DB.ObjectID(id)},newData, function (err,data) {
    if (!err) {
      res.redirect('/routes/su/adminControll')
    }
  })

})

router.get('/deleteAdmin', function (req, res) {

  let id = req.query.id;

  DB.find('user', {"_id": new DB.ObjectID(id)}, function (err, data) {
    if (!err) {
      let department_name = data[0].department_name;
      DB.deleteAll('artical', {department_name}, function (err) {
        if (!err) {
          DB.deleteOne('user', {"_id": new DB.ObjectID(id)}, function (err) {
            if (!err) {
              DB.find('user',{"status":"1"},function (err,data) {
                if(!err){
                  res.json(data)
                }
              })
            }
          })
        }
      })

    }

  })
})
 router.get('/search',function (req,res) {
   let keyword = req.query.keyword;
   console.log(keyword);
   DB.find('artical',{"title": {$regex: keyword, $options:'i'}},function (err,data) {
     if(!err){
       res.json(data)
     }
   })
 })

module.exports = router;
/*暴露这个 router模块*/