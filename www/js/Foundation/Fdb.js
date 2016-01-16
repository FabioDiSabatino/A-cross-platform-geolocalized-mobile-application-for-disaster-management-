var fdb={
	openDb:function(){
		
		
		
	},
	createDb:function(){
		var dbSize= 5* 1024 *1024;
		
		var db_handle= openDatabase("gridDb", "", "Todo manager", dbSize, function() {
		    console.log('db successfully opened or created');
		});
		
		db_handle.transaction(function(tx){
		   
			tx.executeSql('CREATE TABLE IF NOT EXISTS grid_zero (zero_lat INTEGER, zero_lng INTEGER, PRIMARY KEY(zero_lat,zero_lng))')
		});

		
	},
	savePosition:function(cell)
	{
		var dbSize= 5* 1024 *1024;
		var db= openDatabase("gridDb", "", "Todo manager", dbSize, function() {
		    console.log('db successfully opened or created');
		});
		db.transaction(function (tx) {
		    tx.executeSql('INSERT INTO grid_zero (zero_lat,zero_lng) VALUES (?,?)',[cell.zero.lat,cell.zero.lng]);
		});
		
	},
	deleteDb: function () {
		
	
		
	},
	
}