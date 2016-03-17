var chome={
mux:function(data){
	
	switch(data.task){
	case 'init' :
		cmap.initMap();
		break;
	case 'start':
		cmap.startLocate();
		break;
	case 'stopMap':
		cmap.stopMap();
		break;
	case 'centerView':
		var target=cgrid.coordFromCell(data.pack);
		cmap.centerView(target);
		break;
	case 'taphold':
		cmap.tapHold();
		break;
	}
	
	}
}