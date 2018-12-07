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
```js
export default new Router({
  routes: [
    {  // 动态路由
      path: '/goods/',
      name: 'GoodsList',
      component: GoodsList,
      children:[    // goods下面的子路由
          {
              path: 'title',
              name: 'title',
              component: Title
          },
          {
            path: 'img',
            name: 'img',
            component: Image
          }
      ]
    }
  ]
})
```
3. 编程式路由
4. 命名路由
