// **************************************************************************************************
// ********************************** Event DAO Singleton application *******************************
// **************************************************************************************************
// Creation of a DATABASE SqlLite DAO for data access operations on Events 
var EventDbDao = function () { 
	
	var TABLE_NAME = 'EVENT_CACHE_DATA_DB';
	
	/*
	var createTableSql = 'CREATE TABLE IF NOT EXISTS EVENT_CACHE_DATA ( id INTEGER PRIMARY KEY, evJsonDate VARCHAR)';
	var dropTableSql = 'DROP TABLE IF EXISTS EVENT_CACHE_DATA';
	var countEventsSql = 'SELECT COUNT(*) FROM EVENT_CACHE_DATA';
	
	var selectSql = 'SELECT * FROM EVENT_CACHE_DATA';
	var insertSql = 'INSERT INTO EVENT_CACHE_DATA ( id , evJsonDate) VALUES ( ? , ? )'; 
	var deleteSql = 'DELETE FROM EVENT_CACHE_DATA';
	var deleteSqlById = 'DELETE FROM EVENT_CACHE_DATA WHERE id = ?';
	*/
		
	var db;


	function openDB() {
		console.log("OpendDB");
		
	    db = window.openDatabase(TABLE_NAME, "1.0", "Cache DB", 2000000);
	    db.transaction(populateDB, errorCB, successCB);
	    console.log(db);
	}
	
	function queryDB(tx) {
        tx.executeSql('SELECT * FROM EVENT_CACHE_DATA', [], querySuccess, errorCB);
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
	    	var eventJson = results.rows.item(i);
	    	console.log("Row = " + i + " ID = " + eventJson.id + " Data =  " + eventJson + " LastModified =  " + eventJson.lastModified );
	    }
 	}
	
    function addEventToLocalDB(eventId, event) {

    	var eventSql = 'INSERT OR REPLACE INTO EVENT_CACHE_DATA ( id , evJsonDate, lastModified) VALUES ( ? , ?, ? )';
    	var valuesInArray = [eventId, JSON.stringify(event), event.processDate];
    	
    	console.log("valuesInArray: cnt: "+ valuesInArray.length + " value: " + valuesInArray.toString());
        console.log("Insert Event Cache Sql: " + eventSql);
        
        db.transaction( function(tx) {        	
				        	tx.executeSql(eventSql, valuesInArray, queryDB, errorCB);
				        	console.log('data inserted');
				        }, 
				        errorCB);  
    } 

    function deleteAllEvents() {
    	
    	
    	console.log('deleteAllEvents');
    	console.log("DELETE Event Cache Sql: " + deleteSql);
    	
    	db.transaction( function(tx) {        	
				    		tx.executeSql(eventSql, [], queryDB, errorCB);
				    		console.log('data deleted');
			    		}, 
			    		errorCB);  
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
						  						  }, errorCB);
						  console.log('data selected');
						}, 
						errorCB);  
    }
    
    function deleteEventFromLocalDB(eventId) {
    	
    	var eventSql = 'DELETE FROM EVENT_CACHE_DATA WHERE id = ?';
    	var valuesInArray = [eventId];
    	
    	console.log("valuesInArray: cnt: "+ valuesInArray.length + " value: " + valuesInArray.toString());
    	console.log("DELETE Event Cache Sql: " + eventSql);
    	
    	db.transaction( function(tx) {        	
    		tx.executeSql(eventSql, valuesInArray, queryDB, errorCB);
    		console.log('data deleted');
    	}, errorCB);  
    } 

    function updateEventFromLocalDB(event) {
    	
    	var eventSql = 'UPDATE EVENT_CACHE_DATA SET evJsonDate = ?  WHERE id = ?';
    	var valuesInArray = [event, event.id, e.processDate];
    	
    	console.log("valuesInArray: cnt: "+ valuesInArray.length + " value: " + valuesInArray.toString());
    	console.log("UPDATE Event Cache Sql: " + eventSql);
    	
    	db.transaction( function(tx) {        	
    		tx.executeSql(eventSql, valuesInArray, queryDB, errorCB);
    		console.log('data deleted');
    	}, errorCB);  
    } 
    
    
	function populateDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS EVENT_CACHE_DATA');
        tx.executeSql('CREATE TABLE IF NOT EXISTS EVENT_CACHE_DATA ( id INTEGER PRIMARY KEY, evJsonDate VARCHAR, lastModified VARCHAR(50))');
        console.log("Database create and populated");
   }
	
	function successCB() {
		console.log("successCB");
		db.transaction(queryDB, errorCB);
	}
	function errorCB(tx, err) {
		console.log(err);
	    console.log("Error processing SQL: "+err);
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
		addEvent : function(event){
			addEventToLocalDB(event.id, event)
		}, 
		removeEvent : function(eventId){
			console.log("removeEvent:id: " + eventId);
			deleteEventFromLocalDB(eventId);
		}/*, 
		updateEvent : function(event){
			console.log("updateEvent:id: " + eventId);
			updateEventFromLocalDB(event);
		}, 
		,
		findEventsInEventList : function (eventId){
			console.log("findEventsInEventList: " + eventId);
			//This should be replaced by cache mechanisms ... until then :)
			for(i=0;i < list.length; i++){
		  		var event = list[i];
		  		if(event && event.id === eventId) 
		  			return event;
			};
		}, 
		findEventsInEventListByCity : function (cityId) {
			console.log("findEventsInEventListByCity: " + cityId);
			//This should be replaced by cache mechanisms ... until then :)
			var eventsByCity = new Array();
			var event;
			for(i=0;i < list.length; i++){
				event = list[i];
		  		if(event && event.venue.location.city === cityId)
		  			eventsByCity.push(event);
			}
			return eventsByCity;
		} */
	}
}(); 