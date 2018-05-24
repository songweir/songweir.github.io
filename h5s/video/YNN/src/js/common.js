$(function() {
	var qd = window.localStorage.getItem('qd');
	var $logoWrap = $('.logo-wrap');
	if (qd === '1') {
		$logoWrap.html('<img src="./src/image/yingbeier.png" class="yingbeier">')
	} else if (qd === '2') {
		$logoWrap.html('<img src="./src/image/brand_zyyy.png" class="zhongyi">')
	}
})