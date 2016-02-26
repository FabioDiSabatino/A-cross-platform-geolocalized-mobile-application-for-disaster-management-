

$("#back-from-pubblica-segnala").on("tap",function(){
	$(".content").attr("id","segnala");
	cmap.stopMap();
	$.mobile.changePage("segnala.html");
})

chome.mux({task:'init'});