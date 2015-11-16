document.addEventListener("deviceready",function(){
		
	$(document).ready(function(){
		var singleton=new Singleton();
	
		var widget=singleton.getInstance(Chome,"Chome");
		widget.init();
	})
	
	}, false)


