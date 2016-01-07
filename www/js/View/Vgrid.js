var vgrid={
	drawGrid:function(coordinates){
		console.log("drawGrid entered");
		//disegna la griglia se e solo se lo zoom è maggiore uguale di 15
		var zoom=map.getZoom();
		if(zoom >16)
		{   
		    var y0= coordinates[0].lat;
			var x0=coordinates[0].lng;
		    var y1=coordinates[1].lat;
			var x1=coordinates[1].lng;
		    var y2=coordinates[2].lat;
			var x2=coordinates[2].lng;
			var y3=coordinates[3].lat;
		    var x3=coordinates[3].lng;
			
			
			
			
			
			for(var i=y0;i<=y1;i=i+0.0001)
			{
				var row=[L.latLng(i,x0),L.latLng(i,x3)];
				L.polyline(row,{weight:2}).addTo(map);
			}
			
			for(var z=x0;z<=x3;z=z+0.0001)
			{
				var column=[L.latLng(y0,z),L.latLng(y1,z)];
				L.polyline(column,{weight:2,color:'red'}).addTo(map);
			}
			
			
			
				
			
				
				
			
		}
		else
		{
			alert("attenzione non riesco a disegnare la griglia, aumenta lo zoom e riprova grazie.");
		}
		
	}
	
	
	
	
	
	
}