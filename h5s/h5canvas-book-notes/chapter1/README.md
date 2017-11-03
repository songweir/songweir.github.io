## 第一章

### 在canvas 中显示字符
1. document.getElementById()获取canvas的引用
2. 使用canvas对象上的getContext('2d')方法，获取绘图环境对象
3. 然后进行绘制

绘图会使用绘图环境对象的一些属性和方法，这使用了：

设置字体类型大小的属性：font

文本填充属性：fillStyle

描边属性：strokeStyle

及方法：
fillText()对应fillStyle属性,strokeText()对应strokeStyle属性,这些不做过多的解释，后面章节会详细探讨。

#### 思考：
1. fillStyle,strokeStyle如何使用渐变色，图片
2. 如何计算文字的宽高，来使文本水平垂直居中
3. 在font 中如何使用自定义字体

前两个问题书中后面会哟解答
第三个问题通过查找相关资料解决方案如下：
1. 先使用css @font-face 设置自定义字体
2. 使用fontfaceobserver js脚本，判断字体是否加载完成，加载完成后使用canvas 设置字体
[示例](https://songweir.github.io/h5s/h5canvas-book-notes/chapter1/example1/example1.html)
[参考相关资料](https://www.w3cplus.com/css/font-display-masses.html)



### canvas元素的大小与绘图表面的大小
canvas 有两套尺寸，一个是元素尺寸，一个是绘图表面尺寸
元素尺寸可以通过css来设置，
绘图表面尺寸通过属性width/height 来设置（属性width/height也影响元素尺寸）,也就是元素width/height 会同时影响这两个尺寸
默认情况下不设置以上两个尺寸，canvas 默认两个尺寸是300*150
根据上面的两个尺寸会有3中情况：
1. 两种尺寸相同，这时什么都不会改变
2. 元素尺寸大于绘图尺寸，浏览器会对绘图表面进行拉伸，使其符合元素尺寸，这种缩放会导致绘图表面进行放大，比如原本是300 * 150，拉伸后就变成我了600*300 像素
3. 元素尺寸小于绘图尺寸，浏览器会对绘图表面进行缩小，使其符合元素尺寸，这种缩放会导致绘图便面进行缩小（图像更加清晰）

#### 问题
在手机端，微信内置浏览器下，动态修改canvas.width/canvas.height, 导致空白。手指移动就显示了，针对写文字，很奇怪。

#### 思考：
1. 手机上缩放形式 viewport [示例](https://songweir.github.io/h5s/h5canvas-book-notes/chapter1/example2/demo.html)


### canvas元素提供的API
canvas元素只提供了连个属性和3个方法的API
**属性：**

width

height

**方法：**

getContext(): 返回绘图环境对象

toDataURL(type, quality): 返回一个数据地址（data RUL）,type指定图片类型，例如：image/jpeg或image/png,不指定第一个参数，默认使用image/png。第二个参数必须是0~1.0之间的double值，他表示图片质量,**第二个参数只对第一个参数为image/jpeg起作用(或image/webp)**。

toBlob(callback, type, args...): 返回Blob格式的图片，Blob是一种二进制格式（表示二进制大对象），不限于存储图片。第一个参数是回调，说明toBlob是异步的，浏览器会把blob的引用传入回调，第二个第三个参数，分别是图片类型和图片质量(图片质量同样对image/png不起作用)。
 [示例](https://songweir.github.io/h5s/h5canvas-book-notes/chapter1/example3/example.html)
 [参考资料](http://www.zhangxinxu.com/wordpress/2013/10/understand-domstring-document-formdata-blob-file-arraybuffer/)

 #### 思考
 1. window.URL
 2. blob


