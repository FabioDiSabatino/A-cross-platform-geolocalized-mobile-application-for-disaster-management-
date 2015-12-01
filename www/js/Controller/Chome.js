var chome={
init:function(){
	/** init gli object fondamentali **/
	
	deviceinfo=cdevice.getInfo();
	vmap.setMapContainer(deviceinfo);
	cconnection.checkConnection(3);
		
		cmap.initMap();
	
	/*setInterval(function(){
		cconnection.checkConnection(3);},10000);*/
		
	
	
	}
}