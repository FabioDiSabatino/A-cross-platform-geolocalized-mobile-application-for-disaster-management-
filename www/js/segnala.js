$("#back-from-segnala").on("tap",function(){
	$(".content").attr("id","dashboard");
	$.mobile.changePage("index.html");
})

$(".cell-segnala").on("tap",function(){
	$(this).siblings().children().children().children().removeClass("active text-active");
	$(this).children().children().children().addClass(" active text-active");
	$(".content").animate({ scrollTop: $(document).height() }, 1200);
	
});

$(".mappa").on("tap",function(){
	if($(".cell-segnala").children().children().children().hasClass("text-active"))
	  {
			$(".content").attr("id","pubblica-segnala");
			$.mobile.changePage("mappa-segnala.html");
		}
		else
		{
			window.alert("seleziona prima l'emergenza da segnalare")
		}
	});

$(".myposition").on("tap",function(){
	if($(".cell-segnala").children().children().children().hasClass("text-active"))
	  {
			window.alert("hai segnalato: bla bla bla");
		}
		else
		{
			window.alert("seleziona prima l'emergenza da segnalare")
		}
	});

	
$("#camera").on("tap",function(){
	window.alert("Attenzione al momento non è possibile caricare foto")
	});
	
