$(function(){
	// $(".tabs-wrapper").swipe({ swipeStatus:signSwipe, threshold:0});

	var i = 0;
	// function signSwipe(event, phase, direction, distance){
	// 	console.log(direction);
	// 	if(direction == 'left'){
	// 		if(i == 0){
	// 			$(".tabs-controller .underline").css('transform', 'translateX(100%)');
	// 			goToTab('#tab2');
	// 			i++;
	// 		}else{
	// 			$(".tabs-controller .underline").css('transform', 'translateX(0%)');
	// 			goToTab('#tab1');
	// 			i = 0;
	// 		}
	// 	}else if(direction == 'right'){
	// 		if(i == 1){
	// 			$(".tabs-controller .underline").css('transform', 'translateX(100%)');
	// 			goToTab('#tab2');
	// 			i = 0;
	// 		}else{
	// 			$(".tabs-controller .underline").css('transform', 'translateX(0%)');
	// 			goToTab('#tab1');
	// 			i++;
	// 		}
	// 	}
	// }
	
	// var tabs = ('.tabs-wrapper');
	// var hm = new Hammer(tabs);
	// hm.on("panleft panright", function(ev) {
	//    alert(ev.type);
	// });

	$(".tabs-wrapper").hammer().bind("panleft panright", function(ev) {
	   // alert(ev.type);
	   if(ev.type == 'panleft'){
			$(".tabs-controller .underline").css('transform', 'translateX(100%)');
			goToTab('#tab2');
			i = 1;
		}else if(ev.type == 'panright'){
			$(".tabs-controller .underline").css('transform', 'translateX(0%)');
			goToTab('#tab1');
			i = 0;
		}
	});

	// $(".tabs-wrapper").hammer().bind("panup pandown", function(ev) {
	//    // alert(ev.type);
	//    if(ev.type == 'panup'){
	//    		$(this).css('top', '10%');
	// 	}else if(ev.type == 'pandown'){
	//    		$(this).css('top', '50%');
	// 	}
	// });

	$("#nav-signin").click(function(){
		$(".tabs-controller .underline").css('transform', 'translateX(0%)');
		goToTab('#tab1');
		i = 0;
	});

	$("#nav-signup").click(function(){
		$(".tabs-controller .underline").css('transform', 'translateX(100%)');
		goToTab('#tab2');
		i = 1;
	});

	var tabs = $(".tab");
	$(".tabs-wrapper").css('height', '340px');
	$("#tab1").css('transform', 'translateX(0%)');

	function goToTab(id){
		if(id == '#tab1'){
			$(id).css('transform', 'translateX(0%)');
			$(id).siblings().css('transform', 'translateX(100%)');
	   		$(".tabs-wrapper").css('height', '340px');
		}else{
			$(id).css('transform', 'translateX(0%)');
			$(id).siblings().css('transform', 'translateX(-100%)');
	   		$(".tabs-wrapper").css('height', '550px');
	   		$(".layer-graphic img").css({'transform':'scale(.3)'})
		}
	}

	var i_pw = 0;
	$("#show-password").click(function(){
		if(i_pw == 0){
			$(this).parent().parent().find("input[name=password]").attr('type', 'text');
			$(this).html("<i class='material-icons'>visibility_off</i>");
			i_pw++;
		}else{
			$(this).parent().parent().find("input[name=password]").attr('type', 'password');
			$(this).html("<i class='material-icons'>visibility_off</i>");
			i_pw = 0;
		}

	});

	// Main
	$(".main .tabs-controller .underline").css('transform', 'translateX(70%)');

	$(".main .content").load("page/my_point.ost");

});

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'hammerjs'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'), require('hammerjs'));
    } else {
        factory(jQuery, Hammer);
    }
}(function($, Hammer) {
    function hammerify(el, options) {
        var $el = $(el);
        if(!$el.data("hammer")) {
            $el.data("hammer", new Hammer($el[0], options));
        }
    }

    $.fn.hammer = function(options) {
        return this.each(function() {
            hammerify(this, options);
        });
    };

    // extend the emit method to also trigger jQuery events
    Hammer.Manager.prototype.emit = (function(originalEmit) {
        return function(type, data) {
            originalEmit.call(this, type, data);
            $(this.element).trigger({
                type: type,
                gesture: data
            });
        };
    })(Hammer.Manager.prototype.emit);
}));
