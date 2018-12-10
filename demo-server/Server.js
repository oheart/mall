// http模块创建服务器
let http = require('http');
let url = require('url');
let util = require('util');
let fs = require('fs');

let server = http.createServer(function(req, res){
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    var pathname = url.parse(req.url).pathname;
    var handlePathname = pathname.substring(1); // 去掉最前面的/
    console.log('handlePathname', handlePathname)
    fs.readFile(handlePathname, function(err, data){
        if(err){
          res.writeHead(404,{
            'Content-Type': 'text/html'
          })
        }else{
          res.writeHead(200,{
            'Content-Type': 'text/html'
          })
          res.write(data.toString()) // 写入数据
        }

        res.end();  // 结束文件读取
    });
})

server.listen(3000, '127.0.0.1', () => {
  console.log("服务器已经运行，请打开localhost:3000运行")
})
