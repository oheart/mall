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
3. 编程式路由（通过js来实现页面的跳转）
```js
$router.push('name')
$router.push({path: 'name'})
$router.push({path:'name?a=123'}) 或者 $router.push({path: 'name', query: {a: 123})
$router.go(1)
```
4. 命名路由（给路由定义不同的名字，根据名字进行匹配，给不同的router-view定义名字，通过名字进行对应组件的渲染）
```html
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view class="main" />
    <router-view class="left" name="title" />
    <router-view class="right" name="img" />
  </div>
</template>
```
```js
export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      components: {
        default: GoodsList,
        title: Title,
        img: Image
      }
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart
    }
  ]
})

```




