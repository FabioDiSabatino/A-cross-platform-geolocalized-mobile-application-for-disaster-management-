var cgrid={
dimCell:4,
calcCell:function(latLng){
/*questo metodo tronca latitudine e longitudine della coordinata passata
  alla cifra specificata nella variabile dimCell, in accordo con l'algoritmo di santiago */
	var lat=latLng.lat;
	var lng=latLng.lng;
	var cut=Math.pow(10,this.dimCell);
	return L.latLng(Math.floor(lat*cut)/cut,Math.floor(lng*cut)/cut);
	
	
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