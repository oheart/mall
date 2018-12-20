var express = require('express');
var router = express.Router();

var User = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function(req, res, next) {
  res.send('test');
});

// 登录接口
router.post('/login', function(req, res, next){
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(param, function(err, doc){
    if(err){
      res.json({
        status: "1",
        msg: err.message
      })
    }else{
      if(doc){
        res.cookie("userId", doc.userId,{
          path: '/',
          maxAage: 1000*60*60
        })
        res.cookie("userName",doc.userName,{
          path:'/',
          maxAge:1000*60*60
        });
        res.json({
          status: "0",
          msg: "",
          result: {
            userName: doc.userName
          }
        })
      }
    }
  })
})

// 登出接口
router.post('/logout', function(req, res, next){
  res.cookie("userId","",{
    path: "/",
    maxAage: -1
  });
  res.cookie("userName","",{
    path: "/",
    maxAage: -1
  });
  res.json({
    status: "0",
    msg: "",
    result: ""
  })
})

// 检查登录
router.get('/checkLogin', function(req, res, next){
  if(req.cookies.userId){
      res.json({
        status: '0',
        msg: '',
        result: req.cookies.userName || ''
      })
  }else{
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})

// 查询当前用户的购物车数据
router.get('/cartList', function(req, res, next){
  var userId = req.cookies.userId;
  User.findOne({userId: userId}, function(err, doc){
    if(err){
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      if(doc){
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        })
      }
    }
  })
})

// 删除购物车
router.post('/cartDel', function(req, res, next){
    var userId = req.cookies.userId,
        productId = req.body.productId;
    User.update(
      {userId: userId},
      {
        $pull:{
          'cartList':{'productId': productId}
        }
      },
      function(err, doc){
        if(err){
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            })
        }else{
          res.json({
            status: '0',
            msg: '',
            result: 'suc'
          })
        }
      }
    )
})

module.exports = router;
