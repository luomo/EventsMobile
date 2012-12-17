// **************************************************************************************************
// ********************************** Prefs DAO Singleton application *******************************
// **************************************************************************************************
// Creation of a LocalStorage DAO for data access operations on Prefss 
var UserStorageDao = function () { 
	
	var USER_PREFIX = "user_"
	
	
	
	
	function addFavouriteEventToUserInDb( userId, eventId, callback){
		console.log('UserDao:addFavouriteEventToUserInDb');
		var userFavourites = window.localStorage.getItem(USER_PREFIX + userId);
		if(userFavourites == undefined) {
			var value = [eventId];
			window.localStorage.setItem(USER_PREFIX + userId, JSON.stringify(value));
		} else {
			var favList = JSON.parse(userFavourites);
			if(favList.indexOf(eventId) === -1 ) {
				favList.push(eventId);
				window.localStorage.setItem(USER_PREFIX + userId, JSON.stringify(favList));
			}
		}
		callback();
	}

	function removeFavouriteEventFromUserInDb( userId, eventId, callback){
		console.log('UserDao:removeFavouriteEventToUserInDb');
		var userFavourites = window.localStorage.getItem(USER_PREFIX + userId);
		if(userFavourites != undefined) {
			var favList = JSON.parse(userFavourites);
			favList.splice(favList.indexOf(eventId), 1);
			window.localStorage.setItem(USER_PREFIX + userId, JSON.stringify(favList));
		} 
		callback();
	}
	
	
	function validateIfEventIsFavouriteInDb( userId, eventId, callback){
		console.log('UserDao:validateIfEventIsFavouriteInDb');
		var userFavourites = window.localStorage.getItem(USER_PREFIX + userId);
		if(userFavourites != undefined) {
			var favList = JSON.parse(userFavourites);
			if(favList.indexOf(eventId) === -1 ) {
				callback(false);
			} else
				callback(true);
		} 
		
	}    
	return {
		init : function() {
			console.log('Init() User Storage DAO');
		},
		clear : function(){
			deleteAllPrefs();
		},
		addOrUpdatePref : function(prefsId, prefs){
			addOrUpdatePrefToLocalDB(prefsId, prefs)
		},
		findPrefById : function(prefsId, callback) {
			findPrefByIdInDatabase(prefsId, callback);
		},
		findAll : function(date, callback){
			// to be coded
		}, 
		addFavouriteEventToUser : function ( userId, eventId, callback){
			addFavouriteEventToUserInDb( userId, eventId, callback);
		},
		removeFavouriteEventFromUser : function ( userId, eventId, callback){
			removeFavouriteEventFromUserInDb( userId, eventId, callback);
		},
		validateIfEventIsFavourite : function ( userId, eventId, callback){
			validateIfEventIsFavouriteInDb( userId, eventId, callback);
		}
		
	}
}(); 
