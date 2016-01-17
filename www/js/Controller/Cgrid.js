var cgrid={
dimCell:4,
calcCell:function(latLng){
/*questo metodo tronca latitudine e longitudine della coordinata passata
  alla cifra specificata nella variabile dimCell, in accordo con l'algoritmo di santiago */
	
	
	
	var lat=latLng.lat;
	var lng=latLng.lng;
	var cut=Math.pow(10,this.dimCell);
	var coordinates=L.latLng(Math.floor(lat*cut)/cut,Math.floor(lng*cut)/cut);
	
	
	var coordinates_lat=L.latLng(Math.floor(coordinates.lat*1000)/1000,coordinates.lng);
	var coordinates_lng=L.latLng(coordinates.lat,Math.floor(coordinates.lng*1000)/1000);
	
	
	
	var dist_lat=this.calcDist(coordinates,coordinates_lat).haversine;
	var dist_lng=this.calcDist(coordinates,coordinates_lng).haversine;
	
	var dist={dist_lat,dist_lng};
	
	var cell_number_lat=Math.floor(dist_lat/22);
	var cell_number_lng=Math.floor(dist_lng/16);
	
	var cell={cell_number_lat,cell_number_lng};
	
	
	return ({zero:L.latLng(coordinates_lat.lat,coordinates_lng.lng),cell});
	
	
	},
	
calcCoordCell:function(data){
	 
	 var result=L.latLng(data.zero.lat+0.0001+(data.cell.cell_number_lat*0.0001*2),data.zero.lng+0.0001+(data.cell.cell_number_lng*0.0001*2));
	 L.circleMarker(result,{radius:5,color:'red'}).addTo(map);
	 return result;
	
	
	
		
	},
calcGrid:function(){
	//ottiene le coordinate sud-ovest e nord-est della mappa sul display
	var bounds=map.getBounds();
	// ottiene le coordinate degli angoli del display
	var cornerCoordinates= L.rectangle(bounds)._latlngs;
	//richiama metodo per il disegno della griglia
	vgrid.drawGrid(cornerCoordinates);
	
},
calcDist:function(c1,c2,type){
	// type se uguale a vincenty il metodo utilizza i due algoritmi e restituisce un 
	// un array con le due distanze
	if(type != undefined)
	{
		console.log("utilizzo anche il metodo di vincenty..")
		return {haversine:c1.distanceTo(c2),vincenty:distVincenty(c1,c2)};
	}
	else
	{
		return {haversine:c1.distanceTo(c2)};
	}
	
		
	}






}