var chome={
init:function(){
	/** init gli object fondamentali **/
	
	deviceinfo=cdevice.getInfo();
	vmap.setMapContainer(deviceinfo);
	cmap.initMap();
	}
}