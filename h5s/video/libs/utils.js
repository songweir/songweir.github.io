// utils
(function(){
    var utils = {};
    utils.parseUA = function(){
        var u = navigator.userAgent;
        var u2 = navigator.userAgent.toLowerCase();
        return { //移动终端版本信息
            mobile: !!u.match(/(iPhone|iPod|Android|ios|Mobile)/i), //是否为移动终端
            pc: !u.match(/(iPhone|iPod|Android|ios|Mobile)/i), //是否为pc终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //是否为ios终端
            android: u.indexOf('Android') > -1, //是否为android终端
            weixin: u2.match(/MicroMessenger/i) == "micromessenger", //是否为微信客户端
            newsapp: u.indexOf('NewsApp') > -1,//是否为网易新闻客户端
            yixin: u.indexOf('YiXin') > -1,//易信客户端
            weibo: u.indexOf('weibo') > -1,//微博客户端
            yunyuedu:u.indexOf('PRIS') > -1 //云阅读客户端
        };
    };
    window.netease = utils; // 对外提供netease对象
    window.netease.ua = utils.parseUA(); //对外提供了UA方法
})()