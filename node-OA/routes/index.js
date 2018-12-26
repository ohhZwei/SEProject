/**
 * Created by 别人都叫我小马 on 2018/11/22.
 */
let express = require('express')
let router = express.Router()

//系统首页
router.get('/',function (req,res) {
  res.render('index',{msg:__dirname})
})

module.exports = router
