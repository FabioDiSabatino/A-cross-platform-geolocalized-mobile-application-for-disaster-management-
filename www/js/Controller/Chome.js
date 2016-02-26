var chome={
mux:function(data){
	
	switch(data.task){
	case 'init' :
		cmap.initMap();
		
		break;
	case 'start':
		cmap.startLocate();
	
	}
	
	}
}