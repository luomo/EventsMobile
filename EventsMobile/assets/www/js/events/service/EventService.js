// **************************************************************************************************
// ********************************** Event Singleton application ***********************************
// **************************************************************************************************
// creation of a singleton object (as advised in mobile javascript mobile development book)
// One of the ideas is to create a singleton object that will maintain application state.
// When we add html5 offline support all the caching mechanism will be placed in this object 
var EventService = function () { 
	
	
	var eventDao;
	var venueDao;
	
	function getEventChanges(syncURL, lastSyncDate, callback){
		// lastSyncDate will be used to pass the last date to the server
		// at this point is not beeing used
    	AjaxEventHelper.createGETRequestAjax(syncURL,callback);
	}

	function getVenueChanges(syncURL, lastSyncDate, callback){
		// lastSyncDate will be used to pass the last date to the server
		// at this point is not beeing used
		AjaxEventHelper.createGETRequestAjax(syncURL,callback);
	}
	
	
	// Public API
	return {
		init : function( argEventDao, argVenueDao, argPrefsDao ) {
			//alert("EventService: init ");
			console.log("EventService: init ");
			eventDao = argEventDao;
			venueDao = argVenueDao;
			prefsDao = argPrefsDao;
			
			eventDao.init();
			venueDao.init();
			prefsDao.init();
			
			prefsDao.findPrefById('sync', function( val ) {
				if( val === 'yes') {
					EventService.sync(function(){
						console.log("Sync completed");
					})
				} else
					console.log('Automatic sync disabled in preferences')
			});
			
		},
		clear : function(){
			console.log("EventService: clear ");
			eventDao.clear();
		},
		createEvent : function (callback, jsonDataToBePosted) {
			console.log("EventService: createEvent ");
			var url = AjaxEventHelper.getRootURL() + 'events';
			AjaxEventHelper.createPOSTRequestAjax( url, 
												   function( eventJson ){
														var event = Event.createEventJSObjectBasedOnJsonAjaxReq(eventJson);
														eventDao.addOrUpdateEvent(event);						
														callback(eventJson);
													},
													jsonDataToBePosted); 
		},
		deleteEventById : function(eventId, callback) {
			console.log("EventService: deleteEventById: " + eventId);
			var url = AjaxEventHelper.getRootURL() + 'events/'+ eventId;
			AjaxEventHelper.createPUTRequestAjax(url,
													function ( data ){
														eventDao.logicalDeleteEvent(eventId);
														callback(data)
													})
		},
		getLastSync: function(callback) {
			eventDao.getLastSyncDate(callback);
	    },
	    sync: function(callback) {
	    	var syncEventURL = AjaxEventHelper.getRootURL() + 'events';
	    	var syncVenueURL = AjaxEventHelper.getRootURL() + 'venue';
	        console.log('Starting synchronization...');
	        this.getLastSync(
	        		function(lastSync){
			            getEventChanges(syncEventURL, lastSync, function (data) {
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
			        			eventDao.syncEventList(events, callback);
			        		} 
			            });
			            getVenueChanges(syncVenueURL, lastSync, function (data) {
			            	// if exists new data 
			        		if(data.length > 0) {
			        			// we have to update localDB
			        			var venues = [];
			        			for(var i = 0; i< data.length ; i++) {
			        			//for(var _eventJson in data) {
			        				var _venueJson = data[i];
			        				//var _venue = JSON.parse(_venueJson);
			        				venues.push(_venueJson);
			        			}
			        			venueDao.syncVenueList(venues, callback);
			        		}
			        			
			            });
			            // if there are no changes we can apply the callback method 
			            callback();
			          
	        });
	        		
	    },
	    findEventsByuserId : function (userId, callback){
	    	console.log("EventService:findEventsById: " + userId);
			eventDao.findEventsByuserId(userId, function(_eventJS) {
														callback(_eventJS);
													 });
	    },
		findEventById : function (eventId, callback){
			console.log("EventService:findEventById: " + eventId);
			eventDao.findEventById(eventId, function(_eventJS) {
														callback(_eventJS);
													 });
			
		}, 
		findEventsforToday : function (date, callback){
			console.log("EventService:findEventsforToday: " + date);
			eventDao.findEventforToday(date, 
					function(list) {
						var map = new Object();
						var _eventJson, _eventJS, city ;
						var keys = new Array();
						for(i=0;i < list.length; i++){
							_eventJson = list[i];
							_eventJS = Event.createEventJSObjectBasedOnJsonAjaxReq(jQuery.parseJSON(_eventJson));
							city = _eventJS.venue.location.city;
							if(map[city] == undefined ) {
								keys.push(city);
								map[city] = new Array(); 
							} 
							map[city].push(_eventJS);
							keys.sort();
						}
						for(var key in map){
							map[key] = map[key].sort(Event.orderByTitleASC);
						}
						map['sortedKeys'] = keys;
						callback(map);
					}
			);
			
		}, 
	    // utility methods for displaying info in the gui
	    findAllEventsGroupedByCity : function(callback) {
	    	console.log("EventService:findAllEventsGroupedByCity");
			eventDao.findAll( new Date(),  
							    function(list){
									var map = new Object();
									var _eventJson, _eventJS, city ;
									var keys = new Array(); 
									for(i=0;i < list.length; i++){
										_eventJson = list[i];
										_eventJS = Event.createEventJSObjectBasedOnJsonAjaxReq(jQuery.parseJSON(_eventJson));
										city = _eventJS.venue.location.city;
										if(map[city] == undefined ) {
											keys.push(city);
											map[city] = new Array(); 
										} 
										map[city].push(_eventJS);
									}
									keys.sort();
									map['sortedKeys'] = keys;
									callback(map);
								}
			);
		}, 
		findEventsByCity : function(cityId, callback){
			console.log("EventService:findEventsByCity: " + cityId);
			eventDao.findEventsByCity( 
					cityId, 
					function(jsonEventList) {
						var jsEventList = new Array();
						var _eventJson, _eventJS;
						for(i=0;i < jsonEventList.length; i++){
							_eventJson = jsonEventList[i];
							_eventJS = Event.createEventJSObjectBasedOnJsonAjaxReq(jQuery.parseJSON(_eventJson));
							jsEventList.push(_eventJS);
						}
						jsEventList = jsEventList.sort(Event.orderByTitleASC);
						callback(jsEventList);
					}); 
					
		}, 
		findAllVenues : function (callback) {
			venueDao.findAll(
					new Date(),
					function(venueList) {
						var map = new Object();
						var _venueJS, city ;
						var keys = new Array(); 
						for(i=0;i < venueList.length; i++){
							_venueJS = venueList[i];
							city = _venueJS.location.city;
							if(map[city] == undefined ) {
								keys.push(city);
								map[city] = new Array(); 
							} 
							map[city].push(_venueJS);
						}
						keys.sort();
						map['sortedKeys'] = keys;
						callback(map);
					});
		},
		findVenueById : function (venueId, callback) {
			venueDao.findVenueById(venueId, callback);
		},
		syncPrefs : function (prefs, callback) {
			prefsDao.syncPrefsList(prefs, callback);
		},
		findPrefById : function (prefId, callback) {
			prefsDao.findPrefById(prefId, callback);
		},
		addOrUpdatePref : function (prefId, prefValue) {
			prefsDao.addOrUpdatePref(prefId, prefValue);
		}
	}
}(); 
