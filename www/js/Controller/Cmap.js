var map= function(){}

map.prototype.initMap=function(){
	
	var map = new L.map('map');

	var offlineLayer= new OfflineLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', 
	{
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    onReady: function(){
    	map.addLayer(offlineLayer);
		map.locate({ 
    		
    		setView:true,
    		maxZoom:16
    	});
    	

    },
    onError: function(){console.log('errore..')},
    storeName:"myStoreName",
    dbOption:"IndexedDB"   
	});




	
	
	var blueMarker = L.icon({
                iconUrl: './img/marker-icon.png',
                iconRetinaUrl: './img/marker-icon-2x.png',
                iconSize: [25, 41],
                popupAnchor: [-3, -76],
                shadowUrl: './img/marker-shadow.png',
                shadowRetinaUrl: './img/marker-shadow.png',
                shadowSize: [30, 45],
                shadowAnchor: [10, 20]
            });



function onLocationFound(e) {
	console.log('posizione individuata...')
     L.marker(e.latlng,{icon:blueMarker}).addTo(map);
     offlineLayer.saveTiles(16,function(){ console.log('salvataggio in corso..')},
    		 function(){console.log('salvataggio completato!')},
    		 function(){console.log('errore!')})  
};
function onLocationError(e) {
	alert(e.message);
};

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

		

}