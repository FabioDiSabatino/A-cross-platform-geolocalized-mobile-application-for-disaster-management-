var cmap={


initMap:function(){	
	

	
 map = new L.map('map');	
 
    offlineLayer= new OfflineLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
	{
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors Tiles © HOT ',
    onReady: function(){
    	map.addLayer(offlineLayer);
	  	map.locate({
	  		watch:true,
	  		enableHighAccuracy:true,
	  		timeout:10000
  		
	  	});
    	
    },
    onError: function(){console.log('errore db')},
    storeName:"LocalTiles", 
    dbOption:"WebSQL"   
	});
	
	
	
	

	function onLocationFound(e) {
		
	console.log("localizzato!!")
	myPosition=e.latlng;
	
	vhome.mux({task:'addMarker',dati:{type:'minePosition',coordinates:e.latlng}});
	var cell_data=cgrid.calcCell(e.latlng);

	console.log("dati griglia:");
  console.log(cell_data);
	var result=cgrid.coordFromCell(cell_data);
	fdb.savePosition(cell_data);
	vgrid.drawCell(result);
	

};
	
	
	
	function onLocationError(e) {
		map.setView(L.latLng(43.197, 8.438),5);
	};

	map.on('locationfound', onLocationFound);
	map.on('locationerror', onLocationError);

	$(window ).on( "orientationchange", function( event ) {
	    	   
		infodevice=cdevice.getInfo();
		vmap.setMapContainer(infodevice);
	});
	
	
	
	$("#button_grid").on("tap",function(){
		alert("disegno la griglia...");
		cgrid.calcGrid();
	});
	
	$("#button_save").on("tap",function(){
		cmap.saveMap();
	})
	
	

	
	
	
	

	
	
  },
  saveMap:function(){
	   offlineLayer.saveTiles(17,function(){ console.log('salvataggio in corso..')},
	    		 function(){console.log('salvataggio completato!')},
	    		 function(){console.log('errore!')});
  },
  startLocate:function(){
  	map.locate({
  		watch:true,
  		enableHighAccuracy:true,
  		timeout:10000
  		
  	});
  }
}





