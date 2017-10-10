// share
var shareData;
var loadingImgList = [
    "img/loading-bg.jpg?v=4",
    "img/cloud1.png?v=4",
    "img/cloud2.png?v=4",
    "img/moon.png?v=4"
];
var imgArr = [
    "img/bg.jpg?v=4",
    "img/1.jpg?v=4",
    "img/2.jpg?v=4",
    "img/3.jpg?v=4",
    "img/4.jpg?v=4",
    "img/5.jpg?v=4",
    "img/6.jpg?v=4",
    "img/7.jpg?v=4",
    "img/8.jpg?v=4",
    "img/9.jpg?v=4",
    "img/roll.png?v=4",
    "img/touch.png?v=4",
    "img/touch-line.png?v=4",
    "img/talk1.png?v=4",
    "img/yanhua1.png?v=4",
    "img/yanhua2.png?v=4",
    "img/yanhua3.png?v=4",
    "img/yanhua4.png?v=4",
    "img/yanhua5.png?v=4",
    "img/shareBtn.png?v=4",
    "img/font1.png?v=4",
    "img/font2.png?v=4",
    "img/jiu.png?v=4",
    "img/part11-moon.png?v=4",
    "img/part11-yun1.png?v=4",
    "img/part11-yun2.png?v=4",
    "img/share.png?v=4"
];
var imgData = [
    {
        "num":1,
        "x":930,
        "y":0,
        "w":640,
        'v':0.005,
        'ow':1875,
        "ew":640
    },
    {
        // 第二张大图缩小
        "num":2,
        // 目的原始x坐标
        "x":1167,
        // 目的原始y坐标
        "y":367,
        // 目的的原始宽度
        "w":276,
        // 缩放速度
        'v':0.006,
        // 原图宽度
        'ow':1875,
        // 缩放后的宽度
        "ew":640
    },{
        "num":3,
        "x":424,
        "y":2172,
        "w":175,
        'v':0.007,
        'ow':1875,
        "ew":640
    },{
        "num":4,
        "x":531,
        "y":2267,
        "w":102,
        "v":0.012,
        'ow':1875,
        "ew":640
    },{
        "num":5,
        "x":695,
        "y":1410,
        "w":164,
        'v':0.009,
        'ow':1875,
        "ew":640
    },{
        // 第六部分 电话到门铃 放大
        "num":6,
        // 目的区域x位移
        "x":231,
        // 目的区域y位移
        "y":142,
        // 目的区域宽度
        "w":494,
        // 放大速度
        'v':0.004,
        // 原图尺寸
        'ow':1875,
        // 屏幕宽度
        "ew":640
    },{
        // 第七部分
        "num":7,
        "x":117,
        "y":176,
        "w":609,
        'v':0.004,
        'ow':1875,
        "ew":640
    },{
        // 第九部分 家门口到窗户 放大
        "num":9,
        "x":1181,
        "y":1366,
        "w":211,
        "v": 0.007,
        "ow":1875,
        "ew":640
    },{
        // 第十部分 窗户缩小到团圆
        "num":10,
        "x":1015,
        "y":983,
        "w":139,
        'v':0.008,
        'ow':1875,
        "ew":640
    },{
        // 第十一部分 团圆放大到夜空
        "num":11,
        "x":1044,
        "y":122,
        "w":384,
        "v": 0.004,
        "ow":1875,
        "ew":640
    }
];

//防止屏幕移动
$(document).bind("touchmove",function(e){
    e.preventDefault();
});

$(function(){
    moonLodaing2(loadingImgList,function(){
        $(".moon").addClass('active');
        // loading
        moonLodaing(imgArr,function(){
            // 分享
            shareFn();

            // pixi初始化
            pixiInit();

            netease.autoPlay("bgMusic");
        });
    });
});

function shareFn(){
    shareData={
        MsgImg:'http://go.163.com/2017/1004/xijiu/img/share.jpg',  //分享图片
        link:'http://go.163.com/2017/1004/xijiu/',    //分享链接
        title:'朋友，你有多久没回家过中秋了',   //分享标题
        desc:'中秋夜喝习酒 月圆人更圆',    //分享描述
        fText:'朋友，你有多久没回家过中秋了',    //分享朋友圈
        callback:function(){
            share_survey(true);
        }
    };
    NeteaseShareInit();
}

// pixi初始化
function pixiInit(){
    var app = new PIXI.Application(640,1030,{
        // backgroundColor: '0x000000'
        transparent: true
    });

    $(".main").append(app.view);

    // pixi预加载
    var loader = new PIXI.loaders.Loader();
    loader.add(imgArr);
    loader.load(function(loader){

        // display
        app.stage.displayList = new PIXI.DisplayList();
        var index1 = new PIXI.DisplayGroup(1, false);
        var index2 = new PIXI.DisplayGroup(2, false);
        var index3 = new PIXI.DisplayGroup(3, false);

        // 按钮
        var btnContainer = new PIXI.Container();
        btnContainer.interactive = true;
        btnContainer.displayGroup = index2;

        var btn = createSprite("img/touch.png?v=4",{
            x: 260,
            y: 785
        });
        var btnLineTexture = PIXI.Texture.fromImage("img/touch-line.png?v=4");
        var btnLine1 = new PIXI.Sprite(btnLineTexture);
        btnLine1.x = 260;
        btnLine1.y = 785;
        btnLine1.pivot.x = btnLine1.width/2;
        btnLine1.pivot.y = btnLine1.height/2;
        btnLine1.x += btnLine1.pivot.x;
        btnLine1.y += btnLine1.pivot.y;
        btnLine1.alpha= 0.6;

        var btnLine2 = new PIXI.Sprite(btnLineTexture);
        btnLine2.x = 260;
        btnLine2.y = 785;
        btnLine2.pivot.x = btnLine2.width/2;
        btnLine2.pivot.y = btnLine2.height/2;
        btnLine2.x += btnLine2.pivot.x;
        btnLine2.y += btnLine2.pivot.y;
        btnLine2.alpha= 0.6;

        TweenMax.fromTo(btnLine1.scale,1.4,{ x:1,y:1 },{ x:1.5,y:1.5 }).repeat(-1);
        TweenMax.fromTo(btnLine1,1.4,{alpha:0.6 },{ alpha:0 }).repeat(-1);

        TweenMax.fromTo(btnLine2.scale,1.4,{ x:1,y:1 },{ x:1.5,y:1.5 }).repeat(-1).delay(0.7);
        TweenMax.fromTo(btnLine2,1.4,{alpha:0.6 },{ alpha:0 }).repeat(-1).delay(0.7);

        btnContainer.addChild(btnLine1,btnLine2,btn);
        if(window.innerHeight <= 950){
            btnContainer.y -= 80;
        }

        // 场景一
        var part1Container = new PIXI.Container();
        part1Container.pivot.x = 0;
        part1Container.pivot.y = 0;
        part1Container.x += part1Container.pivot.x;
        part1Container.y += part1Container.pivot.y;
        part1Container.x += -getNum(1,"tx");

        var pic1 = createSprite("img/1.jpg?v=4",{
            x: 0,
            y: 0
        });
        part1Container.addChild(pic1);

        // 场景二
        part2Container = new PIXI.Container();
        part2Container.pivot.x = 0;
        part2Container.pivot.y = 0;
        part2Container.x += part2Container.pivot.x;
        part2Container.y += part2Container.pivot.y;
        part2Container.scale.x = getNum(2,'scale');
        part2Container.scale.y = getNum(2,'scale');
        part2Container.x += (-getNum(2,"tx"));
        part2Container.y += (-getNum(2,"ty"));

        var pic2 = createSprite("img/2.jpg?v=4",{
            x:0,
            y:0
        });
        var pic2Mini = createSprite("img/1.jpg?v=4",{
            x:0,
            y:0
        });
        pic2Mini.pivot.x = 0;
        pic2Mini.pivot.y = 0;
        pic2Mini.x += pic2Mini.pivot.x;
        pic2Mini.y += pic2Mini.pivot.y;
        pic2Mini.scale.x = getNum(2,"minScale");
        pic2Mini.scale.y = getNum(2,"minScale");
        pic2Mini.x = getNum(2,"x");
        pic2Mini.y = getNum(2,"y");

        part2Container.addChild(pic2,pic2Mini);

        // 场景三
        part3Container = new PIXI.Container();
        part3Container.pivot.x = 0;
        part3Container.pivot.y = 0;
        part3Container.x += part3Container.pivot.x;
        part3Container.y += part3Container.pivot.y;
        part3Container.scale.x = getNum(3,"scale");
        part3Container.scale.y = getNum(3,"scale");
        part3Container.x += (-getNum(3,"tx"));
        part3Container.y += (-getNum(3,"ty"));

        var pic3 = createSprite("img/3.jpg?v=4",{
            x:0,
            y:0
        });
        var pic3Mini = createSprite("img/2.jpg?v=4",{
            x:0,
            y:0
        });
        pic3Mini.pivot.x = 0;
        pic3Mini.pivot.y = 0;
        pic3Mini.x += pic3Mini.pivot.x;
        pic3Mini.y += pic3Mini.pivot.y;
        pic3Mini.scale.x = getNum(3,"minScale");
        pic3Mini.scale.y = getNum(3,"minScale");
        pic3Mini.x = getNum(3,"x");
        pic3Mini.y = getNum(3,"y");

        part3Container.addChild(pic3,pic3Mini);

        // 场景四
        part4Container = new PIXI.Container();
        part4Container.pivot.x = 0;
        part4Container.pivot.y = 0;
        part4Container.x += part4Container.pivot.x;
        part4Container.y += part4Container.pivot.y;
        part4Container.scale.x = getNum(4,"scale");
        part4Container.scale.y = getNum(4,"scale");
        part4Container.x += (-getNum(4,"tx"));
        part4Container.y += (-getNum(4,"ty"));

        var pic4 = createSprite("img/4.jpg?v=4",{
            x:0,
            y:0
        });
        var pic4Mini = createSprite("img/3.jpg?v=4",{
            x:0,
            y:0
        });
        pic4Mini.pivot.x = 0;
        pic4Mini.pivot.y = 0;
        pic4Mini.x += pic4Mini.pivot.x;
        pic4Mini.y += pic4Mini.pivot.y;
        pic4Mini.scale.x = getNum(4,"minScale");
        pic4Mini.scale.y = getNum(4,"minScale");
        pic4Mini.x = getNum(4,"x");
        pic4Mini.y = getNum(4,"y");
        part4Container.addChild(pic4,pic4Mini);

        // 场景五
        part5Container = new PIXI.Container();
        part5Container.pivot.x = 0;
        part5Container.pivot.y = 0;
        part5Container.x += part5Container.pivot.x;
        part5Container.y += part5Container.pivot.y;
        part5Container.scale.x = getNum(5,"scale");
        part5Container.scale.y = getNum(5,"scale");
        part5Container.x += (-getNum(5,"tx"));
        part5Container.y += (-getNum(5,"ty"));

        var pic5 = createSprite("img/5.jpg?v=4",{
            x:0,
            y:0
        });
        var pic5Mini = createSprite("img/4.jpg?v=4",{
            x:0,
            y:0
        });
        // 奶奶 我今年不回家过年了
        var part5Talk1 = createSprite("img/talk1.png?v=4",{
            x: 225,
            y: 1828,
            alpha: 0
        });
        pic5Mini.pivot.x = 0;
        pic5Mini.pivot.y = 0;
        pic5Mini.x += pic5Mini.pivot.x;
        pic5Mini.y += pic5Mini.pivot.y;
        pic5Mini.scale.x = getNum(5,"minScale");
        pic5Mini.scale.y = getNum(5,"minScale");
        pic5Mini.x = getNum(5,"x");
        pic5Mini.y = getNum(5,"y");
        part5Container.addChild(pic5,pic5Mini,part5Talk1);


        // 场景六 电话页到月亮
        part6Container = new PIXI.Container();
        part6Container.pivot.x = 0;
        part6Container.pivot.y = 0;
        part6Container.x += part6Container.pivot.x;
        part6Container.y += part6Container.pivot.y;
        part6Container.scale.x = getNum2(6,"scale");
        part6Container.scale.y = getNum2(6,"scale");

        var pic6 = createSprite("img/5.jpg?v=4",{
            x:0,
            y:0
        });

        part6Container.addChild(pic6,part5Talk1);

        // 场景七 月亮到饭桌
        part7Container = new PIXI.Container();
        part7Container.pivot.x = 0;
        part7Container.pivot.y = 0;
        part7Container.x += part7Container.pivot.x;
        part7Container.y += part7Container.pivot.y;
        part7Container.scale.x = getNum(7,"scale");
        part7Container.scale.y = getNum(7,"scale");
        part7Container.x += (-getNum(7,"tx"));
        part7Container.y += (-getNum(7,"ty"));
        var pic7 = createSprite("img/6.jpg?v=4",{
            x:0,
            y:0
        });
        var part7Roll = createSprite("img/roll.png?v=4",{
            x:1292,
            y:1152
        });
        part7Roll.pivot.x = part7Roll.width/2;
        part7Roll.pivot.y = part7Roll.height/2;
        part7Roll.x += part7Roll.pivot.x;
        part7Roll.y += part7Roll.pivot.y;
        part7Roll.rotation = 0;

        TweenMax.fromTo(part7Roll,0.1,{rotation: -0.05},{rotation: 0.1}).repeat(-1).yoyo(true);
        TweenMax.fromTo(part7Roll,0.5,{width:part7Roll.width*0.9},{width:part7Roll.width}).repeat(-1).yoyo(true);
        part7Container.addChild(pic7,part7Roll);



        // 场景八 向右平移
        part8Container = new PIXI.Container();
        part8Container.pivot.x = 0;
        part8Container.pivot.y = 0;
        part8Container.x += part7Container.pivot.x;
        part8Container.y += part7Container.pivot.y;
        part8Container.scale.x = 640/1875;
        part8Container.scale.y = 640/1875;

        var pic8 = createSprite("img/6.jpg?v=4",{
            x: 0,
            y:0
        });
        // 过渡墙
        var pic8Guodu = createSprite("img/7.jpg?v=4",{
            x: pic8.width,
            y:0
        });
        // 大门
        var pic8Right = new PIXI.Container();
        pic8Right.x = pic8.width+pic8Guodu.width;
        pic8Right.y = 0;
        pic8Right.pivot.x = 0;
        pic8Right.pivot.y = 0;
        pic8Right.x += pic8Right.pivot.x;
        pic8Right.y += pic8Right.pivot.y;
        // pic8Right.scale.x = 640/1875;
        // pic8Right.scale.y = 640/1875;

        var pic9R = createSprite("img/8.jpg?v=4",{
            x: 0,
            y: 0
        });
        // 左黄
        var yanhua1R = createSprite("img/yanhua1.png?v=4",{
            x: -100,
            y: 66
        });
        yanhua1R.pivot.x = 192;
        yanhua1R.pivot.y = 129;
        yanhua1R.x += yanhua1R.pivot.x;
        yanhua1R.y += yanhua1R.pivot.y;

        var t1R = new TimelineMax({repeat:-1, repeatDelay: 0.3, delay: 0.2});
        t1R.add( TweenLite.fromTo(yanhua1R.scale,0.8,{"x":0,"y":0},{"x":1,"y":1}) );
        t1R.add( TweenLite.fromTo(yanhua1R,0.8,{"alpha":1},{"alpha":0}) );

        // 中黄
        var yanhua2R = createSprite("img/yanhua2.png?v=4",{
            x:825,
            y:45
        });
        yanhua2R.pivot.x = 122;
        yanhua2R.pivot.y = 76;
        yanhua2R.x += yanhua2R.pivot.x;
        yanhua2R.y += yanhua2R.pivot.y;

        var t2R = new TimelineMax({repeat: -1, repeatDelay: 0.2, delay: 0.5});
        t2R.add( TweenLite.fromTo(yanhua2R.scale,1,{"x":0,"y":0},{"x":1,"y":1}) );
        t2R.add( TweenLite.fromTo(yanhua2R,0.8,{"alpha":1},{"alpha":0}) );

        // 红
        var yanhua3R = createSprite("img/yanhua3.png?v=4",{
            x: 539,
            y: 303
        });
        yanhua3R.pivot.x = 170;
        yanhua3R.pivot.y = 137;
        yanhua3R.x += yanhua3R.pivot.x;
        yanhua3R.y += yanhua3R.pivot.y;
        var t3R = new TimelineMax({repeat: -1, repeatDelay: 0.2, delay: 0.7});
        t3R.add( TweenLite.fromTo(yanhua3R.scale,0.8,{"x":0,"y":0},{"x":1,"y":1}) );
        t3R.add( TweenLite.fromTo(yanhua3R,0.8,{"alpha":1},{"alpha":0}) );

        // 蓝
        var yanhua4R = createSprite("img/yanhua4.png?v=4",{
            x: 1644,
            y: 0
        });
        yanhua4R.pivot.x = yanhua4R.width;
        yanhua4R.pivot.y = 132;
        yanhua4R.x += yanhua4R.pivot.x;
        yanhua4R.y += yanhua4R.pivot.y;

        var t4R = new TimelineMax({repeat: -1, repeatDelay: 0.1, delay: 0.5});
        t4R.add( TweenLite.fromTo(yanhua4R.scale,1,{"x":0,"y":0},{"x":1,"y":1}) );
        t4R.add( TweenLite.fromTo(yanhua4R,0.8,{"alpha":1},{"alpha":0}) );

        // 其他
        var yanhua5R = createSprite("img/yanhua5.png?v=4",{
            x: 351,
            y: 104
        });
        var t5R = new TimelineMax({repeat: -1, repeatDelay: 0.5, delay: 0, yoyo: true});
        t5R.add( TweenLite.fromTo(yanhua5R,0.8,{"alpha":1},{"alpha":0}) );

        pic8Right.addChild(pic9R,yanhua5R,yanhua1R,yanhua2R,yanhua3R,yanhua4R);
        part8Container.addChild(pic8,part7Roll,pic8Right,pic8Guodu);
        // part8Container.displayGroup = index1;

        // 场景九 大门+烟花 放大到窗户
        part9Container = new PIXI.Container();
        part9Container.pivot.x = 0;
        part9Container.pivot.y = 0;
        part9Container.x += part7Container.pivot.x;
        part9Container.y += part7Container.pivot.y;
        part9Container.scale.x = getNum2(9,"scale");
        part9Container.scale.y = getNum2(9,"scale");

        var pic9 = createSprite("img/8.jpg?v=4",{
            x: 0,
            y: 0
        });
        // 左黄
        var yanhua1 = createSprite("img/yanhua1.png?v=4",{
            x: -100,
            y: 66
        });
        yanhua1.pivot.x = 192;
        yanhua1.pivot.y = 129;
        yanhua1.x += yanhua1.pivot.x;
        yanhua1.y += yanhua1.pivot.y;

        var t1 = new TimelineMax({repeat:-1, repeatDelay: 0.3, delay: 0.2});
        t1.add( TweenLite.fromTo(yanhua1.scale,0.8,{"x":0,"y":0},{"x":1,"y":1}) );
        t1.add( TweenLite.fromTo(yanhua1,0.8,{"alpha":1},{"alpha":0}) );

        // 中黄
        var yanhua2 = createSprite("img/yanhua2.png?v=4",{
            x:825,
            y:45
        });
        yanhua2.pivot.x = 122;
        yanhua2.pivot.y = 76;
        yanhua2.x += yanhua2.pivot.x;
        yanhua2.y += yanhua2.pivot.y;

        var t2 = new TimelineMax({repeat: -1, repeatDelay: 0.2, delay: 0.5});
        t2.add( TweenLite.fromTo(yanhua2.scale,1,{"x":0,"y":0},{"x":1,"y":1}) );
        t2.add( TweenLite.fromTo(yanhua2,0.8,{"alpha":1},{"alpha":0}) );

        // 红
        var yanhua3 = createSprite("img/yanhua3.png?v=4",{
            x: 539,
            y: 303
        });
        yanhua3.pivot.x = 170;
        yanhua3.pivot.y = 137;
        yanhua3.x += yanhua3.pivot.x;
        yanhua3.y += yanhua3.pivot.y;
        var t3 = new TimelineMax({repeat: -1, repeatDelay: 0.2, delay: 0.7});
        t3.add( TweenLite.fromTo(yanhua3.scale,0.8,{"x":0,"y":0},{"x":1,"y":1}) );
        t3.add( TweenLite.fromTo(yanhua3,0.8,{"alpha":1},{"alpha":0}) );

        // 蓝
        var yanhua4 = createSprite("img/yanhua4.png?v=4",{
            x: 1644,
            y: 0
        });
        yanhua4.pivot.x = yanhua4.width;
        yanhua4.pivot.y = 132;
        yanhua4.x += yanhua4.pivot.x;
        yanhua4.y += yanhua4.pivot.y;

        var t4 = new TimelineMax({repeat: -1, repeatDelay: 0.1, delay: 0.5});
        t4.add( TweenLite.fromTo(yanhua4.scale,1,{"x":0,"y":0},{"x":1,"y":1}) );
        t4.add( TweenLite.fromTo(yanhua4,0.8,{"alpha":1},{"alpha":0}) );

        // 其他
        var yanhua5 = createSprite("img/yanhua5.png?v=4",{
            x: 351,
            y: 104
        });
        var t5 = new TimelineMax({repeat: -1, repeatDelay: 0.5, delay: 0, yoyo: true});
        t5.add( TweenLite.fromTo(yanhua5,0.8,{"alpha":1},{"alpha":0}) );

        part9Container.addChild(pic9,yanhua5,yanhua1,yanhua2,yanhua3,yanhua4);
        // part9Container.displayGroup = index1;

        // 场景十 窗户缩小到团圆
        part10Container = new PIXI.Container();
        part10Container.pivot.x = 0;
        part10Container.pivot.y = 0;
        part10Container.x += part10Container.pivot.x;
        part10Container.y += part10Container.pivot.y;
        part10Container.scale.x = getNum(10,"scale");
        part10Container.scale.y = getNum(10,"scale");
        part10Container.x += (-getNum(10,"tx"));
        part10Container.y += (-getNum(10,"ty"));

        var pic10 = createSprite("img/9.jpg?v=4",{
            x:0,
            y:0
        });
        // 云
        var part11Yun1T = createSprite("img/part11-yun1.png?v=4",{
            x:844-40,
            y:101
        });
        // 云2
        var part11Yun2T = createSprite("img/part11-yun2.png?v=4",{
            x:450,
            y:0
        });
        var part11MoonT = createSprite("img/part11-moon.png?v=4",{
            x: 752,
            y: 0
        });
        part10Container.addChild(pic10,part11Yun1T,part11Yun2T,part11MoonT);
        // part10Container.displayGroup = index1;

        // 场景十二
        part12Container = new PIXI.Container();
        part12Container.x = 1044;
        part12Container.y = 122;
        part12Container.pivot.x = 0;
        part12Container.pivot.y = 0;
        part12Container.width = 750;
        part12Container.height = 1206;
        part12Container.x += part12Container.pivot.x;
        part12Container.y += part12Container.pivot.y;
        part12Container.scale.x = 384/750;
        part12Container.scale.y = 384/750;
        // 中秋夜 喝习酒
        var part12Font1 = createSprite("img/font1.png?v=4",{
            x: 612,
            y: 51,
            alpha: 0
        });
        // 月圆人更圆
        var part12Font2 = createSprite("img/font2.png?v=4",{
            x: 542,
            y: 245,
            alpha: 0
        });
        // 酒
        var part12Jiu = createSprite("img/jiu.png?v=4",{
            x:235,
            y:538,
            alpha: 0
        });
        // 分享按钮
        shareBtn = createSprite("img/shareBtn.png?v=4",{
            x:225,
            y:1019,
            alpha: 0,
            interactive: true
        });
        if(window.innerHeight <= 950){
            part12Jiu.y -= 80;
            shareBtn.y -= 80;
        }
        part12Container.addChild(part12Font1,part12Font2,part12Jiu,shareBtn);

        // 场景十一 团圆放大到星空
        part11Container = new PIXI.Container();
        part11Container.pivot.x = 0;
        part11Container.pivot.y = 0;
        part11Container.x += part11Container.pivot.x;
        part11Container.y += part11Container.pivot.y;
        part11Container.scale.x = getNum2(11,"scale");
        part11Container.scale.y = getNum2(11,"scale");

        var pic11 = createSprite("img/9.jpg?v=4",{
            x:0,
            y:0
        });
        // 云
        var part11Yun1 = createSprite("img/part11-yun1.png?v=4",{
            x:844-40,
            y:101
        });
        // 云2
        var part11Yun2 = createSprite("img/part11-yun2.png?v=4",{
            x:450,
            y:0
        });
        var part11Moon = createSprite("img/part11-moon.png?v=4",{
            x: 752,
            y: 0
        });
        part11Container.addChild(pic11,part11Yun1,part11Yun2,part11Moon,part12Container);
        // part11Container.displayGroup = index1;


        // 分享页
        var shareContainer = new PIXI.Container();
        shareContainer.pivot.x = 0;
        shareContainer.pivot.y = 0;
        shareContainer.x += shareContainer.pivot.x;
        shareContainer.y += shareContainer.pivot.y;
        shareContainer.scale.x = 640/750;
        shareContainer.scale.y = 640/750;
        shareContainer.interactive = true;
        shareContainer.alpha = 0;

        var shareBg = createSprite("img/share.png?v=4",{
            x: 0,
            y: 0
        });

        shareContainer.addChild(shareBg);

        // 添加到舞台
        app.stage.addChild(btnContainer,part11Container,part10Container,part9Container,part8Container,part7Container,part6Container,part5Container,part4Container,part3Container,part2Container,part1Container,shareContainer);

        var ContainerNum = 1;
        var scaleNum = 1;
        // scaleNum = getNum2(11,"scale");
        // ContainerNum = 11;
        var scaleTicker = new PIXI.ticker.Ticker();
        scaleTicker.add(function(){
            // 第一个图片缩放
            if(ContainerNum == 1){
                if(scaleNum >= getNum(1,"scaleTo")){
                    scaleNum -= getNum(1,"scaleSpeed");
                    part1Container.x -= getNum(1,"xSpeed");
                    part1Container.scale.x = scaleNum;
                    part1Container.scale.y = scaleNum;
                }else{
                    // scaleTicker.stop();
                    part1Container.visible = false;
                    scaleNum = getNum(2,"scale");
                    ContainerNum++;
                }
            }
            // 第二个图片缩放
            if(ContainerNum == 2){
                if(scaleNum >= getNum(2,"scaleTo")){
                    scaleNum -= getNum(2,"scaleSpeed");
                    part2Container.x -= getNum(2,"xSpeed");
                    part2Container.y -= getNum(2,"ySpeed");
                    part2Container.scale.x = scaleNum;
                    part2Container.scale.y = scaleNum;
                }else{
                    // scaleTicker.stop();
                    part2Container.visible = false;
                    scaleNum = getNum(3,"scale");
                    ContainerNum++;
                }
            }
            // 第三个图片缩放
            if(ContainerNum == 3){
                if(scaleNum >= getNum(3,"scaleTo")){
                    scaleNum -= getNum(3,"scaleSpeed");
                    part3Container.x -= getNum(3,"xSpeed");
                    part3Container.y -= getNum(3,"ySpeed");
                    part3Container.scale.x = scaleNum;
                    part3Container.scale.y = scaleNum;
                }else{
                    // scaleTicker.stop();
                    part3Container.visible = false;
                    scaleNum = getNum(4,"scale");
                    ContainerNum++;
                }
            }
            // 第四个图片缩放
            if(ContainerNum == 4){
                if(scaleNum >= getNum(4,"scaleTo")){
                    scaleNum -= getNum(4,"scaleSpeed");
                    part4Container.x -= getNum(4,"xSpeed");
                    part4Container.y -= getNum(4,"ySpeed");
                    part4Container.scale.x = scaleNum;
                    part4Container.scale.y = scaleNum;
                }else{
                    // scaleTicker.stop();
                    part4Container.visible = false;
                    scaleNum = getNum(5,"scale");
                    ContainerNum++;
                }
            }
            // 第五个图片缩放
            if(ContainerNum == 5){
                if(scaleNum >= getNum(5,"scaleTo")){
                    scaleNum -= getNum(5,"scaleSpeed");
                    part5Container.x -= getNum(5,"xSpeed");
                    part5Container.y -= getNum(5,"ySpeed");
                    part5Container.scale.x = scaleNum;
                    part5Container.scale.y = scaleNum;
                }else{
                    scaleTicker.stop();
                    setTimeout(function(){
                        scaleTicker.start();
                        ContainerNum++;
                    },1400);
                    TweenMax.fromTo(part5Talk1,1,{alpha: 0},{ alpha: 1 });
                    part5Container.visible = false;
                    scaleNum = getNum2(6,"scale");

                }
            }
            // 第六个场景放大
            if(ContainerNum == 6){
                if(scaleNum <= getNum2(6,"scaleTo")){
                    scaleNum += getNum2(6,"scaleSpeed");
                    part6Container.x -= getNum2(6,"xSpeed");
                    part6Container.y -= getNum2(6,"ySpeed");
                    part6Container.scale.x = scaleNum;
                    part6Container.scale.y = scaleNum;
                }else{
                    // scaleTicker.stop();
                    part6Container.visible = false;
                    scaleNum = getNum(7,"scale");
                    ContainerNum++;
                }
            }
            // 第七个场景缩放 月亮到饭桌
            if(ContainerNum == 7){
                if(scaleNum >= getNum(7,"scaleTo")){
                    scaleNum -= getNum(7,"scaleSpeed");
                    part7Container.x -= getNum(7,"xSpeed");
                    part7Container.y -= getNum(7,"ySpeed");
                    part7Container.scale.x = scaleNum;
                    part7Container.scale.y = scaleNum;
                }else{
                    scaleTicker.stop();
                    setTimeout(function(){
                        scaleTicker.start();
                        ContainerNum++;
                    },1000);
                    part7Container.visible = false;
                    scaleNum = 640/1875;
                    // ContainerNum++;
                }
            }
            // 第八个场景饭桌右移
            if(ContainerNum == 8){
                if(part8Container.x >= -(pic8.width + pic8Guodu.width)*(640/1875)){
                    part8Container.x -= 4;
                }else{
                    // scaleTicker.stop();
                    scaleTicker.stop();
                    setTimeout(function(){
                        scaleTicker.start();
                        ContainerNum++;
                    },1500);
                    part8Container.visible = false;
                    scaleNum = getNum2(10,"scale");
                    // ContainerNum++;
                }
            }
            // 第九个场景 家门口放到到窗户
            if(ContainerNum == 9){
                if(scaleNum <= getNum2(9,"scaleTo")){
                    scaleNum += getNum2(9,"scaleSpeed");
                    part9Container.x -= getNum2(9,"xSpeed");
                    part9Container.y -= getNum2(9,"ySpeed");
                    part9Container.scale.x = scaleNum;
                    part9Container.scale.y = scaleNum;
                }else{
                    // scaleTicker.stop();
                    part9Container.visible = false;
                    scaleNum = getNum(10,"scale");
                    ContainerNum++;
                }
            }
            // 第十个场景 窗户缩小到团圆
            if(ContainerNum == 10){
                // console.log(scaleNum);
                if(scaleNum >= getNum(10,"scaleTo")){
                    scaleNum -= getNum(10,"scaleSpeed");
                    part10Container.x -= getNum(10,"xSpeed");
                    part10Container.y -= getNum(10,"ySpeed");
                    part10Container.scale.x = scaleNum;
                    part10Container.scale.y = scaleNum;
                }else{
                    scaleTicker.stop();
                    setTimeout(function(){
                        scaleTicker.start();
                        ContainerNum++;
                    },1500);
                    TweenMax.fromTo(part11Yun1T,8,{x:844-40},{x:964,ease:Linear.easeNone}).repeat(-1).yoyo(true);
                    TweenMax.fromTo(part11Yun2T,16,{x:0},{x:600,ease:Linear.easeNone}).repeat(-1).yoyo(true);
                    TweenMax.fromTo(part11Yun1,8,{x:844-40},{x:964,ease:Linear.easeNone}).repeat(-1).yoyo(true);
                    TweenMax.fromTo(part11Yun2,16,{x:0},{x:600,ease:Linear.easeNone}).repeat(-1).yoyo(true);
                    part10Container.visible = false;
                    scaleNum = getNum2(11,"scale");
                    // ContainerNum++;
                }
            }

            // 第十一个场景 团圆放大到星空
            if(ContainerNum == 11){
                if(scaleNum <= getNum2(11,"scaleTo")){
                    scaleNum += getNum2(11,"scaleSpeed");
                    part11Container.x -= getNum2(11,"xSpeed");
                    part11Container.y -= getNum2(11,"ySpeed");
                    part11Container.scale.x = scaleNum;
                    part11Container.scale.y = scaleNum;
                }else{
                    scaleTicker.stop();
                    btnContainer.displayGroup = index3;
                    TweenMax.fromTo(btnContainer,1,{ alpha:1 },{ alpha:0 });
                    setTimeout(function(){
                        btnContainer.displayGroup = index1;
                    },2000);
                    TweenMax.fromTo(part12Jiu,2,{ alpha:0 },{ alpha:1 }).delay(1.5);
                    TweenMax.fromTo(part12Font1,2,{ alpha:0 },{ alpha:1 }).delay(2.5);
                    TweenMax.fromTo(part12Font2,2,{ alpha:0 },{ alpha:1 }).delay(3.5);
                    TweenMax.fromTo(shareBtn,2,{ alpha:0 },{ alpha:1 }).delay(4.5);

                    part11Container.displayGroup = index2;

                    var shareShow = false;
                    shareContainer.on("pointertap",function(){
                        if(shareShow){
                            TweenMax.fromTo(shareContainer,1,{alpha: 1},{alpha: 0});
                            shareContainer.displayGroup = index1;
                            shareShow = false;
                        }
                    });

                    // 分享提示
                    shareBtn.on("pointertap",function(){
                        shareShow = true;
                        NeteaseShare(function(){
                            // 微信分享提示
                            TweenMax.fromTo(shareContainer,1,{alpha: 0},{alpha: 1});
                            shareContainer.displayGroup = index3;
                        },false);
                    });


                    // part11Container.visible = false;
                    // scaleNum = getNum(10,"scale");
                    ContainerNum++;
                }
            }

        });

        // 长按缩小
        btnContainer.on("pointerdown",function(){
            scaleTicker.start();
            // TweenMax.fromTo(btnContainer,1,{ alpha:1 },{ alpha:0.6 });
            btnLine1.visible = false;
            btnLine2.visible = false;
        });
        btnContainer.on("pointerup",function(){
            scaleTicker.stop();
            // TweenMax.fromTo(btnContainer,1,{ alpha:0.6 },{ alpha:1 });
            btnLine1.visible = true;
            btnLine2.visible = true;
        });
        btnContainer.on("pointerupoutside",function(){
            scaleTicker.stop();
            // TweenMax.fromTo(btnContainer,1,{ alpha:0.6 },{ alpha:1 });
            btnLine1.visible = true;
            btnLine2.visible = true;
        });
    });
}

// 缩小
function getNum(id,option){
    var imgObj;
    for(var i = 0; i < imgData.length; i++ ){
        if( imgData[i].num == id ){
            imgObj = imgData[i];
        }
    }
    switch(option){
        // 小图的x位移
        case "x":
            return imgObj.x;
            break;
        // 小图的y位移
        case "y":
            return imgObj.y;
            break;
        // 原图的对位x位移
        case "tx":
            return imgObj.x*(imgObj.ew/imgObj.w);
            break;
        // 原图的对位y位移
        case "ty":
            return imgObj.y*(imgObj.ew/imgObj.w);
            break;
        // 原图的对位缩放
        case "scale":
            return imgObj.ew/imgObj.w;
            break;
        // 上一张图片缩小比例
        case "minScale":
            return imgObj.w/imgObj.ow;
            break;
        // 缩放速度
        case "scaleSpeed":
            return imgObj.v;
            break;
        // x缩放速度
        case "xSpeed":
            return ((imgObj.v)/((imgObj.ew/imgObj.w)-imgObj.ew/imgObj.ow))*(-(imgObj.x*imgObj.ew)/imgObj.w);
            break;
        // y缩放速度
        case "ySpeed":
            return ((imgObj.v)/((imgObj.ew/imgObj.w)-imgObj.ew/imgObj.ow))*(-(imgObj.y*imgObj.ew)/imgObj.w);
            break;
        // 缩放结果
        case "scaleTo":
            return imgObj.ew/imgObj.ow;
            break;
    }
}

// 放大
function getNum2(id,option){
    var imgObj;
    for(var i = 0; i < imgData.length; i++ ){
        if( imgData[i].num == id ){
            imgObj = imgData[i];
        }
    }
    switch(option){
        // 原图的对位缩放
        case "scale":
            return imgObj.ew/imgObj.ow;
            break;
        // 缩放速度
        case "scaleSpeed":
            return imgObj.v;
            break;
        // x缩放速度
        case "xSpeed":
            return ((imgObj.v/((imgObj.ew/imgObj.w)-(imgObj.ew/imgObj.ow)))*(imgObj.x*(imgObj.ew/imgObj.w)));
            break;
        // y缩放速度
        case "ySpeed":
            return ((imgObj.v/((imgObj.ew/imgObj.w)-(imgObj.ew/imgObj.ow)))*(imgObj.y*(imgObj.ew/imgObj.w)));
            break;
        // 缩放结果
        case "scaleTo":
            return imgObj.ew/imgObj.w;
            break;
    }
}
function createAnimatedSprite(name, num, opt, start) {
    // 用json 资源创建一个 AnimatedSprite 对象
    var Textures = [],
        i, AnimatedSpriteInstance;
    i = start || 0;
    for (; i < num; i++) {
        var Texture = PIXI.Texture.fromImage(name + i + '.png');
        Textures.push(Texture);
    }
    AnimatedSpriteInstance = new PIXI.extras.AnimatedSprite(Textures);
    if (opt) {
        _.forIn(opt, function(value, key) {
            AnimatedSpriteInstance[key] = value;
        });
    }
    return AnimatedSpriteInstance;
}
function createSprite(name,opt){
    var newSprite = new PIXI.Sprite.fromImage(name);
    if (opt) {
        _.forIn(opt, function(value, key) {
            newSprite[key] = value;
        });
    }
    return newSprite;
}
// loading
function moonLodaing(imgs,callback){
    if(!imgs){return false};
    var img=[];
    var len=imgs.length;
    var loadedCount = 0;
    for(var i=0;i<len;i++){
        img[i]=new Image();
        img[i].src=imgs[i];
        img[i].onload = function(){
            loadedCount++;
            if (loadedCount>=len){
                // setTimeout(function(){
                //     $('.moon-loading').fadeOut(800,function(){
                //         $(this).remove();
                //     });
                // },1000);
                callback ? callback() : null;
            }
        };
    }
};

function moonLodaing2(imgs,callback){
    var timeNow = 0;

    $(".moon")[0].addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
        timeNow = 98;
    }, false);

    var timer = setInterval(function(){
        timeNow++;

        if(timeNow>=100){
            $('.moon-loading-num').html("100%");
            window.clearInterval(timer);
            $('.moon-loading').fadeOut(800,function(){
                $(this).remove();
            });
        }else{
            $('.moon-loading-num').html(timeNow+"%");
        }
    },80);
    if(!imgs){return false};
    var img=[];
    var len=imgs.length;
    var loadedCount = 0;
    for(var i=0;i<len;i++){
        img[i]=new Image();
        img[i].src=imgs[i];
        img[i].onload = function(){
            loadedCount++;
            if (loadedCount>=len){
                callback ? callback() : null;
            }
        };
    }
};

