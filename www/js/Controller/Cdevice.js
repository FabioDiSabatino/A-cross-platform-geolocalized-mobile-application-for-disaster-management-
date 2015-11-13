/** Classe utilizzata per il recupero di informazioni sul dispositivo 
 * 	come dimensione, stato ect ...
 */

var Cdevice= function(){}

Cdevice.prototype.getInfo= function(){
	var info={
			ratio:1, //ancomment when build 
			height:screen.height,// /window.devicePixelRatio,
			width:screen.width// /window.devicePixelRatio
			
	}
	return info;
}

