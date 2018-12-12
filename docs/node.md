## Common规范

## 创建一个Http Server

## 创建一个web容器，可访问到HTML内容

## Http模块客户端演示

## nodejs启动调试方式
- 通过node命令启动
切换到server目录，运行node bin/www,访问localhost:3000.
- supervisor
  - npm install supervisor -g
  - supervisor server/bin/www
- pm2 （基于进程）--> 推荐
pm2 start server/bin/www
