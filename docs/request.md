## axios（推荐）
  - script标签

     ```<script src="https://unpkg.com/axios/dist/axios.min.js"></script>```

  - npm install axios --save（推荐）

**2. axios请求方式**
- axios.request(config)
- axios.get(url[, config])
- axios.delete(url[, config])
- axios.head(url[, config])
- axios.options(url[, config])
- axios.post(url[, data[, config]])
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])

**3. 例子**
```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));
```
**4. 全局拦截器**
```js
 axios.interceptors.request.use(function(config){  // 全局拦截器 (请求前)
      console.log('request init. ');
      return config;
});
axios.interceptors.response.use(function(res){  // 全局拦截器（请求后）
    console.log('response init. ');
    return res;
})
```


## vue-resource
**1. 引用方式**
  - script标签

     ```<script src="https://cdn.jsdelivr.net/npm/vue-resource@1.5.1"></script>```

  - npm install vue-resource --save（推荐）

**2. vue-resource请求方式**

vue-resource的请求API是按照REST风格设计的，它提供了7种请求API:
  - get(url, [config])
  - head(url, [config])
  - delete(url, [config])
  - jsonp(url, [config])
  - post(url, [body], [config])
  - put(url, [body], [config])
  - patch(url, [body], [config])

**3. 全局拦截器 interceptors**
```js
```
**4. 相关资料**
  - [npm](https://www.npmjs.com/package/vue-resource)
  - [git](https://github.com/pagekit/vue-resource/blob/HEAD/docs/http.md)
