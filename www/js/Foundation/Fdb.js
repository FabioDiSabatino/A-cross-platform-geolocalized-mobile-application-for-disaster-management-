var fdb={
	createDb:function(){
		var dbSize = 5 * 1024 * 1024; // 5MB

		var db = openDatabase("PrimaryDb", "", "Todo manager", dbSize, function() {
		    console.log('db successfully opened or created');
		});

		db.transaction(function (tx) {
		    tx.executeSql("CREATE TABLE IF NOT EXISTS todo(ID INTEGER PRIMARY KEY ASC, todo TEXT, added_on TEXT)",
		        [], onSuccess, onError);
		    tx.executeSql("INSERT INTO todo(todo, added_on) VALUES (?,?)", ['my todo item', new Date().toUTCString()], onSuccess, onError);
		});

		function onSuccess(transaction, resultSet) {
		    console.log('Query completed: ' + JSON.stringify(resultSet));
		}

		function onError(transaction, error) {
		    console.log('Query failed: ' + error.message);
		}
	}
}