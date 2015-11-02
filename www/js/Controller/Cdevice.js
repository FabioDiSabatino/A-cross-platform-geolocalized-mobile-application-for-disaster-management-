/** Classe utilizzata per il recupero di informazioni sul dispositivo 
 * 	come dimensione, stato ect ...
 */

var Cdevice= function(){}

Cdevice.prototype.getInfo= function(){
	var info={
			height:screen.height,
			width:screen.width
	}
	return info;
}

