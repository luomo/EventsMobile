// **************************************************************************************************
// ********************************** Event Singleton application ***********************************
// **************************************************************************************************
// creation of a singleton object (as advised in mobile javascript mobile development book)
// One of the ideas is to create a singleton object that will maintain application state.
// When we add html5 offline support all the caching mechanism will be placed in this object 
var EventService = function () { 
	
	
	var eventDao;
	var venueDao;
	var prefsDao;
	var userDao;
	
	function getChangesAndSyncToDB(syncURL, lastSyncDate, callback){
		// lastSyncDate will be used to pass the last date to the server
		// at this point is not beeing used
    	AjaxEventHelper.createGETRequestAjax(
    			syncURL,
    			function (data) {
		            	// if exists new data 
		        		if(data.length > 0) {
		        			// we have to update localDB
		        			var events = [];
		        			var venues = [];
		        			for(var i = 0; i< data.length ; i++) {
		        			//for(var _eventJson in data) {
		        				var _eventJson = data[i];
		        				var _event = Event.createEventJSObjectBasedOnJsonAjaxReq(_eventJson);
		        				events.push(_event);
		        				venues.push(_event.venue)
		        			}
		        			eventDao.syncEventList(
		        					events, 
		        					function () {
		        						venueDao.syncVenueList(
		        								venues,
		        								function() {
		        									eventDao.removeTransientEventList ( callback )			
		        								}
		        						)
		        					}
		        			);
		        		} 
				} 
    	);
	}

	function getVenueChanges(syncURL, lastSyncDate, callback){
		// lastSyncDate will be used to pass the last date to the server
		// at this point is not beeing used
		AjaxEventHelper.createGETRequestAjax(syncURL,callback);
	}
	
	
	// Public API
	return {
		init : function( argEventDao, argVenueDao, argPrefsDao, argUserDao ) {
			//alert("EventService: init ");
			console.log("EventService: init ");
			eventDao = argEventDao;
			venueDao = argVenueDao;
			prefsDao = argPrefsDao;
			userDao = argUserDao;
			
			eventDao.init();
			venueDao.init();
			prefsDao.init();
			
			eventDao.clear();
//			venueDao.clear();

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
			venueDao.clear();
		},
		createOrUpdateEvent : function (callback, eventJs) {
			console.log("EventService: createOrUpdateEvent ");
			var url = AjaxEventHelper.getRootURL() + 'events';
			var eventId = eventJs.id;
			// validate if event has a transient id
			// If so set de id to Null and try to create an event throw a POST request
			// If something goes wrong the id is setted again and persisted to localstorage 
			if(eventId < 0 )
				eventJs.id = null;
			var jsonDataToBePosted = JSON.stringify(eventJs);
			if(eventJs.id == undefined) {
				url = url + "/event";
				// POST a request to save an Event
				// args: - url 
				//       - callback success function to be executed when the ajax request delivers a response with OK status
				//       - json object request
				//       - callback error function to be executed when the ajax request isn't able to perform the creation request 
				AjaxEventHelper.createPOSTRequestAjax( url, 
													   function( eventJson ){
															var event = Event.createEventJSObjectBasedOnJsonAjaxReq(eventJson);
															eventDao.addOrUpdateEvent(event);						
															callback(eventJson);
														},
														jsonDataToBePosted, 
														function(){
															eventJs.setStatusToSyncNeeded();
															// if the earlier fetched id is null means we are creating a new event
															// so we have to add a transient id 
															if(eventId == null) { 
																eventDao.addTransientEvent(eventJs);
															} else {
																// if the id had a value it means that the insert operation was over
																// a event already persisted in the local database and so we have to 
																// re set it and update the event in the local db. When sync operation 
																// will be performed then it will sync it to the server if possible
																eventJs.id = eventId;
																eventDao.addOrUpdateEvent(eventJs);
															}
															callback(jsonDataToBePosted);
														});
			} else {
//				url = url + "/" + eventId;
				// if the earlier fetched id is not null it means we are updating a already server persisted event
				// So we need to update it throw a PUT request
				AjaxEventHelper.createPUTRequestAjax(
						url,
						function ( eventJson ){
							// if everything goes ok we update the event in local DB
							var event = Event.createEventJSObjectBasedOnJsonAjaxReq(eventJson);
							eventDao.addOrUpdateEvent(event);
							callback(eventJson);
						},
						jsonDataToBePosted, 
						function (){
							// if something goes wrong we have to update the event and make it set the to Sync flag to true/1 
							eventJs.setStatusToSyncNeeded();
							eventDao.addOrUpdateEvent(eventJs);
							callback();
						});
			}
		},
		deleteEventById : function(eventId, callback) {
			console.log("EventService: deleteEventById: " + eventId);
			var url = AjaxEventHelper.getRootURL() + 'events/'+ eventId;
			eventDao.findEventById(
					eventId, 
					function(_eventJs) {
						// set the status to 0 because the delete is a logical delete
						_eventJs.status = 0;
						// this is an already sync event
						// so we have to update
						if(eventId > 0) {
							AjaxEventHelper.createPUTRequestAjax(url,
									function ( data ){
										eventDao.addOrUpdateEvent(_eventJs);
										callback(data)
									}, 
									JSON.stringify(_eventJs), 
									function(){
										_eventJs.setStatusToSyncNeeded();
										eventDao.addOrUpdateEvent(_eventJs);
										callback();
									})
						} else {
							// this means that the event has never been sync so we can simply remove it from db
							eventDao.deleteEvent(eventId);
							callback();
						}	
					});

		},
		getLastSync: function(callback) {
			eventDao.getLastSyncDate(callback);
	    },
	    sync: function(callback) {
	    	var syncEventURL = AjaxEventHelper.getRootURL() + 'events';
	    	var syncVenueURL = AjaxEventHelper.getRootURL() + 'venue';
	        console.log('Starting synchronization...');
	        try {
	        	// get last sync date
		        this.getLastSync(
		        		function(lastSync){
		        			// after having lastSyncDate get all the Events to be sync ( new and updatedValues)
		        			eventDao.getTransientEventList( 
		        					function (eventJsonTransientList) {
		        						// if exist events to be sync
		        						// we POST a list of events to update
		        						if(eventJsonTransientList.length > 0) {
		        							AjaxEventHelper.createPOSTRequestAjax( 
		        									syncEventURL, 
			     								   	function( eventJsonList ){
		        										// so se devia remover depois de virem os event actualizados ??? tv
		        										// if everyting went well in sync process we can now remove them from local DB
//		        										eventDao.removeTransientEventList(
//		        												function () {
		        													// after removing them we fetch the already sync events from server
		        													// syncing events and venues to local DB
			        												getChangesAndSyncToDB(
			        			        									syncEventURL, 
			        			        									lastSync, 
			        			        									callback
			        					     						)
//		        												}
//		        										);
		        									}, 
		        									JSON.stringify(eventJsonTransientList));
		        						} else {
		        							// if there isn't anything to POST to the server we simply perform a GET request
		        							// and update them locally
		        							getChangesAndSyncToDB(
		        									syncEventURL, 
		        									lastSync, 
		        									callback
				     						);
		        						}
		        					});
		        		});
	        } catch (e) {
				// TODO: handle exception
	        	console.log(e);
	        	callback();
			}	
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
		}, 
		findNearbyEvents : function (successCallback, errorCallback) {
			if(navigator != undefined && navigator.geolocation != undefined) {
				navigator.geolocation.getCurrentPosition(
						function(position){
							var syncURL = AjaxEventHelper.getRootURL() + 'events/lat/' + position.coords.latitude + '/long/' + position.coords.longitude;
							AjaxEventHelper.createGETRequestAjax(
					    			syncURL,
					    			function (data) {
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
						        			successCallback(events);
						        		} 
					    			}
							)
						}, 
						errorCallback);
			} else {
				errorCallback;
			}
		},
		addEventAsFavouriteToUser : function (userId, eventId, callback) {
			var url = AjaxEventHelper.getRootURL() + 'users/favourites/add/user/1/event/' + eventId;
			var user;
//			eventDao.findEventById(eventId, function(_eventJS) {
				AjaxEventHelper.createPUTRequestAjax(
						url,
						function (  ){
							eventDao.addFavouriteEventToUser(userId, eventId, callback);
						}, 
						null
					);
//			 });
		},
		removeEventAsFavouriteFromUser : function (userId, eventId, callback) {
			var url = AjaxEventHelper.getRootURL() + 'users/favourites/remove/user/1/event/' + eventId;
//			eventDao.findEventById(eventId, function(_eventJS) {
				AjaxEventHelper.createPUTRequestAjax(
						url,
						function (  ){
							eventDao.removeFavouriteEventFromUser(userId, eventId, callback);
						}, 
						null
				);
//			});
		}, 
		validateIfEventIsFavourite : function(userId, eventId, callback) {
			eventDao.validateIfEventIsFavourite(userId, eventId, callback);
		},
		findFavouriteEvents : function(userId,  callback) {
			eventDao.findFavouriteEvents(userId, callback);
		}
	}
}(); 
