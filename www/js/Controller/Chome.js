var Chome= function(){}

Chome.prototype.init=function(){
	/** init gli object fondamentali **/
	var singleton= new Singleton();
	var cmap= singleton.getInstance(Cmap,"Cmap");
	var vmap=singleton.getInstance(Vmap,"Vmap");
	var cdevice= singleton.getInstance(Cdevice,"Cdevice");
	
	deviceinfo=cdevice.getInfo();
	vmap.setMapContainer(deviceinfo);
	cmap.initMap();
	
	
}