var Vmap=function(){}

Vmap.prototype.setMapContainer=function(deviceinfo){
	
	$("body").css({
		"height":deviceinfo.height,
		"width":deviceinfo.width
		
	});
	$(".mapContainer").css({
		"height":deviceinfo.height,
		"width":deviceinfo.width	
		
	});
	
	
	
	
}

