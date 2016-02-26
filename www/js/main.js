

var pageHandler= function(){
	
  var script = $(".content").attr('id');

  console.log(script);
	switch(script){
	case "dashboard":
		$.getScript("js/home.js");
	  break;
	case "comestai":
		$.getScript("js/comestai.js");
		break;
	case "segnala":
		$.getScript("js/segnala.js");
		break;
	case "pubblica-segnala":
		$.getScript("js/mappa-segnala.js");
		break;
	case "foi":
		$.getScript("js/foi.js");
		break;
	case "poi":
		$.getScript("js/poi.js");
		break;
	case "map-widget":
		$.getScript("js/map.js");
		
		break;
		
		
	}
  
	
	
  
};

