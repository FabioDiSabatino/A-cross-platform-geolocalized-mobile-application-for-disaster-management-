var fdb={
	openDb:function(){
		
		
		
	},
	createDb:function(){
		
		var dbSize= 5* 1024 *1024;
		
		var db_handle= openDatabase("localDB", "", "Todo manager", dbSize, function() {
		    console.log('db successfully opened or created');
		});
		
	
		
		db_handle.transaction(function(tx)
		{
			tx.executeSql('CREATE TABLE event (code INTEGER,zero_lat INTEGER,zero_lng INTEGER,cell_lat NUMERIC,cell_lng NUMERIC, count INTEGER, time_last VARCHAR(20),PRIMARY KEY (code,zero_lat,zero_lng,cell_lat,cell_lng))');	
			tx.executeSql('CREATE TABLE person (id INTEGER PRIMARY KEY,name VARCHAR(20),zero_lat INTEGER,zero_lng INTEGER,cell_lat NUMERIC,cell_lng NUMERIC,status VARCHAR(20),last_update VARCHAR (20))');
		
		}
		);

		
	},
	savePosition:function(data)
	{
		
		var dbSize= 5* 1024 *1024;
		var db= openDatabase("localDB", "", "Todo manager", dbSize, function() {
		    console.log('db successfully opened or created');
		});
		db.transaction(function (tx) {
			
				tx.executeSql('INSERT INTO person VALUES(?,?,?,?,?,?,?,?)',[2,'Paola Carta',data.zero.lat,data.zero.lng,data.cell.cell_number_lat,data.cell.cell_number_lng,'ferito lieve','17/01/16 15.00']);
		});
		
	},
	saveEvent: function (data) {
		var dbSize= 5*1024*1024;
		
		var db= openDatabase("localDB", "", "Todo manager", dbSize, function() {
		    console.log('db successfully opened or created');
		});
		
		db.transaction(function (tx) {
			
				tx.executeSql('INSERT INTO event VALUES(?,?,?,?,?,?,?)',[]);
		});
		
	},
	
}