## 路由分类
1. 动态路由（路由动态传入参数）
```js
export default new Router({
  routes: [
    {
      path: '/goods/:goodsId/user/:name',
      name: 'GoodsList',
      component: GoodsList
    }
  ]
})
```
2. 嵌套路由（路由嵌套路由）
3. 编程式路由
4. 命名路由
