var fdb={
	createDb:function(){
		var dbSize = 5 * 1024 * 1024; // 5MB

		var db = openDatabase("PrimaryDb", "", "Todo manager", dbSize, function() {
		    console.log('db successfully opened or created');
		});

		
	}
}