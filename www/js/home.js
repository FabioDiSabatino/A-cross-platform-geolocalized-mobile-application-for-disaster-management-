
$("#comestai-button").on("tap",function(){
	$(".content").attr("id","comestai");
	$.mobile.changePage("comestai.html");
});

$("#poi").on("tap",function(){
	$(".content").attr("id","poi");
	$.mobile.changePage("poi.html");
});

$("#segnala-button").on("tap",function(){
	$(".content").attr("id","segnala");
	$.mobile.changePage("segnala.html");
});

$("#foi").on("tap",function(){
	$(".content").attr("id","foi");
	$.mobile.changePage("foi.html");
});
$("#map-widget").on("tap",function(){
	$(".content").attr("id","map-widget");
	$.mobile.changePage("map.html");
});

$(".content-notifica").on("tap",function(){
	$(".content").attr("id","foi");
	sortLatest(data);
	$.mobile.changePage("foi.html");
});



sortLatest= function(dati)
{
	var arr=dati.foi;
	var len = arr.length;
	arr.sort(function(a, b) {
	    return parseFloat(a.ora_stato) - parseFloat(b.ora_stato);
	});
	
	return arr;
}
	

	//chiamata a view per disegno delle schede
var data={
	foi:
	[
		{
			nome:"Papà",
			codice:"f1",
			stato:"slightly wounded",
			cod_emergency:1,
			ora_stato:"12.00 ",
			data_stato:"23/02",
			distanza:2,
			dispositivo: "power-off",
			ora_dispositivo:"21.30 15/02",
			position: {zero:{lat:42.36,lng:13.412},cell:{cell_number_lat:0,cell_number_lng:0}}
	  },
		{
			nome:"Claudia",
			codice:"f2",
			stato:"i'm fine",
			cod_emergency:0,
			ora_stato:"21.15",
			data_stato:"23/02",
			distanza:15,
			dispositivo: "power-on",
			ora_dispositivo:"21.30 15/02",
			position:{zero:{lat:42.35,lng:13.409},cell:{cell_number_lat:4,cell_number_lng:4}}
		},
		{
			nome:"Fabio",
			codice:"f3",
			stato:"trapped",
			cod_emergency:3,
			ora_stato:"17.06",
			data_stato:"23/02",
			distanza:18,
			dispositivo: "online",
			ora_dispositivo:"21.30 15/02",
			position:{zero:{lat:42.36,lng:13.410},cell:{cell_number_lat:3,cell_number_lng:3}}
		}
	]

};
(function(){

	
	$.when( $.ajax({
		type: 'POST',
		url : "notifica-foi.tmpl",
	})).done(function(template){
		var last=sortLatest(data);
		
		var html = Mustache.to_html(template,last[0]);
		$(".content-notifica.foi").append(html);
	  
	});
	
	
})();


var data2={
	poi:
	[
		{
			nome:"Home",
			foto:"p1",
			emergency:"Nothing",
			icon:"persone",
			number:"1",
			ora_stato:"12.39 15/02",
			distanza:32,
			position: {zero:{lat:42.36,lng:13.412},cell:{cell_number_lat:0,cell_number_lng:0}}
			
	  },
		{
			nome:"Mom's house",
			foto:"p2",
			emergency:"Injured person",
			icon:"ferita",
			number:"5",
			ora_stato:"12.39 15/02",
			distanza:4,
			position: {zero:{lat:42.36,lng:13.412},cell:{cell_number_lat:4,cell_number_lng:3}}
		},
		{
			nome:"Office",
			foto:"p3",
			emergency:"Collapsed building",
			icon:"edificiocrollato",
			number:"10",
			ora_stato:"12.39 15/02",
			distanza:21,
			position: {zero:{lat:42.36,lng:13.412},cell:{cell_number_lat:2,cell_number_lng:4}}
		}
	]

};


	


