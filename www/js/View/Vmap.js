var Vmap=function(){}

Vmap.prototype.setMapContainer=function(deviceinfo){
	if(deviceinfo.platform =="iOS")
	  {if(deviceinfo.orientation =="0" || deviceinfo.orientation =="180")
		{var height=deviceinfo.height;
		var width=deviceinfo.width;
		}
	 else
		 {
		 var height=deviceinfo.width;
		 var width=deviceinfo.height;
		 }
	  }
	else
		{
		var height=deviceinfo.height;
		var width=deviceinfo.width;
		}
	
		
		
	$("body").css({
		"height":height,
		"width":width,		
		
	});
	
	
	$(".mapContainer").css({
			"height":height,
			"width":width,	
			
		});
		
	if(deviceinfo.platform == "iOS")
		{$(".mapcontainer").css({
				"margin-top": "15px"
			})
		}
			
		
	
	
	
	
}

