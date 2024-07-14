---
title: 前端模块化
date: 2023-12-11
duration: 32min
---

[[toc]]

## 什么是模块化

- 将复杂的程序根据规则或规范拆分成为若干模块，一个模块包括输入和输出
- 模块化的内部数据和实现是私有的，对外暴露一些接口与其他模块进行通讯

## 模块化的背景

JavaScript 程序本来很小——在早期，它们大多被用来执行独立的脚本任务，在你的 web 页面需要的地方提供一定交互，所以一般不需要多大的脚本。过了几年，我们现在有了运行大量 JavaScript 脚本的复杂程序，还有一些被用在其他环境（例如 Node.js）。

因此，近年来，有必要开始考虑提供`一种将 JavaScript 程序拆分为可按需导入的单独模块`的机制。Node.js 已经提供这个能力很长时间了，还有很多的 JavaScript 库和框架已经开始了模块的使用（例如，CommonJS 和基于 AMD 的其他模块系统如 RequireJS，以及最新的 Webpack 和 Babel）。

- 模块化是一种标准，不是实现
- 理解模块化是理解前端工程化的前提
- 前端模块化是前端项目规范化的必然结果

## 模块和脚本的区别

首先，JavaScript 有两种源文件，一种叫脚本(script)，一种叫模块(module)。这个区分是从 ES6 引入了模块机制后开始的，在 ES5 和之前的版本中，只有一种源文件类型：脚本。

脚本可以是浏览器或者 node 环境引入执行的，而模块只能由 JavaScript 代码用 import 引入执行。

> 这里只说了`import`一种引入方式，后面会在介绍[模块化规范](/articles/engineering/module#模块化规范)时讲解。

从概念上说，可以认为脚本具有主动的 JavaScript 代码段，是控制宿主完成一定任务的代码，而模块是被动性的代码段，是等待被调用的库。

现代浏览器支持用 script 标签引入模块或者脚本，若引入模块须加上属性 type。

```html
<script type="module" src="xxx.js"></script>
```

## 模块化的进化过程

### 全局 function 模式

将不同的功能封装成不同的全局函数。

缺点：污染全局命名空间, 容易引起命名冲突或数据不安全，而且模块成员之间看不出直接关系。

```js
function m1() {
  // ...
}

function m2() {
  // ...
}
```

### namespace 模式

优点：减少了全局变量，解决命名冲突

缺点：数据不安全（外部可以直接修改模块内部的数据）

```js
const __module = {
  data: 'xxx',
  foo() {
    // ...
  },
  bar() {
    // ...
  }
}

__module.data = '123' // 可直接修改
```

### IIFE 模式

该模式又称匿名函数自调用(闭包)，将数据和行为封装到一个函数内部，通过给 window 添加属性来向外暴露接口。

优点：通过自执行函数创建闭包，解决私有化的问题，外部只能通过暴露的方法操作

缺点：无法解决模块间相互依赖的问题

```
<!-- index.html -->
<script type="text/javascript" src="module.js"></script>
<script type="text/javascript">
  __module.foo()
  __module.bar()
  console.log(__module.data) //undefined 不能访问模块内部数据
  __module.data = 'xxxx' //不是修改的模块内部的data
  __module.foo() //没有改变
</script>
```

```js
// module.js
;(function (window) {
  const data = 'xxx'
  // 操作数据的函数
  function foo() {
    // 用于暴露有函数
    console.log(`foo() ${data}`)
  }
  function bar() {
    // 用于暴露有函数
    console.log(`bar() ${data}`)
    otherFun() // 内部调用
  }
  function otherFun() {
    // 内部私有的函数
    console.log('otherFun()')
  }
  // 暴露行为
  window.__module = { foo, bar } // ES6写法
})(window)
```

### IIFE 模式增强

引入依赖。这就是现代模块实现的基石。

```js
// module.js
;(function (window, $) {
  const data = 'www.baidu.com'
  // 操作数据的函数
  function foo() {
    // 用于暴露有函数
    console.log(`foo() ${data}`)
    $('body').css('background', 'red')
  }
  function bar() {
    // 用于暴露有函数
    console.log(`bar() ${data}`)
    otherFun() // 内部调用
  }
  function otherFun() {
    // 内部私有的函数
    console.log('otherFun()')
  }
  // 暴露行为
  window.__module = { foo, bar }
})(window, jQuery)
```

```
<!-- index.html -->
<!-- 引入的js必须有一定顺序 -->
<script type="text/javascript" src="jquery-1.10.1.js"></script>
<script type="text/javascript" src="module.js"></script>
<script type="text/javascript">
  __module.foo()
</script>
```

上例子通过 jquery 方法将页面的背景颜色改成红色，所以必须先引入 jQuery 库，就把这个库当作参数传入。`这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。`

## 模块化的好处

- 避免命名冲突（减少命名空间污染）
- 更好的分离，按需加载
- 更高复用性
- 高可维护性

## 引入多个`script`后出现的问题

- 请求过多
  首先我们需要依赖多个模块，那就会发送多个请求导致请求过多

- 依赖模糊
  我们不知道模块之间具体依赖关系，无法确定引入模块的先后顺序导致出错

- 难以维护
  由于上面两个问题导致很难维护，引发一系列问题导致项目出现严重问题

而之后的模块化规范得以解决以上的问题。

## 模块化规范

模块化规范包括：

- CommonJS
- ESModule
- AMD
- CMD
- UMD

文章只重点介绍 CommonJS 和 ESModule

### CommonJS

是 Node 应用采用的模块化规范。每个文件就是一个模块，有自己的作用域。在一个文件中定义的变量、函数、类都是私有的，对其他文件不可见。

> 在服务器端，模块的加载时运行时同步加载的
>
> 在浏览器端，模块需要通过提前编译打包处理；首先，既然同步的，很容易引起阻塞；其次，浏览器不认识 require 语法，因此，需要提前编译打包。

#### 特点

- 所有代码都运行在模块作用域内，不会污染全局作用域
- 只在第一次加载时运行一次，运行结果会被缓存；想让模块再次运行需要先清除缓存
- 模块的加载顺序按照其在代码中的引入顺序

#### 模块的暴露和引入

Node.js 中，每个模块都有一个 exports 接口对象，我们需要把公告的变量、函数等挂在到 exports 对象上，其他模块才可以使用。

##### 暴露: `exports`

`exports`对象用来导出当前模块的公共方法或属性。别的模块通过 require 函数调用当前模块时，得到的就是当前模块的 exports 对象。

```js
function foo() {}
const bar = ''

exports.foo = foo
exports.bar = bar
```

::: tip
暴露的关键词是 exports，不是 export。其实，这里的 exports 类似于 ES6 中的 export 的用法，都是用来导出一个指定名字的对象。
:::

##### 暴露: `module.exports`

`module.exports`用来导出一个默认对象，没有指定对象名

```js
module.exports = {}

// or
const name = 'leet'
module.exports.name = name

// 重复使用module.exports整个赋值会覆盖上一次的赋值
```

::: tip `exports`和`module.exports`的区别
主要：

- 使用 exports 时，只能单个设置属性 `exports.a = a`
- 使用 module.exports 时，即单个设置属性`module.exports.a`，也可整个赋值`module.exports = obj`

其他：

- Node 中每个模块的最后，都会执行`return: module.exports`
- Node 中每个模块都会把`module.exports`指向的对象赋值给一个变量`exports`，也就是说`exports = module.exports`
- `module.exports = xxx`，表示当前模块导出一个单一成员，结果就是 xxx
- 如果需要导出多个成员，则必须使用`exports.foo = xxx; exports.bar = xxx`。或者`module.exports.foo = xxx; module.exports.bar = xxx`

**暴露的模块到底是谁**

暴露的本质就是`exports`对象。

方式一的 exports.a = a 可以理解成是，给 exports 对象添加属性。方式二的 module.exports = a 可以理解成是给整个 exports 对象赋值。方式二的 module.exports.c = c 可以理解成是给 exports 对象添加属性。
:::

##### 引入: `require`

require 函数用来在一个模块中引入另外一个模块。传入模块名，返回模块导出对象。

- 内置模块：require 的是包名。
- 下载的第三方模块：require 的是包名。
- 自定义模块：require 的是文件路径。文件路径既可以用绝对路径，也可以用相对路径。后缀名.js 可以省略。

**作用**

- 执行导入的模块中的代码。
- 返回导入模块中的接口对象。

#### 模块的加载机制

**_输入的是被输出的值的拷贝_**。一旦输出这个值，模块内部的变化就影响不到这个值。

::: code-group

```js [lib.js]
let counter = 1
function incrementCounter() {
  ++counter
}

module.exports = {
  counter,
  incrementCounter
}
```

```js [main.js]
const counter = require('./lib.js').counter
const incrementCounter = require('./lib.js').incrementCounter

console.log(counter) // 3
incrementCounter()
console.log(counter) // 3
```

:::

counter 输出后，lib.js 模块内部的变化就影响不到 counter 了。因为 counter 是一个原始类型的值，会被缓存，除非写成一个函数，才能得到内部变动的值。

#### 服务器和浏览器端的实现

<br />

##### 服务器端实现

1. 下载 node.js
2. 创建项目结构(根目录执行命令 npm init)
3. 下载第三方模块(可选)
4. 定义模块代码
5. 在主模块引入其他模块
6. 执行主模块(执行命令 node 主模块.js)

##### 浏览器端实现

1. 创建项目结构
2. 下载`broswerify`(`npm install broswerify -g` `npm install broswerify -D`)
3. 定义模块代码
4. 打包处理 js(根目录执行命令`browserify 主模块.js -o 打包生成文件.js`)
5. inedx.html 引入`打包生成文件.js`

### ESModule

- 自动采用严格模式，例如 this 直接打印出来是 undefined
- 模块的内容`只有在第一次被import的时候会被执行`
- 通过 CORS 的方式请求外部 JS 模块，所以只能请求支持 CORS 的方式的外部地址
- 如果在浏览器中使用 ESModule，则每个脚本都会以与`defer`相同的方式执行，即延迟执行脚本，会等待网页渲染完成之后再执行

#### 模块的暴露和引入

<br />

##### 暴露: export

暴露模块包含两部分

- 具名：export name
- 默认：export default

```js
export const name = 'Leet'

// or
// const name = 'Leet'
// export { name }

// or 别名
// export { name as firstName }

// or 默认导出
// export default name

// or 默认导出匿名
// export default function() {}
// export default {}
```

##### 引入: import

```js
import { name } from 'xxx.js'

// or 别名
// import { name as firstName } from 'xxx.js'

// or 引入模块所有
// import * as __module from 'xxx.js'
// console.log(__module.name)

// or 引入默认导出 名称可以自定义
// import xxx from 'xxx.js'

// or 动态import
// import('xxx.js').then((module) => {
//   const { default: foo, aaa } = module
// })
```

::: tip
当`import`是，如果引入的是`export`具名导出的数据，则需要知道变量名或函数名，否则无法加载。如果是`export default`则可以自定义名称。
:::

#### 与 CommonJS 模块的差异

1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
3. ESModule 在编译期间会将所有 import 提升到顶部，CommonJs 不会提升 require
4. CommonJs 中顶层的 this 指向这个模块本身，而 ESModule 中顶层 this 指向 undefined
5. CommonJS 和 ES Module 都对循环引入做了处理，不会进入死循环，但方式不同：

- CommonJS 借助模块缓存，遇到 require 函数会先检查是否有缓存，已经有的则不会进入执行，在模块缓存中还记录着导出的变量的拷贝值。
- ES Module 借助模块地图，已经进入过的模块标注为获取中，遇到 import 语句会去检查这个地图，已经标注为获取中的则不会进入，地图中的每一个节点是一个模块记录，上面有导出变量的内存地址，导入时会做一个连接——即指向同一块内存。

第二个差异是因为 CommonJS 模块加载的是一个对象(exports)，该对象只有在脚本完全加载完成时才会生成；而 ESModule 模块不是对象，他的对外接口只是一种静态定义，在代码解析阶段就会生成。

::: tip
我们在搭建框架后，有些配置文件又是后会报红，是因为文件没有遵循对应的模块化规范。

- `.mjs`遵循 ESModule 规范，可以使用 import、export
- `.cjs`遵循 CommonJS 规范，可以使用 exports、module.exports、require

也可以通过`package.json`来指定遵循哪个规范，`type: module`，`type: commonjs`。
:::

### AMD、CMD 和 UMD

<br />

#### AMD

CommonJS 规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD 规范则是非同步加载模块，允许指定回调函数。由于 Node.js 主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以 CommonJS 规范比较适用。但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用 AMD 规范。此外 AMD 规范比 CommonJS 规范在浏览器端实现要来的早。

```js
// 定义没有依赖的模块
define(() => {
  return 模块
})

// 定义有依赖的模块
define(['module1', 'module2'], (m1, m2) => {
  // 模块
})

require(['module1', 'module2'], (m1, m2) => {
  // ...
})
```

#### CMD

CMD 规范专门用于浏览器端，模块的加载是异步的，模块使用时才会加载执行。CMD 规范整合了 CommonJS 和 AMD 规范的特点。在 Sea.js 中，所有 JavaScript 模块都遵循 CMD 模块定义规范。

```js
// 定义没有依赖的模块
define((require, exports, module) => {
  exports.xxx = value
  module.exports = value
})

// 定义有依赖的模块
define((require, exports, module) => {
  // 引入依赖模块(同步)
  const module2 = require('./module2')
  // 引入依赖模块(异步)
  require.async('./module3', (m3) => {})
  // 暴露模块
  exports.xxx = value
})

define((require) => {
  const m1 = require('./module1')
  const m4 = require('./module4')
  m1.show()
  m4.show()
})
```

#### UMD

通过对 CommonJs、CMD、AMD 进一步处理，它没有自己专有的规范，是集结了 CommonJs、CMD、AMD 的规范于一身。

它可以通过运行时或者编译时让同一个代码模块在使用 CommonJs、CMD 甚至是 AMD 的项目中运行。
未来同一个 JavaScript 包运行在浏览器端、服务区端都只需要遵守同一个写法就行了。

```js
;((global, factory) => {
  // 如果 当前的上下文有define函数，并且AMD  说明处于AMD 环境下
  if (typeof define === 'function' && define.amd) {
    define(['moduleA'], factory)
  }
  else if (typeof exports === 'object') {
    // commonjs
    const moduleA = require('moduleA')
    modules.exports = factory(moduleA)
  }
  else {
    global.moduleA = factory(global.moduleA) // 直接挂载成 windows 全局变量
  }
})(this, (moduleA) => {
  // 本模块的定义
  return {}
})
```

## 参考

[前端工程化三部曲之基础篇--模块化技术](https://jelly.jd.com/article/639be9a0abf18f005786c57f#)

[前端模块化详解(完整版)](https://github.com/ljianshu/Blog/issues/48)

[从底层看前端（十一）—— JavaScript 语法：脚本，模块和函数体。](https://zhuanlan.zhihu.com/p/139895805)
