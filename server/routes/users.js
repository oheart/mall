var express = require('express');
var router = express.Router();
require('../util/util')

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

// 修改购物车商品数量
router.post('/cartEdit', function(req, res, next){
  var userId = req.cookies.userId,
      productId = req.body.productId,
      productNum = req.body.productNum,
      checked = req.body.checked;
  User.update(
    {'userId': userId, 'cartList.productId': productId},
    {
      'cartList.$.productNum': productNum,
      'cartList.$.checked': checked
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
}
)

//购物车商品全选
router.post('/editCheckAll', function(req, res, next){
    var userId = req.cookies.userId,
        checkAll = req.body.checkAll ? '1' : '0';
    User.findOne({userId: userId}, function(err, user){
      if(err){
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      }else{
        if(user){
          user.cartList.forEach((item) => {
            item.checked = checkAll;
          })
          user.save(function(err1, doc){
              if(err1){
                res.json({
                  status: '1',
                  msg: err1.message,
                  result: ''
                })
              }else{
                res.json({
                  status: '0',
                  msg: '',
                  result: 'suc'
                })
              }
          })
        }

      }
    })
})

// 查询用户地址接口
router.get('/addressList', function(req, res, next){
  var userId = req.cookies.userId;
  User.findOne({userId: userId}, function(err, doc){
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
        result: doc.addressList
      })
    }
  })
})

// 设置默认地址
router.post('/setDefault', function(req, res, next){
  var userId = req.cookies.userId,
      addressId = req.body.addressId;
  if(!addressId){
    res.json({
      status: '1003',
      msg: 'addressId is null',
      result: ''
    })
  }else{
    User.findOne({userId: userId}, function(err, doc){
      if(err){
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      }else{
        var addressList = doc.addressList;
        addressList.forEach((item) => {
          if(item.addressId == addressId){
            item.isDefault = true;
          }else{
            item.isDefault = false;
          }
        })

        doc.save(function(err1, doc1){
            if(err1){
              res.json({
                status: '1',
                msg: err1.message,
                result: ''
              })
            }else{
              res.json({
                status: '0',
                msg: '',
                result: ''
              })
            }
        })
      }
    })
  }
})

// 删除地址
router.post('/delAddress', function(req, res, next){
  var userId = req.cookies.userId,
      addressId = req.body.addressId;
  User.update(
    { userId: userId },
    {
      $pull:{
        'addressList':{
          'addressId': addressId
        }
      }
    },
    function(err, doc){
        if(err){
            res.json({
              status: '1',
              err: err.message,
              result: ''
            })
        }else{
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            })
        }
    })
})

// 支付创建订单
router.post('/payMent', function(req, res, next){
  var userId = req.cookies.userId,
      addressId = req.body.addressId,
      orderTotal = req.body.orderTotal;
  User.findOne({userId: userId}, function(err, doc){
      if(err){
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      }else{
        var address = '',
            goodsList = [];

        // 获取当前用户的地址信息
        doc.addressList.forEach((item) => {
            if(addressId == item.addressId){
              address = item;
            }
        })

        // 获取用户购物车的购买商品
        doc.addressList.filter((item) => {
          if(item.checked == '1'){
            goodsList.push(item);
          }
        })

       // 随机生成订单Id（有可能重复）
       var platform = '622';
       var r1 = Math.floor(Math.random()*10);
       var r2 = Math.floor(Math.random()*10);
       var sysDate = new Date().Format('yyyyMMddhhmmss');
       var orderId = platform + r1 + sysDate + r2;

       // 创建时间
       var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');

        // 创建订单
        var order = {
          orderId: orderId,   // 订单Id
          orderTotal: orderTotal,  // 订单总金额
          addressInfo: address,  // 地址信息
          goodsList: goodsList,  // 购买商品列表
          orderStatus: '1',  // 订单状态
          createDate: createDate,    // 创建日期
        }

        doc.orderList.push(order);

        doc.save(function(err1, doc1){
            if(err1){
                res.json({
                  status: '1',
                  msg: err.message,
                  result: ''
                })
            }else{
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                      orderId: order.orderId,
                      orderTotal: order.orderTotal
                    }
                  })
            }
        })
      }
  })
})


module.exports = router;
