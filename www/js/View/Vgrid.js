var vgrid={
	drawCell:function(coordinates){
		
    L.circleMarker(coordinates,{radius:5,color:'red'}).addTo(map);
		var bounds=[L.latLng(coordinates.lat-0.0001,coordinates.lng-0.0001),L.latLng(coordinates.lat+0.0001,coordinates.lng+0.0001)];
		L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);
		
			
	},
	drawGrid:function(zero){
		
	}
	
	
	
	
	
	
}