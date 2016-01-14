var vmap={
	
PositionIcon: undefined,
minePositionMarker:undefined,





initIcon:function(){
		this.PositionIcon=L.icon({
			        iconUrl: './img/marker-icon.png',
			        iconRetinaUrl: './img/marker-icon-2x.png',
			        iconSize: [25, 41],
			        popupAnchor: [-3, -76],
			        shadowUrl: './img/marker-shadow.png',
			        shadowRetinaUrl: './img/marker-shadow.png',
			        shadowSize: [30, 45],
			        shadowAnchor: [10, 20],
			    })
	},
	
setMapContainer:function(deviceinfo){
	
	deviceinfo=cdevice.getInfo();
	
	if(deviceinfo.platform =="iOS")
	  {if(deviceinfo.orientation =="0" || deviceinfo.orientation =="180")
		{ var height=deviceinfo.height;
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
	},
	

addMarker:function(dati)
	{   
		
	switch (dati.type)
	
	{
	case 'minePosition':
		if(typeof minePositionMarker !== "undefined")
			{
			  map.removeLayer(minePositionMarker);
			  console.log("marker rimosso");
			}
		else	
	     {		     
			  map.setView(dati.coordinates,17);
		   
		     
	    }	     
		minePositionMarker=L.marker(dati.coordinates,{icon:this.PositionIcon}).addTo(map);
		break;
		
	case 'eventPosition':
		
		
		break;
	}
}

}

