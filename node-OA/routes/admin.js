/**
 * Created by 别人都叫我小马 on 2018/11/22.
 */

let express = require('express');
let DB = require('../modules/db.js');
let multiparty = require('multiparty');/*图片上传模块  即可以获取form表单的数据 也可以实现上传图片*/
let sd = require('silly-datetime');
let fs = require('fs');

let router = express.Router();

router.get('/', function (req, res) {
  if (!req.session.userinfo) {//未登录
    res.send("<script>alert('请先登录');location.href='/routes/login'</script>")
  } else { //已登录
    if (req.session.userinfo && parseInt(req.session.userinfo.status) == 1) {
      let department_name = req.session.userinfo.department_name
      DB.find('artical', {department_name}, function (err, data) {
        res.render('admin/admin', {
          list: data
        })
      })
    } else {
      res.sendStatus(404)
    }
  }
})

router.post('/message', function (req, res) {
  let department_name = req.body.department
  DB.find('artical', {department_name}, function (err, data) {
    console.log(data);
    res.json(data)
  })
})

router.get('/add',function (req,res) {
  res.render('admin/add')
})

router.post('/doAdd',function (req,res) {
  //获取表单的数据 以及post过来的文件

  let form = new multiparty.Form();

  form.uploadDir='upload-files'   //上传图片保存的地址     目录必须存在

  form.parse(req, function(err, fields, files) {

    //获取提交的数据以及图片上传成功返回的图片信息
    //
    console.log(fields);  /*获取表单的数据*/

    console.log(files);  /*图片上传成功返回的信息*/

    let title=fields.title[0];
    let content=fields.content[0];
    let date = sd.format(new Date(), 'YYYY-MM-DD');

    //保存文件路径
    let path= [];
    for(let i=0;i<files.file.length;i++){
      path.push({ name:files.file[i].originalFilename,path:files.file[i].path});
    }
    console.log(path);
    // let path=files.file[0].path;
    let department_name = req.session.userinfo.department_name
    DB.insert('artical',{
      title,
      content,
      date,
      path,
      department_name
    },function(err,data){
      if(!err){
        res.send("<script>alert('发布成功');location.href='/routes/admin'</script>")
      }

    })
  });

})

router.get('/edit',function(req,res){

  //获取get传值 id

  var id=req.query.id;

  console.log(id);

  //去数据库查询这个id对应的数据     自增长的id 要用{"_id":new DB.ObjectID(id)

  DB.find('artical',{"_id":new DB.ObjectID(id)},function(err,data){

    console.log(data);

    res.render('admin/edit',{
      info:data[0]
    });
  });

})

router.post('/doEdit',function (req,res) {
  //获取表单的数据 以及post过来的文件

  let form = new multiparty.Form();

  form.uploadDir='upload-files'   //上传图片保存的地址     目录必须存在

  form.parse(req, function(err, fields, files) {

    //获取提交的数据以及图片上传成功返回的图片信息
    //
    console.log(fields);  /*获取表单的数据*/
    let id = fields._id[0]
    let department_name = fields.department_name[0]
    let title=fields.title[0];
    let content=fields.content[0];
    let date = fields.date[0]


    console.log(files);  /*图片上传成功返回的信息*/


    // //保存文件路径
    let path= [];
    for(let i=0;i<files.file.length;i++){
      path.push({ name:files.file[i].originalFilename,path:files.file[i].path});
    }
    DB.update('artical',{"_id": new DB.ObjectID(id)},{
      title,
      content,
      date,
      path,
      department_name


    },function(err,data){
      if(!err){
        res.send("<script>alert('信息修改成功');location.href='/routes/admin'</script>")
      }

    })
  });

})



router.get('/delete',function(req,res){
  //获取通知的id
  let  id=req.query.id;
  DB.deleteOne('artical',{"_id":new DB.ObjectID(id)},function(err){

    if(!err){
      res.redirect('/routes/admin')
    }

  })

})


router.get('/search',function (req,res) {

  let keyword = req.query.keyword;
  let department_name = req.query.department_name;

  DB.find('artical',{"department_name":department_name,"title": {$regex: keyword, $options:'i'}},function (err,data) {
    if(!err){
      res.json(data)
    }
  })
})
module.exports = router;
/*暴露这个 router模块*/