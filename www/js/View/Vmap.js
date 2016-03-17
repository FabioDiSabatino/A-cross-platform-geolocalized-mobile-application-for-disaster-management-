var vmap={
myPositionMarker: undefined,
first: true,
meIcon:undefined,
foiIcon:undefined,
centerMe:true,
markers:undefined,
newsIcon:undefined,
	clicked:undefined,



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
				this.newsIcon = L.Icon.extend({
							    options: {
					      
							        iconSize:  [50, 60],
								
					       
							    }
						});
			this.markers = L.markerClusterGroup({
							maxClusterRadius: 120,
							iconCreateFunction: function (cluster) {
								return L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>', className: 'foiCluster', iconSize: L.point(40, 40) });
							},
						spiderfyDistanceMultiplier:2, showCoverageOnHover: false, zoomToBoundsOnClick: false 
				
						});
						this.markers.on('clusterclick', function (a) {
							a.layer.spiderfy();
							var pop=a.layer.getAllChildMarkers();
							for (var x in pop)
							{ 
									pop[x].openPopup();
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
	
	
		
	for(var x in dati)
	{ 
		var coordinates=cgrid.coordFromCell(dati[x].position);
		var markerfoi=vmap.foiIcon;
		var foi= new markerfoi({iconUrl: './img/'+dati[x].codice+'.png'});
		var marker_foi=L.marker(coordinates,{icon:foi});
		var foi_popup="<h3>"+dati[x].stato+"</h3> <p class='bolded'> at "+dati[x].ora_stato+"</p>";
		marker_foi.bindPopup(foi_popup);
			
		this.markers.addLayer(marker_foi);
		
	}
	map.addLayer(this.markers);
},
addPoi:function(dati)
{
	
	for(var x in dati)
	{ 
		
		var coordinates=cgrid.coordFromCell(dati[x].position);
		var markerfoi=vmap.foiIcon;
		var poi= new markerfoi({iconUrl: './img/'+dati[x].foto+'.png'});
		var marker_poi=L.marker(coordinates,{icon:poi}); 
		var poi_popup="<h3>"+dati[x].emergency+"</h3> <p class='bolded'> signaled "+dati[x].number+" times latest at "+dati[x].ultimo_ora+"</p>";
		marker_poi.bindPopup(poi_popup);
		this.markers.addLayer(marker_poi);	
	}
	map.addLayer(this.markers);
	
},
addNews:function(dati)
{
	console.log("debug");	
	for(var x in dati)
	{ 
		
		var coordinates=cgrid.coordFromCell(dati[x].position);
		var markernews=vmap.newsIcon;
		var news= new markernews({iconUrl: './img/newsicon.png'});
		var marker_news=L.marker(coordinates,{icon:news}); 
		var news_popup="<h3 class='title-news'>"+dati[x].title+"</h3> <p class='bolded'>"+dati[x].content+". At "+dati[x].times+"</p> <p";
		marker_news.bindPopup(news_popup);
		this.markers.addLayer(marker_news);	
	}
	map.addLayer(this.markers);
	
},
addHold:function(pos)
{
  
		if(typeof this.clicked !== 'undefined')
		{
			map.removeLayer(this.clicked);
		}
		map.setView(pos,15);
	  this.clicked=L.circleMarker(pos,{radius:10,color:'red'}).addTo(map); 

	
	
}

}

