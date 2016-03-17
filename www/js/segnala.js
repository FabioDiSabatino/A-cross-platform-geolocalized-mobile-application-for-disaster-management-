$(".ripristina").on("tap",function(){
	$('.cell-segnala').siblings().children().children().children().removeClass("active text-active");
	$(".sendsignal").addClass('hidden');
});

$("#back-from-segnala").on("tap",function(){
	$(".content").attr("id","dashboard");
	
	$.mobile.changePage("index.html");
})

$(".cell-segnala").on("tap",function(){
	$(this).siblings().children().children().children().removeClass("active text-active");
	$(this).children().children().children().addClass(" active text-active");
	$(".sendsignal").removeClass('hidden');
	$(".content").animate({ scrollTop: $(document).height() }, 1200);
	
});


	

$(".mappa").on("tap",function(){
	
			$(".content").attr("id","pubblica-segnala");
			$.mobile.changePage("mappa-segnala.html");
			
	});



	
$("#camera").on("tap",function(){
	window.alert("Sorry now it's not possible upload photo because network is overload")
	});
	
	$(".chiusa").on("tap",function(){
		$(".content").attr("id","dashboard");
		$.mobile.changePage("index.html");

	});