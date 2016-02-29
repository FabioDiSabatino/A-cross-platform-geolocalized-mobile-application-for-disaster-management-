
$("#back-from-map").on("tap",function(){
	$(".content").attr("id","dashboard");
	chome.mux({task:'stopMap'});
	$.mobile.changePage("index.html");
});
sortNearest= function(dati)
{
	var arr=dati.official;
	var len = arr.length;
	arr.sort(function(a, b) {
	    return parseFloat(a.distanza) - parseFloat(b.distanza);
	});
	return arr;
};
$(".latest").on("tap",function(){
	//riordino schede o centra mappa in base al più vicino
	news.official=sortLatestNews(news);
	chome.mux({task:"centerView",pack:news.official[0].position});
	 
 	$(".check-latest").addClass("active");
	$(".check-nearest").removeClass("active");
 	
});
$(".nearest").on("tap",function(){
	//riordino schede o centra mappa in base al più vicino
	news.official=sortNearest(news);
	chome.mux({task:"centerView",pack:news.official[0].position});
 	$(".check-nearest").addClass("active");
	$(".check-latest").removeClass("active");
 	
});
(function(){
	
		
		
	  vhome.mux({task:'init'});
		vhome.mux({task:'noCenterMe'});
		chome.mux({task:'init'});
		
		map.on("load",function(){
			vhome.mux({task:'addNews',pack:news.official});
			chome.mux({task:"centerView",pack:news.official[0].position});
		})
	  
   
	
})() 
				
				
				
				
	    		