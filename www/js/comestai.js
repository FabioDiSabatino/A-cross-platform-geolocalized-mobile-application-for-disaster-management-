$(".cell-stato").on("tap",function(){
	$(this).siblings().children().children().children().addClass("no-active").removeClass("text-active");
	$(this).children().children().children().removeClass("no-active").addClass("text-active");
});


$("#back-from-comestai").on("tap",function(){
	$(".content").attr("id","dashboard");
	$.mobile.changePage("index.html");
});
$("#pubblica-comestai").on("tap",function(){
	if($(".cell-stato").children().children().children().hasClass("text-active"))
	  {
			window.alert("Una squadra di soccorso arriverà il prima possibile")
		}
		else
		{
			window.alert("seleziona prima il tuo stato")
		}
	});
	
	
	