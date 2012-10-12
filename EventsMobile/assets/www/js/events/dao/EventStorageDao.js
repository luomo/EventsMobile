// **************************************************************************************************
// ********************************** Event DAO Singleton application *******************************
// **************************************************************************************************
// Creation of a LocalStorage DAO for data access operations on Events 
var EventStorageDao = function () { 
	
	var EVENT_PREFIX = "ev_"
	
	function sameDay( d1, d2 ){
		  return d1.getUTCFullYear() == d2.getUTCFullYear() &&
		         d1.getUTCMonth() == d2.getUTCMonth() &&
		         d1.getUTCDate() == d2.getUTCDate();
	}
	
	function getEventId(eventDbId) {
		eventDbId.replace(EVENT_PREFIX, "");
		return eventDbId;
	}



	function logEvent(event){
		return  "id: " + event.id + " ,startDate: " + event.startDat + " ,city: " + event.venue.location.city + " ,processDate: " +  event.processDate  + " ,owner: " +  event.owner
	}

	
    function addOrUpdateEventToLocalDB(eventId, event) {

    	console.log('EventDao:addOrUpdateEventToLocalDB: eventId: ' + eventId);
    	try {
    		window.localStorage.setItem(EVENT_PREFIX + eventId, JSON.stringify(event)); //saves to the database, "key", "value"
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
    			window.localStorage.setItem(EVENT_PREFIX + _event.id, JSON.stringify(_event));
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
    	_eventJson = window.localStorage.getItem(EVENT_PREFIX + eventId);
    	_eventJS = jQuery.parseJSON(_eventJson);
    	
    	callback(_eventJS);
    }

    
    function findAllEventsInDatabase(date, callback){

    	console.log("EventDao:findAllEvents");
    	
    	var eventsJson = [];
    	var _event, _eventJS,  _eventId;
    	for (var i = 0; i < window.localStorage.length; i++){
    		_eventId = window.localStorage.key(i);
    		_event = window.localStorage.getItem(_eventId);
    		_eventJS = JSON.parse(_event);
    		if(_eventJS.status != 0)
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
    		if(_eventJS.status != 0)
	    		if (sameDay( new Date(_eventJS.startDate), new Date()))
	    			eventsJson.push(_event);
    	}
    	
    	callback(eventsJson);
    	
    }

    function findEventsByCityInDatabase(cityId, callback){
    	

    	console.log("EventDao:findEventsByCityInDatabase");
    	
    	var eventsJson = [];
    	var _eventJS,_eventJson,  _eventId;
    	for (var i = 0; i < window.localStorage.length; i++){
    		_eventId = window.localStorage.key(i);
    		_eventJson = window.localStorage.getItem(_eventId);
    		_eventJS = JSON.parse(_eventJson);
    		if(_eventJS.status != 0)
	    		if(_eventJS.venue.location.city === cityId)
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
    		if(_event.status != 0 && _event.owner === userId)
	    		eventsJson.push(_event);
    	}	
    	callback(eventsJson);
 
    }
       
    function deleteEventFromLocalDB(eventId) {
    	console.log("EventDao:deleteEventFromLocalDB");
    	window.localStorage.removeItem(EVENT_PREFIX + eventId);
    } 
    
    function logicalDeleteEventFromLocalDB(eventId) {
    	console.log("EventDao:logicalDeleteEventFromLocalDB");
    	var _jsonEvent = window.localStorage.getItem(EVENT_PREFIX + eventId);
    	var _eventJS = JSON.parse(_jsonEvent);
    	_eventJS.status = 0;
    	window.localStorage.setItem(EVENT_PREFIX + eventId, JSON.stringify(_eventJS));
    } 

    
	
	return {
		init : function() {
			console.log('Init() EVENT Storage DAO');
			//deleteAllEvents();
			
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
			callback(null);
		}
		
	}
}(); 