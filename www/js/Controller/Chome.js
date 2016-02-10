var chome={
mux:function(data){
	
	switch(data.task){
	case 'init' :
		cmap.initMap();
		cdati.init();
		break;
	case 'start':
		cmap.startLocate();
	
	}
	
	}
}