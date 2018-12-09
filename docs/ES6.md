## 函数的Rest参数和扩展

## Promise使用

## module.exports 和 ES6 import/export的使用

## AMD、 CMD、CommonJs 和ES6 对比
一、什么是AMD、 CMD、CommonJs ?

**1. AMD是RequireJS在推广过程中对模版定义的规范化产出。**
**异步概念，RequireJS特点：依赖前置.**
```js
define(['package/lib'], function(lib){
  function foo(){
    lib.log('hello world!');
  }
  return {
    foo: foo
  }
})
```


**2. CMD是SeaJS在推广过程中对模块定义的规范化产出。所有模块都通过define来定义.**
**同步概念，SeaJs特点： 依赖就近**
```js
define(function(require, exports, module){
  // 通过require引入依赖
  var $ = require('jquery')
  var Spinning = require('./spinning')
})
```

**3. CommonJS规范 - module.exports（Nodejs使用，在服务端使用， 进行模块划分）**
```js
exports.area = function(r){
  return Math.PI * r * r;
}

exports.circumference = function(r){
  return 2 * Math.PI * r;
}
```
**4. ES6特性 export/import**
```js
// a.js
export const str = "balabla..";
export function log(sth) {
  return sth;
}

//  b.js
import { str, log } from 'a'; //也可以分开写两次，导入的时候带花括号
```

二、 它们之间有什么区别？

三、项目当中是如何运用的。

