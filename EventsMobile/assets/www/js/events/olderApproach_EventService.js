// **************************************************************************************************
// ********************************** Event Singleton application ***********************************
// **************************************************************************************************
// creation of a singleton object (as advised in mobile javascript mobile development book)
// One of the ideas is to create a singleton object that will maintain application state.
// When we add html5 offline support all the caching mechanism will be placed in this object 
var EventService = function () { 

	
	return {
		init : function() {
			alert('EventService Init()');
			EventListApp.init();
			var url = AjaxEventHelper.getRootURL() + 'events'; 
	    	AjaxEventHelper.createGETRequestAjax(url, function(data){
	    		
	    		$.each(data, function(index, _event) {
	    			EventListApp.addEvent(_event);
	    		});
	        });
		},
		getLastSync: function(callback) {
	        this.db.transaction(
                function(tx) {
                    var sql = "SELECT MAX(lastModified) as lastSync FROM employee";
                    tx.executeSql(sql, this.txErrorHandler,
                        function(tx, results) {
                            var lastSync = results.rows.item(0).lastSync;
                            log('Last local timestamp is ' + lastSync);
                            callback(lastSync);
                        }
                    );
                }
            );
        }, 
		
		sync: function (callback) {
			console.log('Starting synchronization...');
			
		}
		
	}
}(); 

/*

getLastSync()
A method that returns a timestamp to be used as the query parameter for the next synchronization request. 
A common practice is to persist a timestamp after each synchronization request. But things can go wrong and the timestamp itself can get out-of-sync. 
I prefer to “recalculate” the lastSync timestamp before each synchronization request.
getLastSync: function(callback) {
    this.db.transaction(
        function(tx) {
            var sql = "SELECT MAX(lastModified) as lastSync FROM employee";
            tx.executeSql(sql, this.txErrorHandler,
                function(tx, results) {
                    var lastSync = results.rows.item(0).lastSync;
                    callback(lastSync);
                }
            );
        }
    );
}
getChanges()

This is a wrapper around an Ajax call to the server-side API that returns the items that have changed (created, updated, or deleted) since a specific moment in time defined in the modifiedSince parameter.
getChanges: function(syncURL, modifiedSince, callback) {
 
    $.ajax({
        url: syncURL,
        data: {modifiedSince: modifiedSince},
        dataType:"json",
        success:function (changes) {
            callback(changes);
        },
        error: function(model, response) {
            alert(response.responseText);
        }
    });
 
}
applyChanges()

A method that persists the changes in your local data store. Notice that SQLite supports a convenient “INSERT OR REPLACE” statement so that you don’t have to determine if you are dealing with a new or existing employee before persisting it.
applyChanges: function(employees, callback) {
    this.db.transaction(
        function(tx) {
            var l = employees.length;
            var sql =
                "INSERT OR REPLACE INTO employee (id, firstName, lastName, title, officePhone, deleted, lastModified) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";
            var e;
            for (var i = 0; i < l; i++) {
                e = employees[i];
                var params = [e.id, e.firstName, e.lastName, e.title, e.officePhone, e.deleted, e.lastModified];
                tx.executeSql(sql, params);
            }
        },
        this.txErrorHandler,
        function(tx) {
            callback();
        }
    );
}
Synchronization Logic

With these server and client APIs in place, you can choreograph a data synchronization process as follows:
sync: function(syncURL, callback) {
 
    var self = this;
    this.getLastSync(
    		function(lastSync){
    			self.getChanges(syncURL, lastSync, function (changes) {
    													self.applyChanges(changes, callback);
    												}
    		);
    	});
 
} */