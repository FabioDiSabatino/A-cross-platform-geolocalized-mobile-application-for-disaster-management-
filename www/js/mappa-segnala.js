

$("#back-from-pubblica-segnala").on("tap",function(){
	$(".content").attr("id","segnala");
	cmap.stopMap();
	$.mobile.changePage("segnala.html");
});
$(".chiusa").on("tap",function(){
	$(".content").attr("id","dashboard");
		cmap.stopMap();
	$.mobile.changePage("index.html");

});

vhome.mux({task:'init'});
vhome.mux({task:'noCenterMe'});
chome.mux({task:'init'});
chome.mux({task:'taphold'});
vhome.mux({task:'taphold'});