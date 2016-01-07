var cgrid={

calcCell:function(){
/*questo metodo deve calcolare mediante l'algoritmo di santiago la cella in cui si trova l'utente
 e invocare il metodo checkCell */
	},
saveWarning:function (idCell){
/*questo metodo deve aggiornare il database locale con la nuova segnalazione nel caso di checkCell positivo*/		
	},
checkCell:function(){
/*questo metodo deve chiedere al server se nella cella dell'utente non ci sia già tale segnalazione
in tal caso deve aggiornare il numero di segnalazioni di quell'evento senza inserire un nuovo marker sulla
mappa dell'utente*/
	
},
calcGrid:function(){
	//ottiene le coordinate sud-ovest e nord-est della mappa sul display
	var bounds=map.getBounds();
	// ottiene le coordinate degli angoli del display
	var cornerCoordinates= L.rectangle(bounds)._latlngs;
	//richiama metodo per il disegno della griglia
	vgrid.drawGrid(cornerCoordinates);
	
}






}