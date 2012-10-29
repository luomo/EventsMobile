// **************************************************************************************************
// ********************************** Venue DAO Singleton application *******************************
// **************************************************************************************************
// Creation of a LocalStorage DAO for data access operations on Venues 
var VenueStorageDao = function () { 
	
	var VENUE_PREFIX = "ve_"
	
	
	function getVenueId(venueDbId) {
		venueDbId.replace(VENUE_PREFIX, "");
		return venueDbId;
	}


	
    function addOrUpdateVenueToLocalDB(venueId, venue) {

    	console.log('VenueDao:addOrUpdateVenueToLocalDB: venueId: ' + venueId);
    	try {
    		window.localStorage.setItem(VENUE_PREFIX + venueId, JSON.stringify(venue)); //saves to the database, "key", "value"
    	} catch (e) {
    		 if (e == QUOTA_EXCEEDED_ERR) {
    		 	 alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
    		}
    	}
    	  
    } 

    
    function syncVenuesToLocalDB(venueList, callback) {
    	
    	console.log('VenueDao:syncVenuesToLocalDB');
    	var _venue;
    	for(var i = 0; i < venueList.length ; i++) {
    		_venue = venueList[i];
    		try {
    			window.localStorage.setItem(VENUE_PREFIX + _venue.id, JSON.stringify(_venue));
    		} catch (e) {
    			if (e == QUOTA_EXCEEDED_ERR) {
    				alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
    			}	
    		}
    	}
    	console.log('Synchronization complete (' +  venueList.length + ' items synchronized)');
    	callback();
    }
    
    
    function deleteAllVenues() {
    	
    	console.log('VenueDao:deleteAllVenues');
    	window.localStorage.clear();
    }


    function findVenueByIdInDatabase(venueId, callback){
    	console.log('VenueDao:findVenueByIdInDatabase');
    	var _venueJS, _venueJson;
    	_venueJson = window.localStorage.getItem(VENUE_PREFIX + venueId);
    	_venueJS = jQuery.parseJSON(_venueJson);
    	
    	callback(_venueJS);
    }
    
    
    function findAllVenuesInDatabase(date, callback) {
    	console.log("EventDao:findAllVenuesInDatabase");
    	    	
    	var processedVenues = [];
    	var venuesJs = [];
    	var _venue, _venueJS,  _venueId;
    	for (var i = 0; i < window.localStorage.length; i++){
    		_venueId = window.localStorage.key(i);
    		if(_venueId.match(VENUE_PREFIX) != null) {
	    		_venue = window.localStorage.getItem(_venueId);
	    		_venueJS = JSON.parse(_venue);
	    		// here we should validate if the venue owner is a user one
	    		if(jQuery.inArray( _venueJS.id, processedVenues ) == -1) {
	    			processedVenues.push(_venueJS.id);
	    			venuesJs.push(_venueJS);
	    		}
    		}
    			
    	}
    	
    	callback(venuesJs);
    }

         
    function deleteVenueFromLocalDB(venueId) {
    	console.log("VenueDao:deleteVenueFromLocalDB");
    	window.localStorage.removeItem(VENUE_PREFIX + venueId);
    } 

    
	
	return {
		init : function() {
			console.log('Init() VENUE Storage DAO');
			deleteAllVenues();
		},
		clear : function(){
			deleteAllVenues();
		},
		addOrUpdateVenue : function(venue){
			addOrUpdateVenueToLocalDB(venue.id, venue)
		},
		syncVenueList : function(venueList, callback){
			syncVenuesToLocalDB(venueList, callback);
		},
		findVenueById : function(venueId, callback) {
			findVenueByIdInDatabase(venueId, callback);
		},
		findAll : function(date, callback){
			// I think the date should be passed for only retrieving venues after date
			findAllVenuesInDatabase(date, callback);
		},
		getLastSyncDate : function (callback) {
			callback(null);
		}
		
	}
}(); 
