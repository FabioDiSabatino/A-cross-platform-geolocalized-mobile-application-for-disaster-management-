sortNumber=function( dati2){
	//riordino dati2 in ordine decrescente di emergenza
	var arr=dati2.poi;
	var len = arr.length;
	arr.sort(function(a, b) {
	    return parseFloat(b.number) - parseFloat(a.number);
	});
	return arr;
}
sortNearest= function(dati2)
{
	var arr=dati2.poi;
	var len = arr.length;
	arr.sort(function(a, b) {
	    return parseFloat(a.distanza) - parseFloat(b.distanza);
	});
	return arr;
}
	
	
	//chiamata a view per disegno delle schede




$("#back-from-poi").on("tap",function(){
	$(".content").attr("id","dashboard");
	$.mobile.changePage("index.html");
});


(function(){

	

	$.when( $.ajax({
		type: 'POST',
		url : "scheda-poi.tmpl",
	})).done(function(template){
		data2.poi=sortNearest(data2);
		for (var x in data2.poi)
		{ 
			var html = Mustache.to_html(template, data2.poi[x]);
		$(".content-poi").append(html);
	  }
	});
	
	
})();

$(".number").on("tap",function(){
	// riordino schede o centra la mappa in base al numero di segnalazioni
	
	var text=$(".titolo-filtri").text();
	if(text =="Order by:")
	{
		$.when( $.ajax({
			type: 'POST',
			url : "scheda-poi.tmpl",
		})).done(function(template){
			data2.poi=sortNumber(data2);
			$(".poi-list").remove();
			for (var x in data2.poi)
			{ 
				var html = Mustache.to_html(template, data2.poi[x]);
			
			$(".content-poi").append(html);
		  }
		});
		
	}
	else
	{
		
	}
	$(".check-nearest").removeClass("active");
	$(".check-number").addClass("active");

	
});

$(".nearest").on("tap",function(){
	//riordino schede o centra mappa in base al più vicino
	
	var text=$(".titolo-filtri").text();
	if(text =="Order by:")
	{ //mi trovo nella schermata a lista
	$.when( $.ajax({
		type: 'POST',
		url : "scheda-poi.tmpl",
	})).done(function(template){
		data2.poi=sortNearest(data2);
		$(".poi-list").remove();
		for (var x in data2.poi)
		{ 
			var html = Mustache.to_html(template, data2.poi[x]);
			
		$(".content-poi").append(html);
	  }
	});

   }
	 else {//mi trovo nella schermata a mappa
	 	
	 }
 	$(".check-nearest").addClass("active");
 	$(".check-number").removeClass("active"); 
});

$(".mappa-poi").on("tap",function(){
	$.when( $.ajax({
		type: 'POST',
		url : "mappa-foi.html",
	})).done(function(template){
		
		$(".poi-list").remove();
		$(".content-poi").append(template);
	  
	});
	$(".titolo-filtri").text("Center view on:")
	//centra la view della mappa in base al filtro selezionato precedente
	if($("check-nearest").hasClass("active"))
	{
		//centra  sul più vicino
	}
	else{
		//centra sul più grave
	}
	
})

$(".lista-poi").on("tap",function(){
	$.when( $.ajax({
		type: 'POST',
		url : "scheda-poi.tmpl",
	})).done(function(template){
		
		$(".map-foi").remove();
		if($(".check-nearest").hasClass("active"))
		{
			//ordina in base al più vicino
			console.log("ciao");
				data2.poi=sortNearest(data2);
		}
		else{
			//ordina al più grave
			
				data2.poi=sortNumber(data2);
		}
		for (var x in data2.poi)
		{ 
			var html = Mustache.to_html(template, data2.poi[x]);
			
		$(".content-poi").append(html);
	  }
	});
	$(".titolo-filtri").text("Order by:")
	//ordina la lista in base al filtro selezionato precedente
	
})



 
 
	
