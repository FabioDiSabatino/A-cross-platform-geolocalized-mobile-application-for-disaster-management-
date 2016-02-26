var vmap={
myPositionMarker: undefined,
first: true,





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
	

	},
	

addMarker:function(dati)
	{   
		
	switch (dati.type)
	
	{
	case 'minePosition':
		if(this.first)
			{
			
			 map.setView(dati.coordinates,17);
			 this.first=false;
			}
		else	
	     {		     
			  map.removeLayer(this.myPositionMarker);
			  console.log("marker rimosso");
		  }	
		
		this.myPositionMarker=L.circleMarker(dati.coordinates,{radius:5}).addTo(map);     
	
		break;
		
	case 'eventPosition':
		
		
		break;
	}
}

}

