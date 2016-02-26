var vhome={
mux:function(data)
{    
	
	 switch(data.task)
	 {
	   case 'init':
		
		vmap.initIcon();
		
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