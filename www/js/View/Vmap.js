var Vmap=function(){}

Vmap.prototype.setMapContainer=function(deviceinfo){
	
	$("body").css({
		"height":deviceinfo.height,
		"width":deviceinfo.width
		
	});
	$(".mapContainer").css({
		"height":(deviceinfo.height/100)*80,
		"width":deviceinfo.width	
		
	});
	$("#prova").css({
		"height":(deviceinfo.height/100)*20,
		"width":deviceinfo.width	
		
	})
	
	console.log(deviceinfo);
	
}

