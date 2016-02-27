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
	  case 'addMe':
		vmap.addMarker(data.pack);
		break;
	  case 'addFoi':
		vmap.addFoi(data.pack);
		break;
   case 'addPoi':
	 vmap.addPoi(data.pack);
	break;
	  case 'stopLocate':
		 vmap.first=true;
		 vmap.centerMe=true;
		break;
	 case 'noCenterMe':
		vmap.centerMe=false;
    }
	
	}
	
}