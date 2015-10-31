var map= function(){}

map.prototype.init=function(){
	
	var map = new L.map('map');

	var offlineLayer= new OfflineLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', 
	{
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    onReady: function(){
    	map.addLayer(offlineLayer);
		map.locate({ 
    		watch:true,
    		setView:true,
    		maxZoom:13
    	});
    	

    },
    onError: function(){window.alert('errore..')},
    storeName:"myStoreName",
    dbOption:"WebSQL"   
	});


	/*************************************************/

	
	
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
     L.marker(e.latlng,{icon:blueMarker}).addTo(map);
     offlineLayer.saveTiles(13,function(){ window.alert('salvataggio in corso..')},function(){window.alert('salvataggio completato!')},function(){window.alert('errore..')})
    
   
    
};


map.on('locationfound', onLocationFound);


		function onLocationError(e) {
			alert(e.message);
		};

		
		map.on('locationerror', onLocationError);

		

}