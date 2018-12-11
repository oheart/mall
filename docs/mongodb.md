## 创建管理员

**创建管理员用户**

```
db.createUser({user:"admin", pwd: "admin", roles: ['root']})
```

**创建用户，权限只拥有test数据库**
```
db.createUser({user:"ww", pwd: "123456", roles: [{role: 'dbOwner', db: 'test'}]})
```

## 授权认证
**授权**

```
db.auth('admin', 'admin')
```

## 给使用的数据库添加用户

## Mongodb基本语法
- 插入文档

- 删除文档

- 更新文档

- 查询文档


## mongodb导入collection文件
mongoimport -d db_demo -c users --file /Users/yatengwang/ImoocMall/resource/dumall-users


