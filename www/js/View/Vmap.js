var vmap={
myPositionMarker: undefined,
first: true,
meIcon:undefined,
foiIcon:undefined,
centerMe:true,




initIcon:function(){
	
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
					      
					        iconSize:  [40, 50],
								
					       
					    }
				});
	},
	
	

addMarker:function(dati)
	{   
		
	
		if(this.first)
			{
				if(this.centerMe)
					{ map.setView(dati,17);}
			 this.first=false;
			}
		else	
	     {		     
			  map.removeLayer(this.myPositionMarker);
			  
		  }	
		
		this.myPositionMarker=L.circleMarker(dati,{radius:10}).addTo(map);     
	
		
},
addFoi:function(dati)
{ 
	
	var markers = L.markerClusterGroup({
				maxClusterRadius: 120,
				iconCreateFunction: function (cluster) {
					return L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>', className: 'foiCluster', iconSize: L.point(40, 40) });
				},
			spiderfyDistanceMultiplier:2, showCoverageOnHover: false, zoomToBoundsOnClick: false 
				
			});
			markers.on('clusterclick', function (a) {
				a.layer.spiderfy();
				var pop=a.layer.getAllChildMarkers();
				for (var x in pop)
				{ 
						pop[x].openPopup();
					}
			});
		
	for(var x in dati)
	{ 
		var coordinates=cgrid.coordFromCell(dati[x].position);
		var markerfoi=vmap.foiIcon;
		var foi= new markerfoi({iconUrl: './img/'+dati[x].codice+'.png'});
		var marker_foi=L.marker(coordinates,{icon:foi});
		var foi_popup="<p class='bolded'>"+dati[x].stato+"</p> at "+dati[x].ora_stato;
		marker_foi.bindPopup(foi_popup);
			
		markers.addLayer(marker_foi);
		
	}
	map.addLayer(markers);
},
addPoi:function(dati)
{
	
	for(var x in dati)
	{ 
		
		var coordinates=cgrid.coordFromCell(dati[x].position);
		var markerfoi=vmap.foiIcon;
		var poi= new markerfoi({iconUrl: './img/'+dati[x].foto+'.png'});
		L.marker(coordinates,{icon:poi}).addTo(map); 
		
	}
}

}

