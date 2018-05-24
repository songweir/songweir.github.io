var APIURI = {
	qiniuPath: 'http://szp.h5ome.com/',
	getUpToken: './show/getUpToken', // 获取七牛TOKEN
	submitUserinfo: './show/Addusers',
	getUserinfo: './show/getmessage'
}
var TOKEN = {
	imgToken: '',
	videoToken: ''
};
var babyBase64 = '';
var babyImg = '';
var babyVideo = '';
var babyImgFile = '';
var babyVideoFile = '';
/*
*qiniuToken 获取七牛Token
*@type {number} 1图片， 2视频
*@successCallback {function} 成功异步后的回调
*@failCallback {function} 失败异步后的回调
*/
function qiniuToken(type, successCallback) {
	$.ajax({
	    url: APIURI.getUpToken,
	    type: 'get',
	    data: {type: type},
	    dataType: 'json',
	    success: function(data) {
	    	// alert(JSON.stringify(data));
	        // if (type === 1) {
	        // 	TOKEN.imgToken = data.uptoken
	        // } else if (type === 2) {
	        // 	TOKEN.videoToken = data.uptoken
	        // 	$('#token').val(data.uptoken);	        	
	        // }
	        successCallback(data.uptoken);
	    },
	    error: function(error) {

	    }
	})	
}

/*
*upLoadQiniuImg 上传图片到七牛
*@picBase {string} 图片的base64形式
*@token {string} 七牛Token
*@successCallback {function} 成功异步后的回调
*@failCallback {function} 失败异步后的回调
*/
function upLoadQiniuImg(picBase, token, successCallback, failCallback) {
    picBase = picBase.substring(23);
    function fileSize(str)
    {
        var fileSize;
        if(str.indexOf('=')>0)
        {
            var indexOf=str.indexOf('=');
            str=str.substring(0,indexOf);//把末尾的’=‘号去掉
        }

        fileSize=parseInt(str.length-(str.length/8)*2);
        return fileSize;
    }  
    
    var url = "http://upload.qiniu.com/putb64/"+fileSize(picBase); 
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function()
    {
        if (xhr.readyState === 4){
            var keyText = xhr.responseText;

            /*返回的key是字符串，需要装换成json*/
            keyText = JSON.parse(keyText);
            //alert("http://zhch.h5ome.com/"+keyText.key);
            console.log("http://szp.h5ome.com/" + keyText.key);
	        successCallback("http://szp.h5ome.com/" + keyText.key);
        } else {
			failCallback();        	
        }
    }
    xhr.open("POST", url, true); 
    xhr.setRequestHeader("Content-Type", "application/octet-stream"); 
    xhr.setRequestHeader("Authorization", "UpToken " + token); 
    xhr.send(picBase);
}

/*
*formatImage 图片压缩输出base64 使用lrz.all.bundle.js完成
*@files {object} 图片对象
*@successCallback {function} 成功异步后的回调
*@failCallback {function} 失败异步后的回调
*/
function formatImage(files, successCallback, failCallback) {
	lrz(files)
	.then(function (rst) {
		// 处理成功会执行
		// console.log(rst);
       	successCallback(rst.base64);	
	})
	.catch(function (err) {
		// 处理失败会执行
        failCallback(err);		
	})
	.always(function () {
		// 不管是成功失败，都会执行
	});
}

/*
*upLoadQiniuVideo 上传视频到七牛
*@videoElem {string} video 标签的ID
*@successCallback {function} 成功异步后的回调
*@failCallback {function} 失败异步后的回调
*/
function upLoadQiniuVideo(video, successCallback, failCallback) {
	// var formData = new FormData(document.getElementById(videoElem));
	var formData = new FormData();
	formData.append('file', video);
	formData.append('key',  Math.random().toString(36).substr(2) + video.name.match(/\.?[^.\/]+$/));
	formData.append('token', TOKEN.videoToken);	
	formData.append('accept', '');	
	$.ajax({
	    url: 'http://upload.qiniup.com',  // Different bucket zone has different upload url, you can get right url by the browser error massage when uploading a file with wrong upload url.
	    type: 'POST',
	    data: formData,
	    processData: false,
	    contentType: false,
	    xhr: function(){
	      myXhr = $.ajaxSettings.xhr();  
	      if(myXhr.upload){
	        $('.updata-overlay').show();// 上传进度浮层
	        myXhr.upload.addEventListener('progress',function(e) {
	          // console.log(e);
	          if (e.lengthComputable) {
	            var percent = e.loaded/e.total*100;
	            $('#showtip').html('视频上传：' + percent.toFixed(0) + "%")
	            console.log('视频上传：' + e.loaded + "/" + e.total+" bytes. " + percent.toFixed(0) + "%");
	            //$progress.html('上传：' + e.loaded + "/" + e.total+" bytes. " + percent.toFixed(2) + "%");
	          }
	        }, false);
	      }
	      return myXhr;
	    },
	    success: function(res) {
	    	// 上传成功
	        // console.log(res);
			// alert("成功:" +  JSON.stringify(res));
	        // $('#showtip').html('上传成功');
	        successCallback(res)	        
	    },
	    error: function(res) {
			// $('#showtip').hide();
			alert("失败:" +  JSON.stringify(res));
			// console.log("失败:" +  JSON.stringify(res));
			failCallback(res)	 	      
			// $uploadedResult.html('上传失败：' + res.responseText);
	    }
	  }); 
}


$(function(){
	var localUA = navigator.userAgent;
	var resUA = new uaDevice(localUA);
	alert(resUA.device.manufacturer + '-' + resUA.device.model)
	if (resUA.device.manufacturer === 'Smartisan') {
		$('#video-file').attr('capture', 'camcorder')
	}
	// alert(resUA.device.manufacturer + '-' + resUA.device.model);
	// console.log(resUA, '版本信息');
	// 获取传图token
	qiniuToken(1, function(token) {
		TOKEN.imgToken = token;
	})
	// 获取传视频token
	qiniuToken(1, function(token) {
		TOKEN.videoToken = token;		
	})
	// 图片控件绑定onchange 事件
	document.getElementById('image-file').addEventListener('change', function() {
		$('.imgtext').text(event.target.files[0].name);
		babyImg = event.target.files[0].name;
		babyImgFile = event.target.files[0]
		this.value = '';
	})
	// 视频控件绑定onchange 事件
	$('#video-file').on('change', function(event) {
		$('.videotext').text(event.target.files[0].name);
		babyVideo = event.target.files[0].name;	
		babyVideoFile = event.target.files[0];
		console.log(event.target.files[0], '视频')		
		$(this).val('');		
	})

	// 获取用户信息
	function getUserinfo() {
		$.ajax({
			url: APIURI.getUserinfo,
			type: 'post',
	    	dataType: 'json',
	    	success: function(data) {
	    		// alert(JSON.stringify(data));
	    		if (data.retcode === 0) {
	    			if (data.data[0].babyname) {   				
	    				$('.inp_name').val(data.data[0].babyname);
    					$('.sexbox').each(function(){
    						if ($(this).data('sexid') === parseInt(data.data[0].sex)) {
    							$(this).addClass("checked");
    						} else {
								$(this).removeClass("checked");
    						}
    					}) 					
    					var ages = data.data[0].birthday.split(' ');
    					ages = ages[0].split('/');
						$('.inp_year').val(ages[0]);
						$('.inp_month').val(ages[1]);
						$('.inp_day').val(ages[2]);

						$('.inp_family').val(data.data[0].parentname);
						$('.inp_phone').val(data.data[0].tel);
						$('.inp_speciality').val(data.data[0].Speciality);
						babyImg = data.data[0].imgurl;
						babyVideo = data.data[0].videourl;



						$('.imgtext').text(convert(data.data[0].imgurl));
						$('.videotext').text(convert(data.data[0].videourl));						
	    			}
	    		}
	    	}		
		})
	}
	getUserinfo();

	function convert(url){
		url  = url.substring(url.lastIndexOf("/")+1);
		return url;
	}

	// 上传用户信息
	$('#signup').on('click', upLoadUserInfo);
	function upLoadUserInfo() {
		var babyName = $('.inp_name').val();
		var babySex = $('.checked').data('sexid');
		var year = $('.inp_year').val();
		var month = $('.inp_month').val();
		var day = $('.inp_day').val();
		var name = $('.inp_family').val();
		var phone = $('.inp_phone').val();
		var special = $('.inp_speciality').val();
		var agree = $('.statement').hasClass('none') ? false : true;
		if (!babyName) {
			alert('请填写宝宝名字');
			return false;
		}
		if (!year) {
			alert('请填写宝宝出生年份');
			return false;
		}
		if(year<2012 || year>2017){
			alert('参赛宝宝年龄要在1-6岁哦');
			return false;
		}
		if (!month) {
			alert('请填写宝宝出生月份');
			return false;
		}
		if (month<0 || month>12) {
			alert('宝宝出生月份填写不正确');
			return false;
		}
		if (!day) {
			alert('请填写宝宝出生日');
			return false;
		}
		if (day<0 || day>31) {
			alert('宝宝出生日填写不正确');
			return false;
		}
		if (!name) {
			alert('请填写家长姓名');
			return false;
		}
		if (!phone) {
			alert('请填写联系电话');
			return false;
		}	
		if (!/^1[34578]\d{9}$/.test(phone)) {
			alert('请填写正确的联系电话');
			return false;
		}
		if (!special) {
			alert('请填写宝宝特长');
			return false;			
		}
		if (!babyImg) {
			alert('请选择萌宝照片');
			return false;
		}
		if (!babyVideo) {
			alert('请选择萌宝视频');
			return false;
		}
		if (babyVideoFile && babyVideoFile.size > 45*1024*1024) {
	        alert('视频最大不能超过40M哦。');
	        return false;
		}
		if (!agree) {
			alert('是否同意活动细则及隐私声明');
			return false;			
		}
		var data = {
			babyname: babyName, 
			sex: babySex, 
			birthday: year + '-' + month + '-' + day, 
			parentsname: name, 
			tel: phone, 
			special: special, 
			imgurl: babyImg, 
			videourl: babyVideo
		}		
		upLoadImg();
		// 上传图片
		function upLoadImg(){
			$('.updata-overlay').show();
			if (babyImgFile) {
				$('#showtip').html('图片上传...');			
				formatImage(babyImgFile, function(base64){
					upLoadQiniuImg(base64, TOKEN.imgToken, function(imgUrl){
						data.imgurl = babyImg = imgUrl;
						upLoadVideo();						
					})
				})
			} else {
				upLoadVideo();
			}
		}
		// 上传视频
		function upLoadVideo(){
			if (babyVideoFile) {
				$('#showtip').html('视频上传...');
				// 3.视频传七牛
				upLoadQiniuVideo(babyVideoFile, function(res) {
					data.videourl = babyVideo = APIURI.qiniuPath + res.key
					// 4.提交资料
					submit(data);
				}, upLoadFail)
			} else {		
				submit(data);				
			}	
		}
		// 失败
		function upLoadFail() {
			$('#showtip').html('上传失败');
			setTimeout(function(){
				$('.updata-overlay').show();
				$('#showtip').html('');
			}, 2000)
		}
		// 提价数据
		function submit(data) {
	        $('#showtip').html('提交资料...');			
	        $.ajax({
	            url: APIURI.submitUserinfo,
	            type: 'post',
	            data: JSON.stringify(data),
	            contentType: 'application/json',
	    		dataType: 'json',	            
	            success: function (data) {
	            	console.log(data);
	            	// alert(JSON.stringify(data));
	            	if (data.retcode === 0) {
	            		$('#showtip').html('提交成功');
	            		window.localStorage.setItem('id', data.userid);
	            		window.localStorage.setItem('imgsrc', data.imgurl);
	            		setTimeout(function(){
	            			// $('.updata-overlay').hide();
	            			window.location.href = './final.html'; // 提价后
	            		}, 1000);
	            	} else {
	            		upLoadFail();
	            	}
	            },
	            error: function() {
	            	upLoadFail();
	            }
	        });			
		}
	}
})