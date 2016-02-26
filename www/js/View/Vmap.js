var vmap={
myPositionMarker: undefined,
first: true,
	meIcon:undefined,
	foiIcon:undefined,




initIcon:function(){
	console.log("d");
		this.meIcon=L.icon({
			        iconUrl: './img/marker-icon.png',
			        iconRetinaUrl: './img/marker-icon-2x.png',
			        iconSize: [25, 41],
			        popupAnchor: [-3, -76],
			        shadowUrl: './img/marker-shadow.png',
			        shadowRetinaUrl: './img/marker-shadow.png',
			        shadowSize: [30, 45],
			        shadowAnchor: [10, 20],
			    });
		this.foiIcon = L.Icon.extend({
					    options: {
					      
					        iconSize:     [50, 50],
					        shadowSize:   [50, 64],
					        iconAnchor:   [22, 94],
					        shadowAnchor: [4, 62],
					        popupAnchor:  [-3, -76]
					    }
				});
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
		
	case 'foi':
		
		
		break;
	}
},
addFoi:function(dati)
{ 
	
	for(var x in dati)
	{ 
		var coordinates=cgrid.coordFromCell(dati[x].position);
		var markerfoi=vmap.foiIcon;
		var foi= new markerfoi({iconUrl: './img/'+dati[x].codice+'.png'});
		L.marker(coordinates,{icon:foi}).addTo(map); 
		
	}
}

}

