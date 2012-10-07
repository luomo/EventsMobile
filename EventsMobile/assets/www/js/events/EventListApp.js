// **************************************************************************************************
// ********************************** Event Singleton application ***********************************
// **************************************************************************************************
// creation of a singleton object (as advised in mobile javascript mobile development book)
// One of the ideas is to create a singleton object that will maintain application state.
// When we add html5 offline support all the caching mechanism will be placed in this object 
var EventListApp = function () { 
	var list;
	
	
	var db;
	var dbCreated = false;
	var isConnected = true;
	// Cordova is ready
	// Initializing Phonegap
	function onDeviceReady() {
		if (navigator.network.connection.type != Connection.NONE) {
			//alert('isConnected');
			isConnected = true;
		} else {
			alert('Not Connected');
			isConnected = false;
		}
		console.log("Phonegap is ready");
		//navigator.notification.alert("Phonegap is ready native");
		
	    db = window.openDatabase("EVENT_CACHE_DATA_DB", "1.0", "Cache DB", 2000000);
	    /*
	    if (dbCreated)
	    	db.transaction(getEmployees, transaction_error);
	    else*/
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
	    	console.log("Row = " + i + " ID = " + eventJson.id + " Data =  " + eventJson.evJsonDate);
	    }
 	}
	
    function addEventToLocalDB(eventId, eventJson) {

    	var eventSql = 'INSERT INTO EVENT_CACHE_DATA ( id , evJsonDate) VALUES ( ? , ? )';
    	var valuesInArray = [eventId, eventJson];
    	
    	console.log("valuesInArray: cnt: "+ valuesInArray.length + " value: " + valuesInArray.toString());
        console.log("Insert Event Cache Sql: " + eventSql);
        
        db.transaction( function(tx) {        	
        	tx.executeSql(eventSql, valuesInArray, queryDB, errorCB);
        	console.log('data inserted');
        }, errorCB);  
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
    
    
	function populateDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS EVENT_CACHE_DATA');
        tx.executeSql('CREATE TABLE IF NOT EXISTS EVENT_CACHE_DATA ( id INTEGER PRIMARY KEY, evJsonDate VARCHAR)');
        console.log("Database create and populated");
   }
	
	function successCB() {
		dbCreated = true;
		console.log("successCB");
		db.transaction(queryDB, errorCB);
	}
	function errorCB(tx, err) {
	    console.log("Error processing SQL: "+err);
	}
	
	
	function contains(eventId) {
		for(i=0;i < list.length; i++){
	  		var event = list[i];
	  		if(event && event.id === eventId) 
	  			return true;
		};
		return false;
	}
	
	function populateListFromDB() {
		
	}
	
	function findEventIndex(eventId){
		var index = -1;
		for(i=0;i < list.length; i++){
	  		var event = list[i];
			if(event.id == eventId) {
				return i;
			}
		}
		return index;
	} 
	
	return {
		init : function() {
			alert('Init()');
			list = new Array();
			// Initializing Phonegap
			onDeviceReady();
		},
		isConnected : function(){
			return isConnected;
		},
		clear : function(){
			list = [];
		},
		size : function(){
			return list.length;
		},
		addEvent : function(eventJson){
			// NOTE: it shouldn't be like this because if the same event has been edited we would stay with the previous version (depends on how the server  
			//       backend will treat new events on batch .. I think its always better to remove previous ones)
			console.log("addEvent:jsonObject: " + eventJson);
			var event = Event.createEventJSObjectBasedOnJsonAjaxReq(eventJson);
			console.log("addEvent:jsObject: " + event);
			if(!contains(event.id)) {
				addEventToLocalDB(event.id, JSON.stringify(event));
				list.push(event);
			}
			
		}, 
		removeEvent : function(eventId){
			console.log("removeEvent:id: " + eventId);
			var eventIdx = findEventIndex(eventId);
			if (eventIdx !== -1) {
				list.splice(eventIdx, 1);
				deleteEventFromLocalDB(eventId);
			}
			
		},
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
		}
	}
}(); // for what I read what makes it singleton are these last '()' !?!?? strange .. ah