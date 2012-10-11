// **************************************************************************************************
// ********************************** Event DAO Singleton application *******************************
// **************************************************************************************************
// Creation of a LocalStorage DAO for data access operations on Events 
var EventStorageDao = function () { 
	
	function sameDay( d1, d2 ){
		  return d1.getUTCFullYear() == d2.getUTCFullYear() &&
		         d1.getUTCMonth() == d2.getUTCMonth() &&
		         d1.getUTCDate() == d2.getUTCDate();
	}



	function logEvent(event){
		return  "id: " + event.id + " ,startDate: " + event.startDat + " ,city: " + event.venue.location.city + " ,processDate: " +  event.processDate  + " ,owner: " +  event.owner
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

    	console.log('EventDao:addOrUpdateEventToLocalDB: eventId: ' + eventId);
    	try {
    		window.localStorage.setItem(eventId, JSON.stringify(event)); //saves to the database, "key", "value"
    	} catch (e) {
    		 if (e == QUOTA_EXCEEDED_ERR) {
    		 	 alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
    		}
    	}
    	  
    } 

    
    function syncEventsToLocalDB(eventList, callback) {
    	
    	console.log('EventDao:syncEventsToLocalDB');
    	var _event;
    	for(var i = 0; i < eventList.length ; i++) {
    		_event = eventList[i];
    		try {
    			window.localStorage.setItem(_event.id, JSON.stringify(_event));
    		} catch (e) {
    			if (e == QUOTA_EXCEEDED_ERR) {
    				alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
    			}	
    		}
    	}
    	console.log('Synchronization complete (' +  eventList.length + ' items synchronized)');
    	callback();
    }
    
    
    function deleteAllEvents() {
    	
    	console.log('EventDao:deleteAllEvents');
    	window.localStorage.clear();
    }


    function findEventByIdInDatabase(eventId, callback){
    	console.log('EventDao:findEventByIdInDatabase');
    	var _eventJS, _eventJson;
    	_eventJson = window.localStorage.getItem(eventId);
    	_eventJS = Event.createEventJSObjectBasedOnJsonAjaxReq(jQuery.parseJSON(_eventJson));
    	
    	callback(_eventJS);
    }

    
    function findAllEventsInDatabase(date, callback){

    	console.log("EventDao:findAllEvents");
    	
    	var eventsJson = [];
    	var _event, _eventId;
    	for (var i = 0; i < window.localStorage.length; i++){
    		_eventId = window.localStorage.key(i);
    		_event = window.localStorage.getItem(_eventId);
    		eventsJson.push(_event);
    	}
    	
    	callback(eventsJson);

    }

    function findEventforTodayInDatabase(date, callback){
    	

    	console.log("EventDao:findEventforTodayInDatabase");
    	
    	var eventsJson = [];
    	var _event,  _eventJS, _eventId;
    	for (var i = 0; i < window.localStorage.length; i++){
    		_eventId = window.localStorage.key(i);
    		_event = window.localStorage.getItem(_eventId);
    		_eventJS = JSON.parse(_event);
    		if (sameDay( new Date(_eventJS.startDate), new Date()))
    			eventsJson.push(_event);
    	}
    	
    	callback(eventsJson);
    	
    }

    function findEventsByCityInDatabase(cityId, callback){
    	

    	console.log("EventDao:findEventsByCityInDatabase");
    	
    	var eventsJson = [];
    	var _event,_eventJson,  _eventId;
    	for (var i = 0; i < window.localStorage.length; i++){
    		_eventId = window.localStorage.key(i);
    		_eventJson = window.localStorage.getItem(_eventId);
    		_event = JSON.parse(_eventJson);
    		if(_event.venue.location.city === cityId)
    			eventsJson.push(_eventJson);
    	}	
    	callback(eventsJson);
    }
   
    function findEventsByuserId(userId, callback){
    	
    	console.log("EventDao:findEventsByuserId");
    	
    	var eventsJson = [];
    	var _event, _eventJson, _eventId;
    	for (var i = 0; i < window.localStorage.length; i++){
    		_eventId = window.localStorage.key(i);
    		_eventJson = window.localStorage.getItem(_eventId);
    		_event = JSON.parse(_eventJson);
    		if(_event.owner === userId)
    			eventsJson.push(_event);
    	}	
    	callback(eventsJson);
 
    }
        
    function deleteEventFromLocalDB(eventId) {
    	console.log("EventDao:deleteEventFromLocalDB");
    	window.localStorage.removeItem(eventId);
    } 

	
	
	return {
		init : function() {
			alert('Init() EVENT Storage DAO');
			deleteAllEvents();
			
		},
		clear : function(){
			deleteAllEvents();
		},
		addOrUpdateEvent : function(event){
			addOrUpdateEventToLocalDB(event.id, event)
		}, 
		removeEvent : function(eventId){
			deleteEventFromLocalDB(eventId);
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
			callback(null);
		}
		
	}
}(); 