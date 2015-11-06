/** Classe utilizzata per il recupero di informazioni sul dispositivo 
 * 	come dimensione, stato ect ...
 */

var Cdevice= function(){}

Cdevice.prototype.getInfo= function(){
	var info={
			ratio:window.devicePixelRatio,
			height:this.ratio*screen.height,
			width:this.ratio*screen.width
			
	}
	return info;
}

