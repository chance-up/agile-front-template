/**
 * 공통
 */

$(document).ready(function(){

	/*  gnb  */
	$('#navi ul li a').click(function(){
		$(this).parent().addClass('on');
		$(this).next().slideDown(400);

		$('#navi ul li a').not(this).next().slideUp(400);
		$('#navi ul li a').not(this).parent().removeClass('on');
		
	});

	
});