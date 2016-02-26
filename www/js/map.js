
$("#back-from-map").on("tap",function(){
	$(".content").attr("id","dashboard");
	chome.mux({task:'stopMap'});
	$.mobile.changePage("index.html");
});

(function(){
	
		
		chome.mux({task:'init'});
   
	
})() 
				
				
				
				
	    		