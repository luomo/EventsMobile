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
        tx.executeSql('CREATE TABLE IF NOT EXISTS EVENT_CACHE_DATA ( id INTEGER PRIMARY KEY, startDate VARCHAR(50), city VARCHAR(50), status INTEGER, evJsonData VARCHAR, lastModified VARCHAR(50), owner LONG)');
        console.log("Database create and populated");
   }
	
	function successCB() {
		console.log("successCB");
		db.transaction(queryDB, txErrorHandler);
	}
	function txErrorHandler(tx, err) {
	    console.log("Error processing SQL: "+err + " txMessage: " + tx.message);
	    console.log(err);
	}
	
	function queryDB(tx) {
        tx.executeSql('SELECT * FROM EVENT_CACHE_DATA', [], querySuccess, txErrorHandler);
    }

	function logEvent(event){
		return  "id: " + event.id + " ,startDate: " + event.startDat + " ,city: " + event.venue.location.city + " ,status: " +  event.status  + " ,processDate: " +  event.processDate  + " ,owner: " +  event.owner
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

    	var queryParameters = [eventId, event.startDate, event.venue.location.city, event.status, JSON.stringify(event), event.processDate, event.owner];
    	var sql = 'INSERT OR REPLACE INTO EVENT_CACHE_DATA ( id , startDate, city, status, evJsonData, lastModified, owner) VALUES ( ? , ? , ?, ?, ?, ?, ? )';
    	console.log("EventDao:addOrUpdateEventToLocalDB - Sql: " + sql + " queryParameters: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
        
        db.transaction( 
        		function(tx) {
			        	tx.executeSql( sql, 
			        				   queryParameters, 
			        				   queryDB, 
			        				   txErrorHandler);
			        	console.log('Event inserted');
			        }, 
			        txErrorHandler);  
    } 

    
    function syncEventsToLocalDB(eventList, callback) {
    	var sql = 'INSERT OR REPLACE INTO EVENT_CACHE_DATA ( id , startDate, city, status, evJsonData, lastModified, owner) VALUES ( ? , ? , ? , ?, ?, ? , ?)';
    	console.log('EventDao:syncEventsToLocalDB');
    	
    	db.transaction(
                function(tx) {
                    var event, queryParameters;
                    for (var i = 0; i < eventList.length; i++) {
                        event = eventList[i];
                        queryParameters = [event.id, event.startDate, event.venue.location.city ,  event.status , JSON.stringify(event), event.processDate, event.owner];
                        tx.executeSql(sql, queryParameters);
                        console.log("EventDao:syncEventsToLocalDB - Sql: " + sql + " Event: " + logEvent(event));
                    }
                    console.log('Synchronization complete (' +  eventList.length + ' items synchronized)');
                },
                this.txErrorHandler,
                function(tx) {
                    callback();
                }
            );
    }
    
    
    function deleteAllEvents() {
    	
    	var queryParameters = [];
    	var sql = "DELETE FROM EVENT_CACHE_DATA";
    	console.log("EventDao:deleteAllEvents - Sql: " + sql + " queryParameters: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
    	
    	db.transaction( 
    			function(tx) {        	
		    		tx.executeSql(sql, 
		    					  queryParameters, 
		    					  queryDB, 
		    					  txErrorHandler);
		    		console.log('Events deleted');
	    		}, 
	    		txErrorHandler
	    );  
    }


    function findEventByIdInDatabase(eventId, callback){
    	
    	var queryParameters = [eventId];
    	var sql = "SELECT * FROM EVENT_CACHE_DATA WHERE id = ?";
    	console.log("EventDao:findEventByIdInDatabase - Sql: " + sql + " queryParameters: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
    	
    	db.transaction(
    			function (tx) {
    				tx.executeSql( sql , 
    							   queryParameters,  
    							   function (tx, results) {
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

    	var queryParameters = [];
    	var sql = "SELECT * FROM EVENT_CACHE_DATA WHERE status = 1";
    	console.log("EventDao:findAllEvents - Sql: " + sql + " queryParameters: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
    	
    	db.transaction(
    		function (tx) {
    			tx.executeSql( sql ,
    						   queryParameters,  
    						   function (tx, results) {
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
    	
    	var queryParameters = [];
    	var sql = 'SELECT * FROM EVENT_CACHE_DATA WHERE startDate BETWEEN DATE("now") AND DATE("now", "+1 day") AND status = 1';
    	console.log("EventDao:findEventforTodayInDatabase - Sql: " + sql + " queryParameters: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());

    	db.transaction(
    			function (tx) {
    				tx.executeSql( sql , 
    							   queryParameters,  
    							   function (tx, results) {
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

    function findEventsByCityInDatabase(cityId, callback){
    	
    	var queryParameters = [cityId];
    	var sql = 'SELECT * FROM EVENT_CACHE_DATA WHERE city = ? AND status = 1';
    	console.log("EventDao:findEventsByCityInDatabase - Sql: " + sql + " queryParameters: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
    	
    	db.transaction(
    			function (tx) {
    				tx.executeSql( sql , 
		    					   queryParameters,  
		    					   function (tx, results) {
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
    	var queryParameters = [userId];
    	var sql = "SELECT * FROM EVENT_CACHE_DATA WHERE owner = ? AND status = 1";
    	console.log("EventDao:findEventsByuserId - Sql: " + sql + " queryParameters: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
    	
    	db.transaction(
    			function (tx) {
    				tx.executeSql( sql , 
    							   queryParameters,  
    							   function (tx, results) {
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
        
    function deleteEventFromLocalDB(eventId) {
    	var queryParameters = [eventId];
    	var sql = 'DELETE FROM EVENT_CACHE_DATA WHERE id = ?';
    	console.log("EventDao:deleteEventFromLocalDB - Sql: " + sql + " queryParameters: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
    	
    	db.transaction( 
    			function(tx) {        	
		    		tx.executeSql( sql, 
		    					   queryParameters, 
		    					   queryDB, 
		    					   txErrorHandler);
		    		console.log('event deleted');
		    	}, txErrorHandler);  
    } 

    function logicalDeleteEventFromLocalDB(eventId) {
    	var queryParameters = [eventId];
    	var sql = 'UPDATE EVENT_CACHE_DATA SET status = 0 WHERE id = ?';
    	console.log("EventDao:logicalDeleteEventFromLocalDB - Sql: " + sql + " queryParameters: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
    	
    	db.transaction( 
    			function(tx) {        	
    				tx.executeSql( sql, 
    						queryParameters, 
    						queryDB, 
    						txErrorHandler);
    				console.log('event deleted');
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
		addOrUpdateEvent : function(event){
			addOrUpdateEventToLocalDB(event.id, event)
		}, 
		logicalDeleteEvent : function(eventId){
			logicalDeleteEventFromLocalDB(eventId);
		},
		syncEventList : function(eventList, callback){
			syncEventsToLocalDB(eventList, callback);
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
		findEventsByCity : function(cityId, callback){
			findEventsByCityInDatabase(cityId, callback);
		},
		getLastSyncDate : function (callback) {
			db.transaction(
	            function(tx) {
	            	var sql = "SELECT MAX(lastModified) as lastSync FROM EVENT_CACHE_DATA";
	            	console.log("getLastSyncDate: Sql: " + sql);
	                tx.executeSql(sql, this.txErrorHandler, function(tx, results) {
                        var lastSync = results.rows.item(0).lastSync;
                        console.log('Last local timestamp is ' + lastSync);
                        callback(lastSync);
                    }
	            )}, txErrorHandler );
		}
		
	}
}(); 