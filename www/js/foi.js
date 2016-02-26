sortSeriousness=function( dati){
	//riordino dati in ordine decrescente di emergenza
	var arr=dati.foi;
	var len = arr.length;
	arr.sort(function(a, b) {
	    return parseFloat(b.cod_emergency) - parseFloat(a.cod_emergency);
	});
	return arr;
}
sortNearest= function(dati)
{
	var arr=dati.foi;
	var len = arr.length;
	arr.sort(function(a, b) {
	    return parseFloat(a.distanza) - parseFloat(b.distanza);
	});
	return arr;
}
	
	




$("#back-from-foi").on("tap",function(){
	$(".content").attr("id","dashboard");
	cmap.stopMap();
	$.mobile.changePage("index.html");
});


(function(){

	

	$.when( $.ajax({
		type: 'POST',
		url : "scheda-foi.tmpl",
	})).done(function(template){
		
		for (var x in data.foi)
		{ 
			var html = Mustache.to_html(template, data.foi[x]);
		$(".content-foi").append(html);
	  }
	});
	
	
})();
$(".latest").on("tap",function(){
	//riordino schede o centra mappa in base al più vicino
	
	var text=$(".titolo-filtri").text();
	if(text =="Order by:")
	{ //mi trovo nella schermata a lista
	$.when( $.ajax({
		type: 'POST',
		url : "scheda-foi.tmpl",
	})).done(function(template){
		data.foi=sortLatest(data);
		$(".foi-list").remove();
		for (var x in data.foi)
		{ 
			var html = Mustache.to_html(template, data.foi[x]);
			
		$(".content-foi").append(html);
	  }
	});

   }
	 else {//mi trovo nella schermata a mappa
	 	
	 }
 	$(".check-latest").addClass("active");
	$(".check-nearest").removeClass("active");
 	$(".check-seriousness").removeClass("active"); 
});

$(".seriousness").on("tap",function(){
	// riordino schede o centra la mappa in base alla gravità
	
	var text=$(".titolo-filtri").text();
	if(text =="Order by:")
	{
		$.when( $.ajax({
			type: 'POST',
			url : "scheda-foi.tmpl",
		})).done(function(template){
			data.foi=sortSeriousness(data);
			$(".foi-list").remove();
			for (var x in data.foi)
			{ 
				var html = Mustache.to_html(template, data.foi[x]);
			
			$(".content-foi").append(html);
		  }
		});
		
	}
	else
	{
		
	}
	$(".check-nearest").removeClass("active");
	$(".check-latest").removeClass("active");
	$(".check-seriousness").addClass("active");

	
});

$(".nearest").on("tap",function(){
	//riordino schede o centra mappa in base al più vicino
	
	var text=$(".titolo-filtri").text();
	if(text =="Order by:")
	{ //mi trovo nella schermata a lista
	$.when( $.ajax({
		type: 'POST',
		url : "scheda-foi.tmpl",
	})).done(function(template){
		data.foi=sortNearest(data);
		$(".foi-list").remove();
		for (var x in data.foi)
		{ 
			var html = Mustache.to_html(template, data.foi[x]);
			
		$(".content-foi").append(html);
	  }
	});

   }
	 else {//mi trovo nella schermata a mappa
	 	
	 }
 	$(".check-nearest").addClass("active");
	$(".check-latest").removeClass("active");
 	$(".check-seriousness").removeClass("active"); 
});

$(".mappa-foi").on("tap",function(){
	$.when( $.ajax({
		type: 'POST',
		url : "mappa-foi.html",
	})).done(function(template){
		
		$(".foi-list").remove();
		$(".content-foi").append(template);
	
				//fhome.mux({task:'init'});
				chome.mux({task:'init'});
		    //vhome.mux({task:'init'});
	

	  
	});
	$(".titolo-filtri").text("Center view on:")
	//centra la view della mappa in base al filtro selezionato precedente
	if($("check-nearest").hasClass("active"))
	{
		//centra in base sul più vicino
	}
	else{
		//centra sul più grave
	}
	
})

$(".lista-foi").on("tap",function(){
	
	$.when( $.ajax({
		type: 'POST',
		url : "scheda-foi.tmpl",
	})).done(function(template){
		
		$(".map-foi").remove();
		if($(".check-nearest").hasClass("active"))
		{
			//ordina in base al più vicino
			
				data.foi=sortNearest(data);
		}
		else{
			//ordina al più grave
			
				data.foi=sortSeriousness(data);
		}
		cmap.stopMap();
		for (var x in data.foi)
		{ 
			var html = Mustache.to_html(template, data.foi[x]);
		
		$(".content-foi").append(html);
	  }
	});
	$(".titolo-filtri").text("Order by:")
	//ordina la lista in base al filtro selezionato precedente
	
})




 
	
