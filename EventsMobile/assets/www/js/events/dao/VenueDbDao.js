// **************************************************************************************************
// ********************************** Venue DAO Singleton application *******************************
// **************************************************************************************************
// Creation of a DATABASE SqlLite DAO for data access operations on Venues 
var VenueDbDao = function () { 
	
	var TABLE_NAME = 'VENUE_CACHE_DATA_DB';
	
	/*
	var createTableSql = 'CREATE TABLE IF NOT EXISTS VENUE_CACHE_DATA_DB ( id INTEGER PRIMARY KEY, veJsonData VARCHAR)';
	var dropTableSql = 'DROP TABLE IF EXISTS VENUE_CACHE_DATA_DB';
	var countVenuesSql = 'SELECT COUNT(*) FROM VENUE_CACHE_DATA_DB';
	
	var selectSql = 'SELECT * FROM VENUE_CACHE_DATA_DB';
	var insertSql = 'INSERT INTO VENUE_CACHE_DATA_DB ( id , veJsonData) VALUES ( ? , ? )'; 
	var deleteSql = 'DELETE FROM VENUE_CACHE_DATA_DB';
	var deleteSqlById = 'DELETE FROM VENUE_CACHE_DATA_DB WHERE id = ?';
	*/
		
	var db;


	function openDB() {
		console.log("OpendDB");
		
	    db = window.openDatabase(TABLE_NAME, "1.0", "Cache DB", 2000000);
	    db.transaction(populateDB, txErrorHandler, successCB);
	    console.log(db);
	}
	
	function populateDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS VENUE_CACHE_DATA_DB');
        tx.executeSql('CREATE TABLE IF NOT EXISTS VENUE_CACHE_DATA_DB ( id INTEGER PRIMARY KEY, veJsonData VARCHAR, lastModified VARCHAR(50), owner LONG)');
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
        tx.executeSql('SELECT * FROM VENUE_CACHE_DATA_DB', [], querySuccess, txErrorHandler);
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
	 	console.log("VENUE_CACHE_DATA_DB table: " + len + " rows found.");
	    for (var i=0; i<len; i++){
	    	var cacheItem = results.rows.item(i);
	    	console.log("Row = " + i + " ID = " + cacheItem.id + " + Data =  " + cacheItem + " LastModified =  " + cacheItem.lastModified + " owner: " + cacheItem.owner);
	    }
 	}
	
    function addOrUpdateVenueToLocalDB(venueId, venue) {

    	var queryParameters = [venueId, JSON.stringify(venue), new Date(), -1];
    	var sql = 'INSERT OR REPLACE INTO VENUE_CACHE_DATA_DB ( id , veJsonData, lastModified, owner) VALUES ( ? , ? , ?, ? )';
    	console.log("VenueDao:addOrUpdateVenueToLocalDB - Sql: " + sql + " queryParameters: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
        
        db.transaction( 
        		function(tx) {
			        	tx.executeSql( sql, 
			        				   queryParameters, 
			        				   queryDB, 
			        				   txErrorHandler);
			        	console.log('Venue inserted');
			        }, 
			        txErrorHandler);  
    } 

    
    function syncVenuesToLocalDB(venueList, callback) {
    	var sql = 'INSERT OR REPLACE INTO VENUE_CACHE_DATA_DB ( id , veJsonData, lastModified, owner) VALUES ( ? , ? , ?, ? )';
    	console.log('VenueDao:syncVenuesToLocalDB');
    	
    	db.transaction(
                function(tx) {
                    var venue, queryParameters;
                    for (var i = 0; i < venueList.length; i++) {
                        venue = venueList[i];
                        queryParameters = [venue.id, JSON.stringify(venue), new Date(), -1];
                        tx.executeSql(sql, queryParameters);
                        console.log("VenueDao:syncVenuesToLocalDB - Sql: " + sql + " Venue: " + venue.id );
                    }
                    console.log('Synchronization complete (' +  venueList.length + ' items synchronized)');
                },
                this.txErrorHandler,
                function(tx) {
                    callback();
                }
            );
    }
    
    
    function deleteAllVenues() {
    	
    	var queryParameters = [];
    	var sql = "DELETE FROM VENUE_CACHE_DATA_DB";
    	console.log("VenueDao:deleteAllVenues - Sql: " + sql + " queryParameters: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
    	
    	db.transaction( 
    			function(tx) {        	
		    		tx.executeSql(sql, 
		    					  queryParameters, 
		    					  queryDB, 
		    					  txErrorHandler);
		    		console.log('Venues deleted');
	    		}, 
	    		txErrorHandler
	    );  
    }


    function findVenueByIdInDatabase(venueId, callback){
    	
    	var queryParameters = [venueId];
    	var sql = "SELECT * FROM VENUE_CACHE_DATA_DB WHERE id = ?";
    	console.log("VenueDao:findVenueByIdInDatabase - Sql: " + sql + " queryParameters: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
    	
    	db.transaction(
    			function (tx) {
    				tx.executeSql( sql , 
    							   queryParameters,  
    							   function (tx, results) {
				    					var venues = [];    					
				    					console.log("Returned rows = " + results.rows.length);
				    					var _venueJson = results.rows.item(0).veJsonData; 
				    					var _venueJS = JSON.parse(_venueJson);
				    					callback(_venueJS);
    					
    				}, 
    				this.txErrorHandler);
    			}
    	)
    }

    
    function findAllVenuesInDatabase(date, callback){

    	var queryParameters = [];
    	var sql = "SELECT * FROM VENUE_CACHE_DATA_DB ";
    	console.log("VenueDao:findAllVenues - Sql: " + sql + " queryParameters: nbr parameters: "+ queryParameters.length + " value: " + queryParameters.toString());
    	
    	db.transaction(
    		function (tx) {
    			tx.executeSql( sql ,
    						   queryParameters,  
    						   function (tx, results) {
					    		    	var venues = [];
					    		 		var len = results.rows.length;
					    		 		console.log("Returned rows = " + len);
					    		 		var i = 0;
					    		 		for( i=0 ; i < len ; i++) {
					    		 			var venueJsonData = results.rows.item(i).veJsonData; 
					    		 			venues.push(JSON.parse(venueJsonData));
					    		 		}
					    		 		console.log(len + ' rows found');
					    		 		callback(venues);
					    		 		
				    			}, 
				    			this.txErrorHandler);
    		}
    	)
    }

   

	
	
	return {
		init : function() {
			console.log('Init() VENUE DAO');
			openDB();
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
		findVenueByuserId : function(userId, callback) {
			findVenueByuserId(userId, callback);
		},
		findAll : function(date, callback){
			// I think the date should be passed for only retrieving venues after date
			findAllVenuesInDatabase(date, callback);
		},
		getLastSyncDate : function (callback) {
			db.transaction(
	            function(tx) {
	            	var sql = "SELECT MAX(lastModified) as lastSync FROM VENUE_CACHE_DATA_DB";
	            	console.log("getLastSyncDate: Sql: " + sql);
	                tx.executeSql(sql, this.txErrorHandler, function(tx, results) {
                        var lastSync = results.rows.item(0).lastSync;
                        console.log('Last local timestamp is ' + lastSync);
                        callback(lastSync);
                    }
	            )}, txErrorHandler );
		}


		
	}
}(); 