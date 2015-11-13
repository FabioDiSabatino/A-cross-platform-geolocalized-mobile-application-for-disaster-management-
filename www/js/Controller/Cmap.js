var Cmap= function(){}

Cmap.prototype.initMap=function(){	
	var singleton= new Singleton();
	var cdevice=singleton.getInstance(Cdevice,"Cdevice");	
	var map = new L.map('map');

	var offlineLayer= new OfflineLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', 
	{
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    onReady: function(){
    	map.addLayer(offlineLayer);
		map.locate({
			watch:true,
    		setView:true,
    		maxZoom:16,
    		enableHighAccuracy:true
    	});
    	

    },
    onError: function(){console.log('errore db')},
    storeName:"LocalTiles", 
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
     offlineLayer.saveTiles(17,function(){ console.log('salvataggio in corso..')},
    		 function(){console.log('salvataggio completato!')},
    		 function(){console.log('errore!')})  
};
function onLocationError(e) {
	cordova.plugins.diagnostic.switchToLocationSettings();
};

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

$(window ).on( "orientationchange", function( event ) {
	
	var vmap=singleton.getInstance(Vmap,"Vmap");
	var infodevice=cdevice.getInfo();
	vmap.setMapContainer(infodevice);
})


		

}