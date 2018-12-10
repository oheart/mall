let http = require('http');
let util = require('util');

http.get("http://www.imooc.com/index/getstarlist", function (res){  // node作为客户端（相对而言），调用第三方服务（微信sdk, 模拟第三方网站登录...）
  console.log('res', res)
  let data = '';
  res.on('data', function (chunk){
      data += chunk;
  })

  res.on('end', function (){
    let result = JSON.parse(data)
    console.log("result: " + util.inspect(result))
  })
})
