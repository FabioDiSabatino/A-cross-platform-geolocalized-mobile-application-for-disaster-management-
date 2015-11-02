
$(document).ready(function(event){
	var singleton=new Singleton();
	var widget=singleton.getInstance(Chome,"Chome");
	widget.init();
})

