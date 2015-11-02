var Vmap=function(){}

Vmap.prototype.setMapContainer=function(deviceinfo){
	
	$(".mapContainer").css({
		"height":deviceinfo.height,
		"width":deviceinfo.width	
		
	});
	console.log(deviceinfo);
	
}

