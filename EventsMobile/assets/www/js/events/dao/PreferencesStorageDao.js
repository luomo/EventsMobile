// **************************************************************************************************
// ********************************** Prefs DAO Singleton application *******************************
// **************************************************************************************************
// Creation of a LocalStorage DAO for data access operations on Prefss 
var PreferencesStorageDao = function () { 
	
	var PREFS_PREFIX = "pref_"
	
	
	function getPrefsId(prefsDbId) {
		prefsDbId.replace(PREFS_PREFIX, "");
		return prefsDbId;
	}


	
    function addOrUpdatePrefsToLocalDB(prefsId, prefs) {

    	console.log('PrefsDao:addOrUpdatePrefsToLocalDB: prefsId: ' + prefsId);
    	try {
    		window.localStorage.setItem(PREFS_PREFIX + prefsId, prefs); //saves to the database, "key", "value"
    	} catch (e) {
    		 if (e == QUOTA_EXCEEDED_ERR) {
    		 	 alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
    		}
    	}
    	  
    } 

    
    
    
    function deleteAllPrefss() {
    	
    	console.log('PrefsDao:deleteAllPrefss');
    	window.localStorage.clear();
    }


    function findPrefByIdInDatabase(prefsId, callback){
    	console.log('PrefsDao:findPrefByIdInDatabase');
    	var _prefsDB;
    	_prefsDB = window.localStorage.getItem(PREFS_PREFIX + prefsId);
    	
    	callback(_prefsDB);
    }


    
	function syncPrefsListToDatabase( prefs, callback ){
		console.log('PrefsDao:syncPrefsListToDatabase');
		var _prefDb; 
		for ( prefKey in prefs) {
	    	var _prefsJS, _prefsJson;
	    	_prefDb = window.localStorage.getItem(PREFS_PREFIX + prefKey);
	    	if(_prefDb == undefined)
	    		window.localStorage.setItem(PREFS_PREFIX + prefKey, prefs[prefKey]);
	    	else
	    		prefs[prefKey] = _prefDb;
		}
		
		callback(prefs);
	}
    
	return {
		init : function() {
			console.log('Init() PREFS Storage DAO');
			//deleteAllPrefss();
		},
		clear : function(){
			deleteAllPrefss();
		},
		addOrUpdatePref : function(prefsId, prefs){
			addOrUpdatePrefsToLocalDB(prefsId, prefs)
		},
		findPrefById : function(prefsId, callback) {
			findPrefByIdInDatabase(prefsId, callback);
		},
		findAll : function(date, callback){
			// to be coded
		}, 
		syncPrefsList : function (prefs, callback) {
			syncPrefsListToDatabase(prefs, callback);
		}
		
	}
}(); 
