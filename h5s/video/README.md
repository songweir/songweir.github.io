# 视频H5 video
## video 属性
```html
<video
  id="video" 
  src="video.mp4" 
  controls = "true"
  poster="images.jpg" /*视频封面*/
  preload="auto" 
  webkit-playsinline="true" /*这个属性是ios 10中设置可以
                     让视频在小窗内播放，也就是不是全屏播放*/  
  playsinline="true"  /*IOS微信浏览器支持小窗内播放*/ 
  x-webkit-airplay="allow" 
  x5-video-player-type="h5"  /*启用H5播放器,是wechat安卓版特性*/
  x5-video-player-fullscreen="true" /*全屏设置，
                     设置为 true 是防止横屏*/
  x5-video-orientation="portraint" //播放器支付的方向， landscape横屏，portraint竖屏，默认值为竖屏
  style="object-fit:fill">
</video>
```
- src: 视频的地址
- controls: 加上这个属性，Gecko 会提供用户控制，允许用户控制视频的播放，包括音量，跨帧，暂停/恢复播放。
- poster: 属性规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像。如果未设置该属性，则使用视频的第一帧来代替。
- preload: 属性规定在页面加载后载入视频。
- webkit-playsinline和playsinline: 视频播放时局域播放，不脱离文档流 。但是这个属性比较特别， 需要嵌入网页的APP比如WeChat中UIwebview 的allowsInlineMediaPlayback = YES webview.allowsInlineMediaPlayback = YES，才能生效。换句话说，如果APP不设置，你页面中加了这标签也无效，这也就是为什么安卓手机WeChat 播放视频总是全屏，因为APP不支持playsinline，而ISO的WeChat却支持。
这里就要补充下，如果是想做全屏直播或者全屏H5体验的用户，IOS需要设置删除 webkit-playsinline 标签，因为你设置 false 是不支持的 ，安卓则不需要，因为默认全屏。但这时候全屏是有播放控件的，无论你有没有设置control。 做直播的可能用得着播放控件，但是全屏H5是不需要的，那么去除全屏播放时候的控件，需要以下设置：同层播放
- x-webkit-airplay="allow" : 这个属性应该是使此视频支持ios的AirPlay功能。使用AirPlay可以直接从使用iOS的设备上的不同位置播放视频、音乐还有照片文件，也就是说通过AirPlay功能可以实现影音文件的无线播放，当然前提是播放的终端设备也要支持相应的功能
- x5-video-player-type: 启用同层H5播放器，就是在视频全屏的时候，div可以呈现在视频层上，也是WeChat安卓版特有的属性。同层播放别名也叫做沉浸式播放，播放的时候看似全屏，但是已经除去了control和微信的导航栏，只留下"X"和"<"两键。目前的同层播放器只在Android（包括微信）上生效，暂时不支持iOS。至于为什么同层播放只对安卓开放，是因为安卓不能像ISO一样局域播放，默认的全屏会使得一些界面操作被阻拦，如果是全屏H5还好，但是做直播的话，诸如弹幕那样的功能就无法实现了，所以这时候同层播放的概念就解决了这个问题。不过在测试的过程中发现，不同版本的IOS和安卓效果略有不同
- x5-video-orientation: 声明播放器支持的方向，可选值landscape 横屏, portraint竖屏。默认值portraint。无论是直播还是全屏H5一般都是竖屏播放，但是这个属性需要x5-video-player-type开启H5模式
- x5­-video­-player­-fullscreen:全屏设置。它又两个属性值，ture和false，true支持全屏播放，false不支持全屏播放。其实，IOS 微信浏览器是Chrome的内核，相关的属性都支持，也是为什么X5同层播放不支持的原因。安卓微信浏览器是X5内核，一些属性标签比如playsinline就不支持，所以始终全屏。


## 全屏处理
android始终不能自动播放，不多说。值得一提的是经测现在ios10后版本的safari和微信都不让视频自动播放了（顺带音频也不能自动播放了），但微信提供了一个事件WeixinJSBridgeReady，在微信嵌入webview全局的这个事件触发后，视频仍可以自动播放，这个应该是现在在ios端微信的视频自动播放的比较靠谱的方式，其他如手q或者其他浏览器，建议就引导用户出发触屏的行为操作出发比较好。

```javascript
	document.addEventListener("WeixinJSBridgeReady", function (){ 
	    video.play();
	    video.pause();
	}, false)
```

## 播放控制及黑屏处理
对于video或者audio等媒体元素，有一些方法，常用的有play(),pause();也有一些事件，如loadstart,canplay,canplaythrough,ended,timeupdate....等等。
在移动端有一些坑需要注意，不要轻易使用媒体元素的除ended,timeupdate以外event事件，在不同的机子上可能有不同的情况产生，例如：ios下监听canplay和canplaythrough（是否已缓冲了足够的数据可以流畅播放）,当加载时是不会触发的，即使preload="auto"也没用，但在pc的chrome调试器下和android下，是会在加载阶段就触发。ios需要播放后才会触发。总之就是现在的视频标准还不尽完善，有很多坑要注意，要使用前最好自己亲测一遍。就是当第一次播放视频的时候ios端，如果网络慢，视频从开始播到能展现画面会有短暂的黑屏（处理视频源数据的时间），为了避免这个黑屏，可以在视频上加个div浮层（可以一个假的视频第一帧），然后用timeupdate方法监听，视屏播放及有画面的时候再移除浮层。
```javascript
	video.addEventListener('timeupdate',function (){
	    //当视频的currentTime大于0.1时表示黑屏时间已过，已有视频画面，可以移除浮层（.pagestart的div元素）
	    if ( !video.isPlayed && this.currentTime>0.1 ){
	        $('.pagestart').fadeOut(500);
	        video.isPlayed = !0;
	    }
	})
```