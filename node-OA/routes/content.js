/**
 * Created by 别人都叫我小马 on 2018/11/29.
 */
let express = require('express');

let DB = require('../modules/db')
let router = express.Router();

router.get('/',function (req,res) {
  let id = req.query.id
  //去数据库查询这个id对应的数据     自增长的id 要用{"_id":new DB.ObjectID(id)
  DB.find('artical',{"_id":new DB.ObjectID(id)},function(err,data){
    console.log(data);
    res.render('content',{
      info:data[0]
    });
  });
})

router.get('/delete',function(req,res){
  //获取通知的id
  let  id=req.query.id;
  let url = ''

  if(parseInt(req.session.userinfo.status)==1){
    url = '/routes/admin'
  }else{
    url = '/routes/su'
  }

  DB.deleteOne('artical',{"_id":new DB.ObjectID(id)},function(err){
    if(!err){

      res.redirect(url)
    }
  })
})

router.post('/message', function (req, res) {
  let department_name = req.body.department
  let dataToSearch = {}

  if (department_name == '发布单位') {
    dataToSearch = {}
  } else {
    dataToSearch = {
      department_name
    }
  }

  DB.find('artical', dataToSearch, function (err, data) {
    res.json(data)
  })
})

module.exports = router