/**
 * Created by 别人都叫我小马 on 2018/11/18.
 */
//连接数据库
let MongoClient = require("mongodb").MongoClient
let DBurl = 'mongodb://127.0.0.1:27017/'
let DBname = 'oa'
let ObjectID = require('mongodb').ObjectID
function _connectDb(callback) {

  MongoClient.connect(DBurl, {useNewUrlParser: true}, function (err, client) {
    if (err) {
      console.log('数据库连接失败');
      return
    }

    const db = client.db(DBname);
    console.log("Connected successfully to server");
    //增加、修改、刷出
    callback(db)
    client.close()

  })
}

exports.ObjectID = ObjectID

exports.find = function (collectionName, json, callback) {

  _connectDb(function (db) {

    let result = db.collection(collectionName).find(json)

    result.toArray(function (error, data) {

      callback(error, data)  //拿到数据执行回调函数

      // db.close()
    })
  })
}

//增加
exports.insert= function (collectionName, json, callback) {

  _connectDb(function (db) {
    db.collection(collectionName).insertOne(json, function (error, data) {
      callback(error, data)
    })
  })
}

//修改
exports.update= function (collectionName, json1,json2,callback) {

  _connectDb(function (db) {
    db.collection(collectionName).updateOne(json1,{$set:json2},function (error, data) {
      callback(error, data)
    })
  })
}


//删除单项
exports.deleteOne= function (collectionName, json,callback) {

  _connectDb(function (db) {
    db.collection(collectionName).deleteOne(json,function (error, data) {
      callback(error, data)
    })
  })

}

//删除所有匹配的项目
exports.deleteAll= function (collectionName, json,callback) {

  _connectDb(function (db) {
    db.collection(collectionName).deleteMany(json,function (error, data) {
      callback(error, data)
    })
  })
}



