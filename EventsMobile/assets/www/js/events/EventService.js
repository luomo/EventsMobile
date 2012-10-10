// **************************************************************************************************
// ********************************** Event Singleton application ***********************************
// **************************************************************************************************
// creation of a singleton object (as advised in mobile javascript mobile development book)
// One of the ideas is to create a singleton object that will maintain application state.
// When we add html5 offline support all the caching mechanism will be placed in this object 
var EventService = function () { 
	
	
	function getChanges(syncURL, lastSyncDate, callback){
		// lastSyncDate will be used to pass the last date to the server
		// at this point is not beeing used
    	AjaxEventHelper.createGETRequestAjax(syncURL,callback);
	}
	
	
	// Public API
	return {
		init : function() {
			alert('Init()');
			EventDbDao.init();
			EventService.sync(function(){
				console.log("nothing to update");
			})
		},
		clear : function(){
			
			EventDbDao.clear();
		},
		size : function(){
			return EventDbDao.size();
		},
		addEventToDB : function(eventJson){
			console.log("addEventToDB:jsObject: " + eventJson);
			var event = Event.createEventJSObjectBasedOnJsonAjaxReq(eventJson);
			EventDbDao.addOrUpdateEvent(event);			
		}, 
		createEvent : function (callback, jsonDataToBePosted) {
			var url = AjaxEventHelper.getRootURL() + 'events';
			AjaxEventHelper.createPOSTRequestAjax( url, 
												   function( data ){
														EventService.addEventToDB(data);
														callback(data);
													},
													jsonDataToBePosted); 
		},
		deleteEventById : function(eventId, callback) {
			var url = AjaxEventHelper.getRootURL() + 'events/'+ eventId;
			AjaxEventHelper.createDELETERequestAjax(url,
													function ( data ){
														EventDbDao.removeEvent(eventId);
														callback(data)
													})
		},
		removeEventById : function(eventId){
			console.log("removeEvent:id: " + eventId);
			EventDbDao.removeEvent(eventId);
		},
		getLastSync: function(callback) {
			EventDbDao.getLastSyncDate(callback);
	    },
	    sync: function(callback) {
	    	var syncURL = AjaxEventHelper.getRootURL() + 'events';
	        console.log('Starting synchronization...');
	        this.getLastSync(
	        		function(lastSync){
			            getChanges(syncURL, lastSync, function (data) {
			            	// if exists new data 
			        		if(data.length > 0) {
			        			// we have to update localDB
			        			var events = [];
			        			for(var i = 0; i< data.length ; i++) {
			        			//for(var _eventJson in data) {
			        				var _eventJson = data[i];
			        				var _event = Event.createEventJSObjectBasedOnJsonAjaxReq(_eventJson);
			        				events.push(_event);
			        			}
			        			EventDbDao.syncEventList(events, callback);
			        		} else {
			        			// if there are no changes we can apply the callback method 
			        			callback();
			        		}
			            });
	        });
	        		
	    },
	    findEventsByuserId : function (userId, callback){
	    	console.log("findEventsById: " + userId);
			EventDbDao.findEventsByuserId(userId, function(_eventJS) {
														callback(_eventJS);
													 });
	    },
		findEventById : function (eventId, callback){
			console.log("findEventById: " + eventId);
			EventDbDao.findEventById(eventId, function(_eventJS) {
														callback(_eventJS);
													 });
			
		}, 
		findEventforToday : function (date, callback){
			console.log("findEventforToday: " + date);
			EventDbDao.findEventforToday(date, 
					function(list) {
						var map = new Object();
						var _eventJson, _eventJS, city ;
						for(i=0;i < list.length; i++){
							_eventJson = list[i];
							_eventJS = Event.createEventJSObjectBasedOnJsonAjaxReq(jQuery.parseJSON(_eventJson));
							city = _eventJS.venue.location.city;
							if(map[city] == undefined ) {
								map[city] = new Array(); 
							} 
							map[city].push(_eventJS);
						}
						callback(map);
					}
			);
			
		}, 
	    // utility methods for displaying info in the gui
	    findAllEventsGroupedByCity : function(callback) {
			EventDbDao.findAll( new Date(),  
							    function(list){
									var map = new Object();
									var _eventJson, _eventJS, city ;
									for(i=0;i < list.length; i++){
										_eventJson = list[i];
										_eventJS = Event.createEventJSObjectBasedOnJsonAjaxReq(jQuery.parseJSON(_eventJson));
										city = _eventJS.venue.location.city;
										if(map[city] == undefined ) {
											map[city] = new Array(); 
										} 
										map[city].push(event);
									}
									callback(map);
								}
			);
		}
	}
}(); 