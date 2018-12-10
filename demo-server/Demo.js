let user = require('./User');
console.log(`userName: ${user.userName}`);
console.log(`I'm ${user.userName}, I say ${user.sayHello()}`)


// http模块创建服务器
let http = require('http');
let url = require('url');
let util = require('util');

let server = http.createServer(function(req, res){
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  let resUrl = url.parse(req.url);

  console.log('url: ' + req.url); // demo.html?a=123; 这里的req.url娶不到完整的url，不包含协议和hash
  console.log("parse: " + url.parse(req.url));  // [object]
  console.log("inspect: " + util.inspect(url.parse(req.url))); // 一般开发调试用

  res.end(util.inspect(resUrl));
})

server.listen(3000, '127.0.0.1', () => {
  console.log("服务器已经运行，请打开localhost:3000运行")
})
