// **************************************************************************************************
// ********************************** Prefs DAO Singleton application *******************************
// **************************************************************************************************
// Creation of a DATABASE SqlLite DAO for data access operations on Prefss 
var PreferencesDbDao = function () { 
	
	var TABLE_NAME = 'PREFS_CACHE_DATA_DB';		
	var db;


	function openDB() {
		console.log("OpendDB");
		
	    db = window.openDatabase(TABLE_NAME, "1.0", "Cache DB", 2000000);
	    db.transaction(populateDB, txErrorHandler, successCB);
	    console.log(db);
	}
	
	function populateDB(tx) {
       // tx.executeSql('DROP TABLE IF EXISTS PREFS_CACHE_DATA_DB'); 
        tx.executeSql('CREATE TABLE IF NOT EXISTS PREFS_CACHE_DATA_DB ( id VARCHAR PRIMARY KEY, prefValue VARCHAR)');
        console.log("Database create and populated");
   }
	
	function successCB() {
		console.log("successCB");
		db.transaction(queryDB, txErrorHandler);
	}
	function txErrorHandler(tx, err) {
	    console.log("Error processing SQL: "+err + " txMessage: " + tx.message);
	    console.log(err);
	}
	
	function queryDB(tx) {
        tx.executeSql('SELECT * FROM PREFS_CACHE_DATA_DB', [], querySuccess, txErrorHandler);
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
	 	console.log("PREFS_CACHE_DATA_DB table: " + len + " rows found.");
	    for (var i=0; i<len; i++){
	    	var cacheItem = results.rows.item(i);
	    	console.log("Row = " + i + " ID = " + cacheItem.id + " + Data =  " + cacheItem.prefValue );
	    }
 	}
	
    function addOrUpdatePrefToLocalDB(prefsId, prefValue) {

    	var queryParameters = [prefsId, prefValue];
    	var sql = 'INSERT OR REPLACE INTO PREFS_CACHE_DATA_DB (id, prefValue) VALUES ( ? , ? )';
    	console.log("PrefsDao:addOrUpdatePrefToLocalDB - Sql: " + sql + " queryParameters: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
        
        db.transaction( 
        		function(tx) {
			        	tx.executeSql( sql, 
			        				   queryParameters, 
			        				   queryDB, 
			        				   txErrorHandler);
			        	console.log('Prefs inserted');
			        }, 
			        txErrorHandler);  
    } 

    
   
    
    
   


    function findPrefByIdInDatabase(prefsId, callback){
    	
    	var queryParameters = [prefsId];
    	var sql = "SELECT * FROM PREFS_CACHE_DATA_DB WHERE id = ?";
    	console.log("PrefsDao:findPrefByIdInDatabase - Sql: " + sql + " queryParameters: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
    	
    	db.transaction(
    			function (tx) {
    				tx.executeSql( sql , 
    							   queryParameters,  
    							   function (tx, results) {    					
				    					console.log("Returned rows = " + results.rows.length);
				    					var _prefsValue;
				    					if(results.rows.length > 0) {
					    					_prefsValue = results.rows.item(0).prefValue; 
				    					} 
				    					callback(_prefsValue);
    					
    				}, 
    				this.txErrorHandler);
    			}
    	)
    }

    
    function syncPrefsListToDatabase( prefs, callback ){
    	
    	
    	var queryParameters = [];
    	var sql = "SELECT * FROM PREFS_CACHE_DATA_DB ";
    	console.log("VenueDao:syncPrefsListToDatabase - Sql: " + sql + " queryParameters: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
    	var prefsDb = new Object();
    	db.transaction(
    		function (tx) {
    			tx.executeSql( sql ,
    						   queryParameters,  
    						   function (tx, results) {
					    		 		var len = results.rows.length;
					    		 		console.log("Returned rows = " + len);

					    		 		if(len > 0) {
						    		 		for( var i=0 ; i < len ; i++) {
						    		 			var prefIdDb = results.rows.item(i).id; 
						    		 			var prefValueDb = results.rows.item(i).prefValue;
						    		 			
						    		 			prefsDb[prefIdDb] = prefValueDb;
						    		 		} 
					    		 		} else {
					    		 			for( _prefKey in prefs) {
					    		 				addOrUpdatePrefToLocalDB(_prefKey, prefs[_prefKey]);
					    		 			}
					    		 			prefsDb = prefs;
					    		 		}

					    		 		callback(prefsDb);
				    			}, 
				    			this.txErrorHandler);
    		}
    	)
	}

	
	
	return {
		init : function() {
			console.log('Init() PREFS DAO');
			openDB();
		},
		clear : function(){
			deleteAllPrefs();
		},
		addOrUpdatePref : function(prefId, prefValue){
			addOrUpdatePrefToLocalDB(prefId, prefValue)
		},
		findPrefById : function(prefsId, callback) {
			findPrefByIdInDatabase(prefsId, callback);
		},
		findAll : function(date, callback){
			// to be implemented
		},
		syncPrefsList : function (prefs, callback) {
			syncPrefsListToDatabase(prefs, callback);
		}


		
	}
}(); 