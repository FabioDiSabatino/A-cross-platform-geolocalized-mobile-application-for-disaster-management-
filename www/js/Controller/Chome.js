var chome={
mux:function(data){
	
	switch(data.task){
	case 'init' :
		cmap.initMap();
		break;
	case 'start':
		cmap.startLocate();
	
	}
	
	
	
	
	
	/*cconnection.checkConnection(3);
	
	/*setInterval(function(){
		cconnection.checkConnection(5);},5000);*/
		
	
	
	}
}