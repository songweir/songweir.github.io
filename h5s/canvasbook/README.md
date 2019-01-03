# HTML5 CANVAS 基础教程笔

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

## 绘制矩形
### 绘制一个矩形并填充：
context.fillRect(x, y, width, height);

### 绘制一个矩形并给他绘制边框
context.strokeRect(x, y, width, height);

fillRect和strokeRect 组合可实现填充颜色和边框颜色的矩形

## 绘制线条

context.beginPath(); // 开始路径
context.moveTo(x, y); // 设置路径原点
context.lineTo(x, y); // 设置路径终点
context.closePath(); // 结束路径
context.stroke(); // 绘制路径轮廓， 这时候才真正显示出来


## 绘制圆形
canvas中专门绘制圆形的方法，而是通过绘制圆弧，首尾相连的圆弧就是圆形
context.beginPath();
context.arc(x, y, radius, startAngle, endAngle, anticlockwise); // x,y 原点， radius 半径， 开始弧度，结束弧度, 角度换算弧度 var degrees = 1; 1度 var radians = degrees * (Math.PI / 180); 1度 = 0.0175弧度, anticlockwise 绘制方向
context.closePath();
context.fill() 或者 context.stroke(); // 前者填充，后者描边

fillStyle填充颜色，stokeStyle描边颜色，开始设置，后面都会使用，后面可覆盖给新的颜色
lineWidth 线条宽度

## 绘制文本
var text = 'hello world';
context.font = "30px serif"; // 修改字号和字体
context.fillText(text, x, y); // 或者strokeText(text, x, y);


## 擦除canvas
context.clearRect(x, y, width, height); //擦除指定的区域,擦除可以实现一些有意思的动画

# 保存和恢复绘图状态
状态：特定时间所出的状况，例如，昨天和今天是两种不同的状态，
对应画布，某一时刻2d渲染上下文外观的整套属
用于描述画布绘图状态的全部属性为：变换矩阵、 裁剪区域、global-Alpha、globalCompositeOperation、strokeStyle,fillStyle, lineWidth,lineCat,lineJoin,miterLimit, shadowOffsetX, shadowOffsetY,shadowBlur,shadowColor,font,textAlign,textBaseline
当前路径和当前位图并不属于状态

context.save(); // 保存画布状态
绘图状态栈，最近保存的在最上面
context.restore(); // 弹出最近保存的一次状态
可以连续保存连续弹出

## 变形
### 平移
需要记住的是，平移并不是平移所绘制的对象，而是平移2D渲染上下文的坐标原点，这个就有意思了，我们实际改变的是整个画布的原点也就是左上角
context.translate(x, y);
当我写下移动是需要意识是，对之后绘制的对象会有影响，而对之前已经绘制的对象不会，这就是状态的体现，跟设置填充颜色，描边颜色是一样的概念，只影响之后的对象，同时，这个变形也是支持save的

## 缩放
缩放也是，将2D渲染上下文都进行缩放
context.scale(2, 2);// 连个参数表示的x,y缩放的倍数

需要记住的是，你在改变了画布的缩放比例后，或平移了画布，你下接下来可以恢复回去，这样在后续的绘制就还是原来的位置绘制及缩放了

## 旋转
旋转同样也是旋转整个2D渲染上下文绕其原点进行旋转，也就是我们所绘制的图形本身并不会旋转，当我们在使用旋转时，往往需要同时使用translate来纠正位置，将2D渲染上下文原点平移到正在绘制的图形的中心，然后进行旋转，这样看上去就是在原地旋转了，如果不这么做那么就有可能看不到你的东西了
还需注意的是，旋转使用弧度 角度转弧度公式 Math.PI / 180 * 角度

```javascript
content.translate(200, 200);
content.rotate(0.785);// 旋转45度角
content.fillRect(-50, -50, 100, 100);
```

*执行变形的顺序是极为重要的*

## 变换矩阵




## cavas 动画
动画就是一连串的图像，而canvas 上的动画本质就是，更新->清除->绘制，一个图像绘制上去，然后擦除在绘制一个（改变其坐标），达到动画的效果。
实现循环：
```javascript
function animate() {
    setTimeout(animate, 33);
}
```
### 移动讲了几个主要的思想
1. 通过对象来生成不同元素动作
2. 圆形轨迹，三角函数来计算圆形轨迹
3. 反弹是如何实现的，通过判断边界，来改变移动的方向


## 高级动画
物理知识，运用到代码中