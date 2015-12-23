/** Classe utilizzata per il recupero di informazioni sul dispositivo 
 * 	come dimensione, stato ect ...
 */

var cdevice={
info:{},
getInfo:function(){
	
	this.info={
			ratio:window.devicePixelRatio, //ancomment when build 
			height:screen.height,// /window.devicePixelRatio,
			width:screen.width,// /window.devicePixelRatio,
			platform:device.platform,
			orientation:window.orientation
			
	}
	return this.info;
   }
}


