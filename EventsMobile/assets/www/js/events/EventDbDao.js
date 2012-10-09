// **************************************************************************************************
// ********************************** Event DAO Singleton application *******************************
// **************************************************************************************************
// Creation of a DATABASE SqlLite DAO for data access operations on Events 
var EventDbDao = function () { 
	
	var TABLE_NAME = 'EVENT_CACHE_DATA_DB';
	
	/*
	var createTableSql = 'CREATE TABLE IF NOT EXISTS EVENT_CACHE_DATA ( id INTEGER PRIMARY KEY, evJsonData VARCHAR)';
	var dropTableSql = 'DROP TABLE IF EXISTS EVENT_CACHE_DATA';
	var countEventsSql = 'SELECT COUNT(*) FROM EVENT_CACHE_DATA';
	
	var selectSql = 'SELECT * FROM EVENT_CACHE_DATA';
	var insertSql = 'INSERT INTO EVENT_CACHE_DATA ( id , evJsonData) VALUES ( ? , ? )'; 
	var deleteSql = 'DELETE FROM EVENT_CACHE_DATA';
	var deleteSqlById = 'DELETE FROM EVENT_CACHE_DATA WHERE id = ?';
	*/
		
	var db;


	function openDB() {
		console.log("OpendDB");
		
	    db = window.openDatabase(TABLE_NAME, "1.0", "Cache DB", 2000000);
	    db.transaction(populateDB, txErrorHandler, successCB);
	    console.log(db);
	}
	
	function populateDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS EVENT_CACHE_DATA');
        tx.executeSql('CREATE TABLE IF NOT EXISTS EVENT_CACHE_DATA ( id INTEGER PRIMARY KEY, startDate VARCHAR(50), evJsonData VARCHAR, lastModified VARCHAR(50), owner LONG)');
        console.log("Database create and populated");
   }
	
	function successCB() {
		console.log("successCB");
		db.transaction(queryDB, txErrorHandler);
	}
	function txErrorHandler(tx, err) {
		console.log(err);
	    console.log("Error processing SQL: "+err + " txMessage: " + tx.message);
	}
	
	function queryDB(tx) {
        tx.executeSql('SELECT * FROM EVENT_CACHE_DATA', [], querySuccess, txErrorHandler);
    }

	// Query the success callback
    //
    function querySuccess(tx, results) {
    	var len = results.rows.length;
	  	console.log("Returned rows = " + len);
	  	// this will be true since it was a select statement and so rowsAffected was 0
	 	if (!results.rowsAffected) {
	    	console.log('No rows affected!');
	    	return false;
	  	}
	 	console.log("EVENT_CACHE_DATA table: " + len + " rows found.");
	    for (var i=0; i<len; i++){
	    	var cacheItem = results.rows.item(i);
	    	console.log("Row = " + i + " ID = " + cacheItem.id + " startDate =  " + cacheItem.startDate + " + Data =  " + cacheItem + " LastModified =  " + cacheItem.lastModified + " owner: " + cacheItem.owner);
	    }
 	}
	
    function addOrUpdateEventToLocalDB(eventId, event) {

    	var eventSql = 'INSERT OR REPLACE INTO EVENT_CACHE_DATA ( id , startDate, evJsonData, lastModified, owner) VALUES ( ? , ? ,?, ?, ? )';
    	var queryParameters = [eventId, event.startDate, JSON.stringify(event), event.processDate, event.owner];
    	
    	console.log('Inserting or Updating Event in local database:');
    	console.log("queryParameters: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
        console.log("Insert Event Cache Sql: " + eventSql);
        
        db.transaction( function(tx) {        	
				        	tx.executeSql(eventSql, queryParameters, queryDB, txErrorHandler);
				        	console.log('data inserted');
				        }, 
				        txErrorHandler);  
    } 

    function deleteAllEvents() {
    	
    	
    	console.log('deleteAllEvents');
    	console.log("DELETE Event Cache Sql: " + deleteSql);
    	
    	db.transaction( function(tx) {        	
				    		tx.executeSql(eventSql, [], queryDB, txErrorHandler);
				    		console.log('data deleted');
			    		}, 
			    		txErrorHandler);  
    }


    function findEventByIdInDatabase(eventId, callback){
    	
    	var sql = "SELECT * FROM EVENT_CACHE_DATA WHERE id = ?";
    	var queryParameters = [eventId];
    	
    	console.log("findEventByIdInDatabase: Sql: " + sql);
    	console.log("findEventByIdInDatabase: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
    	db.transaction(
    			function (tx) {
    				tx.executeSql( sql , queryParameters,  function (tx, results) {
    					var events = [];    					
    					console.log("Returned rows = " + results.rows.length);
    					var _eventJson = results.rows.item(0).evJsonData; 
    					var _eventJS = Event.createEventJSObjectBasedOnJsonAjaxReq(jQuery.parseJSON(_eventJson));
    					callback(_eventJS);
    					
    				}, 
    				this.txErrorHandler);
    			}
    	)
    }

    
    function findAllEventsInDatabase(date, callback){
    	
    	var sql = "SELECT * FROM EVENT_CACHE_DATA";
    	console.log("findAllEvents: Sql: " + sql);
    	db.transaction(
    		function (tx) {
    			tx.executeSql( sql , [],  function (tx, results) {
							    		    	var events = [];
							    		 		var len = results.rows.length;
							    		 		console.log("Returned rows = " + len);
							    		 		var i = 0;
							    		 		for( i=0 ; i < len ; i++) {
							    		 			var eventJsonData = results.rows.item(i).evJsonData; 
							    		 			events[i] = eventJsonData;
							    		 		}
							    		 		console.log(len + ' rows found');
							    		 		callback(events);
							    		 		
						    			}, 
						    			this.txErrorHandler);
    		}
    	)
    }

    function findEventforTodayInDatabase(date, callback){
    	
    	var sql = 'SELECT * FROM EVENT_CACHE_DATA WHERE startDate BETWEEN DATE("now") AND DATE("now", "+1 day")';
    	var queryParameters = [];
    	
    	console.log("findEventByIdInDatabase: Sql: " + sql);
    	console.log("findEventByIdInDatabase: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
    	db.transaction(
    			function (tx) {
    				tx.executeSql( sql , queryParameters,  function (tx, results) {
							    					var events = [];    					
							    					var len = results.rows.length;
							    					var _eventJson ;
							    					console.log("Returned rows = " + len);
								    		 		for(var i=0 ; i < len ; i++) {
								    		 			_eventJson = results.rows.item(i).evJsonData; 
								    		 			events.push(_eventJson);
								    		 		} 
							    					callback(events);
							    					
							    				}, 
							    				this.txErrorHandler);
    			}
    	)
    }
   
    function findEventsByuserId(userId, callback){
    	
    	var sql = "SELECT * FROM EVENT_CACHE_DATA WHERE owner = ?";
    	var queryParameters = [userId];
    	
    	console.log("findEventsByuserId: Sql: " + sql);
    	console.log("findEventsByuserId: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
    	db.transaction(
    			function (tx) {
    				tx.executeSql( sql , queryParameters,  function (tx, results) {
    					var events = [];    					
    					var len = results.rows.length;
    					console.log("Returned rows = " + len);
	    		 		for(var i=0 ; i < len ; i++) {
	    		 			var _eventJson = results.rows.item(i).evJsonData; 
	    		 			events.push(Event.createEventJSObjectBasedOnJsonAjaxReq(jQuery.parseJSON(_eventJson)));
	    		 		} 
    					callback(events);
    				}, 
    				this.txErrorHandler);
    			}
    	)
    }
    
    

    function countAllEvents() {
    	
    	
    	console.log('countAllEvents');
		console.log("countA Event Cache Sql: " + countEventsSql);
		
		db.transaction( function(tx) {        	
			tx.executeSql(eventSql, [], function (tx, results) {
													 console.log("Returned rows = " + results.rows.length);
													  // this will be true since it was a select statement and so rowsAffected was 0
													  if (!results.rowsAffected) {
													    console.log('No rows affected!');
													    return 0;
													  } else
														  return results;
						  						  }, txErrorHandler);
						  console.log('data selected');
						}, 
						txErrorHandler);  
    }
    
    function deleteEventFromLocalDB(eventId) {
    	
    	var eventSql = 'DELETE FROM EVENT_CACHE_DATA WHERE id = ?';
    	var queryParameters = [eventId];
    	
    	console.log("queryParameters: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
    	console.log("DELETE Event Cache Sql: " + eventSql);
    	
    	db.transaction( function(tx) {        	
    		tx.executeSql(eventSql, queryParameters, queryDB, txErrorHandler);
    		console.log('data deleted');
    	}, txErrorHandler);  
    } 

	
	
	return {
		init : function() {
			alert('Init() EVENT DAO');
			openDB();
		},
		clear : function(){
			deleteAllEvents();
			
		},
		size : function(){
			return countAllEvents();
		},
		addOrUpdateEvent : function(event){
			addOrUpdateEventToLocalDB(event.id, event)
		}, 
		removeEvent : function(eventId){
			console.log("removeEvent:id: " + eventId);
			deleteEventFromLocalDB(eventId);
		},
		addOrUpdateEventList : function(eventList){
		
			for(var i = 0; i< eventList.length ; i++) {
				var _event = eventList[i];
				this.addOrUpdateEvent(_event);
			}
		},
		findEventById : function(eventId, callback) {
			findEventByIdInDatabase(eventId, callback);
		},
		findEventforToday : function(date, callback) {
			findEventforTodayInDatabase(date, callback);
		},
		findEventsByuserId : function(userId, callback) {
			findEventsByuserId(userId, callback);
		},
		findAll : function(date, callback){
			// I think the date should be passed for only retrieving events after date
			findAllEventsInDatabase(date, callback);
		},
		getLastSyncDate : function (callback) {
			db.transaction(
	            function(tx) {
	            	var sql = "SELECT MAX(lastModified) as lastSync FROM EVENT_CACHE_DATA";
	                tx.executeSql(sql, this.txErrorHandler, function(tx, results) {
                        var lastSync = results.rows.item(0).lastSync;
                        console.log('Last local timestamp is ' + lastSync);
                        return lastSync;
                    }
	            )}, txErrorHandler );
		}
		
	}
}(); 