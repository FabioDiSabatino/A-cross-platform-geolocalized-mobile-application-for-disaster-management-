var vhome={
mux:function(data)
{    
	
	 switch(data.task)
	 {
	   case 'init':
		console.log("vhome init entered");
		vmap.initIcon();
		vmap.setMapContainer();
		break;
		
	  case 'getMarkerPosition' :
	 	return vmap.getMarkerPosition();
		break;
	  case 'addMarker':
		if(data.dati != undefined)
		{
			vmap.addMarker(data.dati);
		}
	 }
}
	
	
	
}