1. 盒子居中

设置水平垂直居中如果没生效时，注意要看父元素是否有宽高，否则父元素是被子元素撑开的

- 通过 父 flex/grid + justify-content: center + align-items: center

- 通过 父 position: relative, 子 position: absolute + inset: 0/top(left,right,bottom): 0 + margin: auto

- 通过 父 position: relative, 子 position: absolute + top:50% + left:50% + translate(-50%, -50%)

- 子元素必须有固定宽高，通过 父 position: relative, 子 position: absolute + top: 50% + left: 50% + margin-left: - 子元素宽度/2 + margin-top: - 子元素高度/2

- 通过 父 display: flex, 子 margin: auto;

- 父元素必须要有具体宽高，通过 父 display: table-cell + text-align: center + vertical-align: middle, 子 display: inline；

- 通过 父 display: grid + place-content: center;

- 给文字水平垂直居中，父 text-align: center, 子 line-height: 父元素的高度

2. 盒模型

一个盒子的组成是由 `content(width+height), border, padding, margin` 组成的

分为 `box-sizing: content-box` 和 `box-sizing: border-box`

`content-box`: 只包含width和height, 其他三个参数不会计算到width和height中去, 宽高设置多大内容区域就有多大，这种方式已经越来越不太适用了，尤其是给元素设置padding时盒子会发生偏移
`border-box`: 包括了width, height, border, padding, 即当给盒子设置400px宽高，boder为2px，padding为20px，那么实际内容的宽高只有400-2-2-20-20=356px

3. display visibility opacity

共同之处：dom元素都存在
不同之处：
- 占位：display:none 在文档流中不会占据位置浏览器不会解析该元素，其他两个会占位且会被解析
- 性能：display:none 切换会产生重排，其他两个不会，性能相比之下比display要好
- 动画：transition只对opacity有效，对其他两个无效
- 继承：父元素display: none，再给子元素设置display: block，子元素不会显示；父元素visibility: hidden，子元素visibility: visible, 子元素会显示；父元素opacity: 0，子元素opacity: 1, 子元素不会显示

4. ES6方法

- let, const 关键字
- 箭头函数
- 函数形参默认值
- 模板字符串, 字符串方法startsWith和endsWith
- 余下操作符，扩展运算符
- 数组方法: map, filter, find, findIndex, reduce, includes
- 严格模式
- 解构赋值
- JSON的两个方法parse和stringify
- call, apply, bind
- classes
- ESM, 导入导出的不同
- Map, Set
- 遍历 for in 和 for of
- 对象属性简写
- Promise对象
- async, await ES7
- ...

5. var let const

- 作用域，var作用域于全局，let和const作用域在于处于的块{}
- 全局变量：var声明的是全局变量
- 变量提升，var可以在变量声明之前进行赋值，let和const只能在声明后赋值
- 重复声明：var可以进行重复声明，后声明覆盖前面的值；let和const不能重复声明同一个变量
- 暂时性死区：在使用let和const关键字声明变量之前，变量都是不可用的
- 初始值，const必须设置初始值
- 指向：const不允许改变指针指向即不能重新赋值

6. vue生命周期

从开始创建、初始化数据、编译模板、挂载DOM -> 渲染、更新 -> 渲染、销毁 的过程叫Vue的生命周期

可以分为四个部分：实例化、挂载阶段、更新阶段、销毁阶段

- 实例化 开始创建Vue实例
  - `beforeCreate` 在数据观测和事件/生命周期配置之前调用
  - `created` 在实例创建完成后调用
- 挂载阶段 编译模板，挂载DOM
  - `beforeMount` 挂载之前开始调用，相关的render函数首次被调用
  - `mounted` 实例被挂载后调用，可以访问到DOM元素
- 更新阶段 数据变化时，更新DOM
  - `beforeUpdate` 数据更新时调用，但DOM还未重新渲染
  - `updated` 数据更改导致的虚拟DOM重新渲染和打补丁之后调用
- 销毁阶段 清理工作，销毁实例
  - `beforeDestory` 实例销毁之前调用
  - `destoryed` Vue实例销毁之后调用

7. 几种图片格式

JPEG, PNG, WEBP, SVG, GIF

SVG属于矢量图用点线和多边形组成的具有高分辨率和缩放功能，其他的属于光栅图是基于pixel像素构成的图像

PNG会对图像进行无损压缩，JPEG会对图像进行有损压缩

GIF图片的兼容性好支持动画和透明背景，但是图像质量表现起来比较差

JPEG图片兼容性好，由于它的有损压缩，会导致比如一些精细的图表现起来会有点差，比如logo图像和线框类的，而且它并不支持透明背景和动画

PNG图片有部分支持透明度，并且色彩很好，但是图片比较大

WEBP解决了上面几个图片的缺点，并也同样有上面一些优点的属性，色彩好、支持动画、压缩后基本没有影响，但是这个格式兼容性差一点

SVG图片是一种基于xml的矢量图，它的大小很小，并且支持动画可以和DOM无缝衔接，可以直接使用也可以运用到HTML，css中，也可以用在javascript中，但是复杂度高的svg会减慢渲染速度，并且不适合做高互动动画

8. 用CSS动画写一个有两个圆的动画：

- 外圆向内缩小5px 2000ms
- 外圆回到原来尺寸 2000ms
- 内圆向外扩大15px 2500ms
- 内圆回复原来尺寸 2500ms

```html
<div>
  <div class="circle_1">
    <div class="circle_2" />
  </div>
</div>

<style>
  .circle_1 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    border: 5px;
    border-radius: 9999px;
    animation: circle1_anim 2000ms infinite;
  }
  .circle_2 {
    width: 120px;
    height: 120px;
    border: 15px;
    border-radius: 9999px;
    animation: circle2_anim 2500ms infinite;
  }
  @keyframe circle1_anim {
    50% {
      width: 145px;
      height: 145px
    }
    100% {
      width: 150px;
      height: 150px;
    }
  }
  @keyframe circle2_anim {
    50% {
      width: 135px;
      height: 135px
    }
    100% {
      width: 120px;
      height: 120px;
    }
  }
</style>
```
