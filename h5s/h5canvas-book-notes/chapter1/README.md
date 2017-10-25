## 第一章
在canvas 中显示字符
1. document.getElementById()获取canvas的引用
2. 使用canvas对象上的getContext('2d')方法，获取绘图环境对象
3. 然后进行绘制

绘图会使用绘图环境对象的一些属性和方法，这使用了
设置字体类型大小的属性：font
文本填充属性：fillStyle
描边属性：strokeStyle
及方法：
fillText(),strokeText(),这些不做过多的解释，后面章节会详细探讨，
问题：
1. fillStyle,strokeStyle如何使用渐变色，图片
2. 如何计算文字的宽高，来时文本水平垂直居中
3. 在font 中如何使用自定义字体

前两个问题书中后面会哟解答
第三个问题通过查找相关资料解决方案如下：
1. 先使用css @font-face 设置自定义字体
2. 使用fontfaceobserver js脚本，判断字体是否加载完成，加载完成后使用canvas 设置字体

![示例](https://songweir.github.io/h5s/h5canvas-book-notes/chapter1/example1/example1.html)
![参考资料](https://www.w3cplus.com/css/font-display-masses.html)


