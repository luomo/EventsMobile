// *************************************************************************
// ************************ Start of jQuery code ***************************
// *************************************************************************

$(function(){
	
	//createOrUpdatePrefs();

	$('ul li a img ').live("click tap", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		//alert("x");
		var src = $(this).attr("src");
		if(src == "images/star_empty.png") {
			$(this).attr("src", "images/star.png");
			$(this).parent().find('.favourite').html("<b>Added to favourites</b>");
		} else {
			$(this).attr("src", "images/star_empty.png");
			$(this).parent().find('.favourite').html("");
		}
	});
	
	$('#sync').change(function(event){
		var val = $('#sync').val();
		console.log("Sync pref value was update. New value is " + val);
		EventService.addOrUpdatePref("sync", val)
	})

	// ************************************
	// ********* Initiaizing Code *********
	// ************************************
	// initialize our application singleton
	//EventListApp.init();
	// ************************************	
	
	
	// ************************************
	// ****** Validation Form Code ********	
	// ************************************
	
	// Validation configuration for createEventForm
    $("#createEventForm").validate({
	    // 1. prepare the validation rules and messages.
        rules : {
    		evTitle: {  
               	required: true,
               	minlength: 2
            }, 
            vnName: {
            	required: true
            },
            evPrice: {
            	number: true,
            },
            vnLocCountry: {
            	required: true
            },
            vnLocCity: {
            	required: true
	        },
	        vnLocStreet: {
	        	required: true
	        }
        },
        messages : {
        	evTitle: {
                required: "Event Title is required",
                minlength: "Event Title needs to be at least length 2"
            },
        	vnName: {
            	required: "Venue Title is required"
            },
            evPrice: {
            	number: "Price has to be a number value"
            },
            vnLocCountry: {
            	required: "Venue Country is required"
            },
            vnLocCity: {
            	required: "Venue city is required"
	        },
	        vnLocStreet: {
	        	required: "Venue street is required"
	        }
        },
     	/*
		errorPlacement: function(error, element) {
			alert("error: " + error);
		},*/
		// specifying a submitHandler prevents the default submit
		submitHandler: function() {

			console.log("submitted!");
			EventService.createOrUpdateEvent(
					function(data){
						//$("#createEventPage").dialog('close');
						//$.mobile.changePage("#byUserSearchPage");
						$.mobile.changePage("#byUserSearchPage", {
				            changeHash: false
				        });
					}, 
					createEventJsRegisterRequest())
		}, 
		// set this class to error-labels to indicate valid fields
		success: function(label) {
			label.html("&nbsp;").addClass("checked");
			}
 
	    });
	
    
    // ****************************************
	// ****** Event configuration  Code *******	
	// ****************************************
	
	
	// try to sinalize in the console some events that are fired --- see 181 pro jquery mobile
    /*
	$( "#home" ).live( " pagebeforechange pagebeforeload pagebeforecreate pagecreate", function(e, data){
		console.log("Page events are being fired..." + e +  " "+data);
	});
	*/

	// try to create a splashScreen while a app loads
	setTimeout(hideSplash, 500);
	function hideSplash() {
	  $.mobile.changePage("#home", "fade");
	}
	

	
	$( "#loginBtn", $.mobile.activePage).click(function() {
		var url = AjaxEventHelper.getRootURL() + 'users';
		AjaxEventHelper.createPOSTRequestAjax(
				url, 
				function(data){
					$('#consoleLoginPage', $.mobile.activePage).append("dfsdfsd").append(data);
				}, 
				createUserInfoRequest());
				
	});

    
	// ****************************************
	// ********** Main function  Code *********	
	// ****************************************
    // Listen for any attempts to call changePage().
    $(document).bind( "pagebeforechange", function(e, data) {
    	// We only want to handle changePage() calls where the caller is
    	// asking us to load a page by URL.
    	if (typeof data.toPage === "string") {
    		// We only want to handle a subset of URLs.
    		var u = $.mobile.path.parseUrl(data.toPage);
    		
    		var byLocUrl = /^#byLocationSearchPage/;
    		var userUrl = /^#byUserSearchPage/;
    		var delUrl = /^#deleteEventDialogPage/;
    		var byNameUrl = /^#byNameSearchPage/;
    		var byDateUrl = /^#byDateSearchPage/;
    		var searchVenueUrl = /^#searchVenueDialogPage/;
    		var eventByCityUrl = /^#eventsByCityPage/;
    		var eventDetailsUrl = /^#eventDetails/;
    		var prefUrl = /^#settings/;
    		var createEventPag = /^#createEventPage/;
    		var nearbyEventsUrl = /^#nearbySearchPage/;
    		var eventMapUrl = /^#page-map/;
    		var eventMapDirectionsUrl = /^#page-dir/;
    		
    		
    		if (u.hash.search(delUrl) !== -1) {
    			// Display URL delete confirmation dialog box.
    			openDeleteEventConfirmation(u, data.options);
    			e.preventDefault();
    		} else if (u.hash.search(eventDetailsUrl) !== -1) {
    			// Display event details page - #eventDetails   			
    			openEventDetailPage(u, data.options);
    			e.preventDefault();
    		}  
    		else if (u.hash.search(eventByCityUrl) !== -1) {
    			// Display event by city page - #eventsByCityPage    			
    			openEventByCityPage(u, data.options);
    			e.preventDefault();
    		} else if (u.hash.search(nearbyEventsUrl) !== -1) {
				// Display event Nearby    			
				openEventNearbyPage(u, data.options);
				e.preventDefault();
    		} else if (u.hash.search(eventMapUrl) !== -1) {
    			// Display event geo map    			
    			openEventMapPage(u, data.options);
    			e.preventDefault();
    		} else if (u.hash.search(eventMapDirectionsUrl ) !== -1) {
    			// Display event geo map directions 			
    			openEventMapDirectionsPage(u, data.options);
    			e.preventDefault();
    		}  else if (u.hash.search(byLocUrl) !== -1) {
    			// Display main search page .. by city - #byLocationSearchPage
    			openByLocationPage(u, data.options);
    			e.preventDefault();
    		}else if (u.hash.search(byNameUrl) !== -1) {
    			// NOTE: this will be refactored
    			// callback function invocation
     		   init(AjaxEventHelper.getRootURL() + 'events/city');
    		} 
    		else if (u.hash.search(byDateUrl) !== -1) {
    			// Display event for today page - #byDateSearchPage
    			openEventsForTodayPage(u, data.options);
    			e.preventDefault();
    		} 
    		else if (u.hash.search(searchVenueUrl) !== -1) {
    			// Display URL venues dialog page - #searchVenueDialogPage
    			//loadVenuesAjax();
    			openSearchVenuesDialogPage(u, data.options);
    			e.preventDefault();
    		} 
    		else if (u.hash.search(userUrl) !== -1) {
    			// Display event by user page - #byUserSearchPage
    			
   	    		var isLogged = validateIfUserIsLogged();
	    		if(isLogged) {
	    			// Display user events URL 
	    			openEventByUserPage(u, data.options);
	    		} else {
	    			// Now call changePage() and tell it to switch to the page we just modified.
	    			$.mobile.changePage("#settings");
	    		}
	    		e.preventDefault();
	    	}
    		else if (u.hash.search(prefUrl) !== -1) {
    			// Display preferences user page - #byUserSearchPage
				openPreferencesPage(u, data.options);
				e.preventDefault();
    		}
    		
    		else if (u.hash.search(createEventPag) !== -1) {
    			// Display create event page
    			openCreateEventPage(u, data.options);
    			e.preventDefault();
    		}
    		
    	}
    });
    
    
    // Display openEventDetailPage URL page
    function openEventDetailPage(urlObj, options) {

    	// Get the cityId URL parameters
    	var eventId = urlObj.hash.replace(/.*eventId=/, "");
    	
    	// The pages we use to display our content are already in
    	// the DOM. The id of the page we are going to write our
    	// content into is specified in the hash before the '?'.
    	var	pageSelector = urlObj.hash.replace(/\?.*$/, "");
    	
    	// Get the page we are going to write our content into.
    	var $page = $(pageSelector);
    	
    	
    	
    	// because all this is ajax related he have to send our gui generation as a ajax callback.
    	// If we didn't do it we would have data when we created the page
    	EventService.findEventById( eventId, function (event) {
    		
	    		// Get the header for the page.
	    		$header = $page.children( ":jqmData(role=header)" );
	        	$header.find( "h1" ).html( event.title );
	        	
	        	// Get the content area element for the page.
	        	var $content = $page.children(":jqmData(role=content)");
	        		
	    		// The markup we are going to inject into the content
	        	// Create event info
	        	var html = '';

	        	html += '<p><h1><strong> ' + event.description + '</strong></h1></p>'
	        	html += '<p><strong> ' + event.artist.artist + '</strong></p>'
	        	html += '<p>' + convert(event.startDate) + '</p>'
	        	html += '<p><a href="'+ event.url+ '">'+  event.url +'</a></p>'
	        	
	        		
	        	// we reset the eventInfo from previous chosen events
	        	//$content.find( "#eventInfo" ).empty();
	        	// append the info from the last event	
	        	$content.find( "#eventInfo" ).html( html );
	        	
	        	
	        	// create venue info
	        	html = '';
	        	html += '<p><h1><strong> ' + event.venue.venueName + '</strong></h1></p>'
	        	html += '<p>' + event.venue.location.street + ' - ' + event.venue.location.country +'</p>'
	        	html += '<p>' + event.venue.location.postalCode + ' - ' + event.venue.location.city +'</p>'
	        	html += '<p> lat: ' + event.venue.location.latitude + 'º</p>'
	        	html += '<p> long:' + event.venue.location.longitude +'º</p>'
	        	html += '<p><a href="'+ event.venue.website + '">'+  event.venue.website +'</a></p>'
	        	
	        	// we reset the venueInfo from previous chosen events
	        	//$content.find( "#venueInfo" ).empty();
	        	// append the info from the last event venue
	        	$content.find( "#venueInfo" ).html( html );
	
	        	var tel = 'tel:' + event.venue.phoneNumber; 
	        	$( "#phoneCallButton" ).attr('href', tel);
	    		
	        	
	        	// we have to decide which id the app owned events are going to use
	        	// I think we have to check against the user logged id to understand if I'm the owner of the event

	        	html = '';
	        	html += '<a id="findInMapsBtn"  data-role="button" data-icon="maps" href="#page-map?eventId='+ event.id + '"> Find in Google Maps </a>';
	        	html += '<a id="phoneCallButton" href="tel:0388161072"  data-role="button" data-icon="info"> Call </a>';
	        	if(event.owner == 0) {
	        		html += '<a id="editBtn" href="#createEventPage?eventId=' + eventId + '" data-role="button" data-icon="gear">Edit Event</a>';
	        	}	
	        	$content.find( "#contact_buttons" ).html( html );
	        	
	        	$("#findInMapsBtn").button();
	        	$("#phoneCallButton").button();
	        	$("#editBtn").button();
	        	
	    		// Inject the category items markup into the content element.
	    		//$content.html( html );
    			
    			// Pages are lazily enhanced. We call page() on the page
    			// element to make sure it is always enhanced.
    			$page.page();

	    		// Make sure the url displayed in the the browser's location field includes parameters
	    		//options.dataUrl = urlObj.href;
    			
    			//var mapdata = { destination: new google.maps.LatLng(41.5444196, -8.422587) };
    			var mapInfo = mapdata;
    			if( event.venue.location.latitude != undefined && event.venue.location.longitude != undefined)
    				mapInfo = { destination: new google.maps.LatLng(event.venue.location.latitude, event.venue.location.longitude) };
    			
    			$('#map_square').gmap(
    	    		    { 'center' : mapInfo.destination, 
    	    		      'zoom' : 12, 
    	    		      'mapTypeControl' : false,
    	    		      'navigationControl' : false,
    	    		      'streetViewControl' : false 
    	    		    })
    	    		    .bind('init', function(evt, map) { 
    	    		        $('#map_square').gmap('addMarker', 
    	    		            { 'position': map.getCenter(), 
    	    		              'animation' : google.maps.Animation.DROP 
    	    		            });                                                                                                                                                                                                                
    	    		    });
    			
    			// Now call changePage() and tell it to switch to the page we just modified.
    			$.mobile.changePage($page, options);
    	});
    	
    	
    }
    
    
    // Display openByLocationPage URL page
    function openByLocationPage(urlObj, options) {

    	
    	
    	// The pages we use to display our content are already in
    	// the DOM. The id of the page we are going to write our
    	// content into is specified in the hash before the '?'.
    	var	pageSelector = urlObj.hash.replace(/\?.*$/, "");
    	
    	// Get the page we are going to write our content into.
    	var $page = $(pageSelector);
    	
    	// Get the header for the page.
    	//$header = $page.children( ":jqmData(role=header)" );
    	//$header.find( "h1" ).html( evTitle );
    	
    	// Get the content area element for the page.
    	var $content = $page.children(":jqmData(role=content)");
    	
    	// because all this is ajax related he have to send our gui generation as a ajax callback.
    	// If we didn't do it we would have data when we created the page
    	EventService.findAllEventsGroupedByCity( function (map) {
    		// The markup we are going to inject into the content
        	var html = '<ul id="locationSearchList" data-role="listview" data-filter="true" data-filter-placeholder="Search locations ..." >'
        	var key;
        	
        	// Set elements in the page.
        	for(var i = 0 ; i < map.sortedKeys.length ; i++ ) {
        		key = map.sortedKeys[i];
    			html += '<li><a href="#eventsByCityPage?cityId=' + key +'">' + key + '<span class=ui-li-count>' + map[key].length + '</span> </a> </li>';
    		};
    		
    		html += '</ul>';
    		
    		// Inject the category items markup into the content element.
    		$content.html( html );

    		
        	// Pages are lazily enhanced. We call page() on the page
        	// element to make sure it is always enhanced.
        	$page.page();
        	
        	// Enhance the listview we just injected.
        	$content.find( ":jqmData(role=listview)" ).listview();

        	// Now call changePage() and tell it to switch to the page we just modified.
        	$.mobile.changePage($page, options);
    	});
    	
    	
    }
    
    // Display Delete URL confirmation dialog for a specific url passed in as a parameter.
    function openDeleteEventConfirmation(urlObj, options) {
    	// Get the eventId and eventTitle URL parameters
    	var evId = urlObj.hash.replace(/.*eventId=/, "").replace(/&eventTitle=.*/, "");
    	var evTitle = urlObj.hash.replace(/.*&eventTitle=/, "");

		
    	// The pages we use to display our content are already in
    	// the DOM. The id of the page we are going to write our
    	// content into is specified in the hash before the '?'.
    	var	pageSelector = urlObj.hash.replace(/\?.*$/, "");

    	// Get the page we are going to write our content into.
    	var $page = $(pageSelector);

    	// Get the header for the page.
		//$header = $page.children( ":jqmData(role=header)" );
		//$header.find( "h1" ).html( evTitle );
    	
    	// Get the content area element for the page.
    	var $content = $page.children(":jqmData(role=content)");

    	// Set elements in the page.
    	//$content.find("#evIdToDlt").val(evId);
    	//$content.find("#eventTitleToDel").html(evId + evTitle);
    	
    	$("#evIdToDlt").val(evId);
    	$("#eventTitleToDel").html(evTitle);
    	

    	// Pages are lazily enhanced. We call page() on the page
    	// element to make sure it is always enhanced.
    	$page.page();

    	// Now call changePage() and tell it to switch to the page we just modified.
    	$.mobile.changePage($page, options);
    }

    // Display chooese Venue URL dialog 
    function openSearchVenuesDialogPage(urlObj, options) {
    	    	
    	// The pages we use to display our content are already in
    	// the DOM. The id of the page we are going to write our
    	// content into is specified in the hash before the '?'.
    	var	pageSelector = urlObj.hash.replace(/\?.*$/, "");
    	
    	// Get the page we are going to write our content into.
    	var $page = $(pageSelector);
    	
    	// Get the content area element for the page.
    	var $content = $page.children(":jqmData(role=content)");
    	
    	// Set elements in the page.

    	
    	EventService.findAllVenues( 
    			function( venueMap ) {
//    				var html = '<ul id="searchVenueList" data-role="listview" data-filter="true" data-filter-placeholder="Search Venue ...">';
    				var html = '';
    				
        			
    				// Set elements in the page.
    	        	for(var i = 0 ; i < venueMap.sortedKeys.length ; i++ ) {
    	        		key = venueMap.sortedKeys[i];
    	    			html += '<li data-role="list-divider">' + key + '</li>';
    	    			var list = venueMap[key];
    	    			for(var j = 0; j < list.length ; j++) {	
    	    				var _venue = list[j];
            				// Create html row for displaying event
            				html += '<li ><a href="javascript:loadVenueById('+ _venue.id + ')"><img alt="coverArt" src="images/mia.png" /><h3>' + _venue.name + '</h3>';
            			    html += '<p>' + _venue.location.country + '</p>';
            			    html += '<p>' + _venue.location.city + '</p>';
            			    html += '</a>';
            			    html += '</li>';
    	    			}
    	    		}
    				
    				
    				//console.log(html);
//    	        	html += '</ul>';
    	        	
//    	    		// Inject the category items markup into the content element.
//    	    		$content.html( html );
//
//    	    		
//    	        	// Pages are lazily enhanced. We call page() on the page
//    	        	// element to make sure it is always enhanced.
//    	        	$page.page();
//    	        	
//    	        	// Enhance the listview we just injected.
//    	        	$content.find( ":jqmData(role=listview)" ).listview();
    	        	
    	        	$page.page();
    	        	
    	        	$("#searchVenueList").html(html);
    	      		$("#searchVenueList").listview('refresh');

    	        	// Now call changePage() and tell it to switch to the page we just modified.
    	        	$.mobile.changePage($page, options);
    			}
    	);
    }

    function openEventByCityPage(urlObj, options) {
    	var hiddenFieldCityId = "cityIdHidden";
    	
    	// Get the cityId URL parameters
    	var cityId;
    	if(urlObj.hash.match('cityId') != null)
    		cityId = urlObj.hash.replace(/.*cityId=/, "");
    	else
    		cityId = $("#"+hiddenFieldCityId).val();
    	

    	// The pages we use to display our content are already in
    	// the DOM. The id of the page we are going to write our
    	// content into is specified in the hash before the '?'.
    	var	pageSelector = urlObj.hash.replace(/\?.*$/, "");
    	
    	// Get the page we are going to write our content into.
    	var $page = $(pageSelector);
    	
    	// Get the header for the page.
    	$header = $page.children( ":jqmData(role=header)" );
    	$header.find( "h1" ).html( cityId );
    	
    	// Get the content area element for the page.
    	var $content = $page.children(":jqmData(role=content)");
    	
    	


    	EventService.findEventsByCity(
    			cityId, 
    			function(eventList) {
    				var _event;
    				// The markup we are going to inject into the content
    				var html = '<ul id="eventsByCitySearchList" data-role="listview" data-filter="true" data-filter-placeholder="Search events ...">';
    			
    				for(var i = 0 ; i < eventList.length ; i++){  
    					_event = eventList[i];
    					html += createHtmlEventRow(_event);
    				}
    				
    				//console.log(html);
    	        	html += '</ul>';
    	    		
    	    		html += '<input type="hidden"  id="' + hiddenFieldCityId + '" value="' + cityId + '" />';
    	        	
    	    		// Inject the category items markup into the content element.
    	    		$content.html( html );

    	    		
    	        	// Pages are lazily enhanced. We call page() on the page
    	        	// element to make sure it is always enhanced.
    	        	$page.page();
    	        	
    	        	// Enhance the listview we just injected.
    	        	$content.find( ":jqmData(role=listview)" ).listview();

    	        	// Now call changePage() and tell it to switch to the page we just modified.
    	        	$.mobile.changePage($page, options);
    			}
    	);      
    }

    function openEventByUserPage(urlObj, options) {

    	    	
    	// The pages we use to display our content are already in
    	// the DOM. The id of the page we are going to write our
    	// content into is specified in the hash before the '?'.
    	var	pageSelector = urlObj.hash.replace(/\?.*$/, "");
    	
    	// Get the page we are going to write our content into.
    	var $page = $(pageSelector);
    	
    	// Get the header for the page.
    	$header = $page.children( ":jqmData(role=header)" );
    	//$header.find( "h1" ).html( 'User events' );
    	
    	// Get the content area element for the page.
    	var $content = $page.children(":jqmData(role=content)");
    	

    	    	
    	// because all this is ajax related he have to send our gui generation as a ajax callback.
    	// If we didn't do it we would have data when we created the page
    	EventService.findEventsByuserId( 0, function (list) {
        	// The markup we are going to inject into the content
        	var html = '<ul id="eventsForUserSearchList" data-role="listview" data-filter="true" data-filter-placeholder="Search Personal Events ..." data-split-icon="delete">';
        	var _event;
        	// Set elements in the page.
        	for( var i = 0; i < list.length ; i++) {
        		_event = list[i];
        		html += '<li ><a href="#eventDetails?eventId='+ _event.id + '"><img alt="coverArt" src="images/mia.png" /><h3>' + _event.title + '</h3>';
    		    html += '<p>' + convert(_event.startDate) + '</p>';
    		    html += '<p>' + _event.venue.location.city + '</p>';
    		    html += '</a>';
    		    html += '<a href="#deleteEventDialogPage?eventId=' +_event.id + '&eventTitle='+ _event.title + '"  data-rel="dialog"></a>';
    		    html += '</li>'; 
    		};
    		
    		html += '</ul>';
    		
    		// Inject the category items markup into the content element.
    		$content.html( html );

        	// Pages are lazily enhanced. We call page() on the page
        	// element to make sure it is always enhanced.
        	$page.page();
        	
        	// Enhance the listview we just injected.
        	$content.find( ":jqmData(role=listview)" ).listview();

        	// Now call changePage() and tell it to switch to the page we just modified.
        	$.mobile.changePage($page, options);
    	});
    	
    }

    function openEventsForTodayPage(urlObj, options) {
    	
    	
    	// The pages we use to display our content are already in
    	// the DOM. The id of the page we are going to write our
    	// content into is specified in the hash before the '?'.
    	var	pageSelector = urlObj.hash.replace(/\?.*$/, "");
    	
    	// Get the page we are going to write our content into.
    	var $page = $(pageSelector);
    	
    	// Get the header for the page.
    	$header = $page.children( ":jqmData(role=header)" );
    	//$header.find( "h1" ).html( 'User events' );
    	
    	// Get the content area element for the page.
    	var $content = $page.children(":jqmData(role=content)");
    	
    
    	var date = new Date();
    	EventService.findEventsforToday( date, function ( map) {
    		
    		
    		// The markup we are going to inject into the content
        	var html = '<ul id="eventsForTodaySearchList" data-role="listview" data-filter="true" data-filter-placeholder="Search events ...">';
        	var _event, key;
        	
        	// Set elements in the page.
        	for(var i = 0 ; i < map.sortedKeys.length ; i++ ) {
        		key = map.sortedKeys[i];
    			html += '<li data-role="list-divider">' + key + '</li>';
    			var list = map[key];
    			for(var j = 0; j < list.length ; j++) {	
    				var _event = list[j];
    				// Create html row for displaying event
    				html += createHtmlEventRow(_event);
    			}
    		};

    		
    		html += '</ul>';
    		
    		// Inject the category items markup into the content element.
    		$content.html( html );

        	// Pages are lazily enhanced. We call page() on the page
        	// element to make sure it is always enhanced.
        	$page.page();
        	
        	// Enhance the listview we just injected.
        	$content.find( ":jqmData(role=listview)" ).listview();

        	// Now call changePage() and tell it to switch to the page we just modified.
        	$.mobile.changePage($page, options);
    	});
    }

    function openEventNearbyPage(urlObj, options) {
    	
    	
    	// The pages we use to display our content are already in
    	// the DOM. The id of the page we are going to write our
    	// content into is specified in the hash before the '?'.
    	var	pageSelector = urlObj.hash.replace(/\?.*$/, "");
    	
    	// Get the page we are going to write our content into.
    	var $page = $(pageSelector);
    	
    	// Get the header for the page.
    	$header = $page.children( ":jqmData(role=header)" );
    	//$header.find( "h1" ).html( 'User events' );
    	
    	// Get the content area element for the page.
    	var $content = $page.children(":jqmData(role=content)");
    	
    	
    	EventService.findNearbyEvents( 
    			function(eventList) {
    				var _event;
    				// The markup we are going to inject into the content
    				var html = '<ul id="eventsNearcbySearchList" data-role="listview" data-filter="true" data-filter-placeholder="Search events ...">';
    			
    				for(var i = 0 ; i < eventList.length ; i++){  
    					_event = eventList[i];
    					html += createHtmlEventRow(_event);
    				}    				
    				//console.log(html);
    	        	html += '</ul>';

    	    		// Inject the category items markup into the content element.
    	    		$content.html( html );

    	    		
    	        	// Pages are lazily enhanced. We call page() on the page
    	        	// element to make sure it is always enhanced.
    	        	$page.page();
    	        	
    	        	// Enhance the listview we just injected.
    	        	$content.find( ":jqmData(role=listview)" ).listview();

    	        	// Now call changePage() and tell it to switch to the page we just modified.
    	        	$.mobile.changePage($page, options);
    			}, 
    			function() {
    				alert("Network connection needed");
    			});
    }

    function openEventMapPage(urlObj, options) {
    	
    	
    	var eventId = urlObj.hash.replace(/.*eventId=/, "");
    	console.log("eventId: " + evId);
    	
    	// The pages we use to display our content are already in
    	// the DOM. The id of the page we are going to write our
    	// content into is specified in the hash before the '?'.
    	var	pageSelector = urlObj.hash.replace(/\?.*$/, "");
    	
    	// Get the page we are going to write our content into.
    	var $page = $(pageSelector);
    	
    	// Get the header for the page.
    	$header = $page.children( ":jqmData(role=header)" );
    	//$header.find( "h1" ).html( 'User events' );
    	
    	// Get the content area element for the page.
    	var $content = $page.children(":jqmData(role=content)");
    	
    	EventService.findEventById(
    			eventId, 
    			function (event) {
    				// workarround for back pages. Has to be changed
    				if(event != null ) {
			    		var mapInfo = mapdata;
			    		if( event.venue.location.latitude != undefined && event.venue.location.longitude != undefined)
			    			mapInfo = { destination: new google.maps.LatLng(event.venue.location.latitude, event.venue.location.longitude) };
			    		
			    		navigator.geolocation.getCurrentPosition ( 
			                    function(position) {
			                        $('#map_canvas').gmap('displayDirections', 
			                        { 'origin' : new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 
			                          'destination' : mapInfo.destination, 'travelMode' : google.maps.DirectionsTravelMode.DRIVING},
//			                          'destination' : mapdata.destination, 'travelMode' : google.maps.DirectionsTravelMode.WALKING},
			                        { 'panel' : document.getElementById('dir_panel')},
			                              function (result, status) {
			                                  if (status === 'OK') {
			                                      var center = result.routes[0].bounds.getCenter();
			                                      $('#map_canvas').gmap('option', 'center', center);
			                                      $('#map_canvas').gmap('refresh');
			                                  } else {
			                                    alert('Unable to get route');
			                                  }
			                              }
			                           );         
			                    }, 
			                    function(){ 
			                        alert('Unable to get location');
			                        $.mobile.changePage($('#eventDetails'), {}); 
			                    }); 
			    		
			    		
			    		
			    		
			    		$("#bckBtnMaps" ).attr('href', '#eventDetails?eventId=' + eventId);
			    		$("#dirBtnMaps" ).attr('href', '#page-dir?eventId=' + eventId);
			        	// Pages are lazily enhanced. We call page() on the page
			        	// element to make sure it is always enhanced.
			        	$page.page();
			        	
			        	
			        	// Now call changePage() and tell it to switch to the page we just modified.
			        	$.mobile.changePage($page, options);
    				}
    	});
    	
    	
    }

    function openEventMapDirectionsPage(urlObj, options) {
    	
    	
    	var eventId = urlObj.hash.replace(/.*eventId=/, "");
    	console.log("eventId: " + evId);
    	
    	// The pages we use to display our content are already in
    	// the DOM. The id of the page we are going to write our
    	// content into is specified in the hash before the '?'.
    	var	pageSelector = urlObj.hash.replace(/\?.*$/, "");
    	
    	// Get the page we are going to write our content into.
    	var $page = $(pageSelector);
    	
    	// Get the content area element for the page.
    	var $content = $page.children(":jqmData(role=content)");
    	
    	$("#bckBtnMapsDir" ).attr('href', '#page-map?eventId=' + eventId);
    	//$content.find('#bckBtnMapsDir').attr('href', '#page-map?eventId=' + eventId);
		
    	// Pages are lazily enhanced. We call page() on the page
    	// element to make sure it is always enhanced.
    	$page.page();
    	
    	// Now call changePage() and tell it to switch to the page we just modified.
    	$.mobile.changePage($page, options);
    	
    }

    function openPreferencesPage(urlObj, options) {
    	
    	// The pages we use to display our content are already in
    	// the DOM. The id of the page we are going to write our
    	// content into is specified in the hash before the '?'.
    	var	pageSelector = urlObj.hash.replace(/\?.*$/, "");
    	
    	// Get the page we are going to write our content into.
    	var $page = $(pageSelector);
    	
    	if(!validateIfUserIsLogged())
    		$("#prefMsg").html("<strong>Please enter your login details</strong>");
    	else
    		$("#prefMsg").html("");
		
		// Pages are lazily enhanced. We call page() on the page
		// element to make sure it is always enhanced.
    	$page.page();
		
    	// Now call changePage() and tell it to switch to the page we just modified.
		$.mobile.changePage($page, options);
   
    }
    
    function openCreateEventPage(urlObj, options) {
    	
    	
    	var eventId = urlObj.hash.replace(/.*eventId=/, "");

    	// The pages we use to display our content are already in
    	// the DOM. The id of the page we are going to write our
    	// content into is specified in the hash before the '?'.
    	var	pageSelector = urlObj.hash.replace(/\?.*$/, "");
    	
    	// Get the page we are going to write our content into.
    	var $page = $(pageSelector);
    	
    	if(eventId != undefined && !(eventId === pageSelector)) {
    		EventService.findEventById( eventId, function (event) {
    			// Get the content area element for the page.
	        	var $content = $page.children(":jqmData(role=content)");
	        	
	        	$content.find('#evId').val(event.id);
	        	$content.find('#evTitle').val(event.title);
	        	$content.find('#evDescr').val(event.description);
	        	//$content.find('#evStartDate').data('datebox').val(event.startDate); 
	        	//$content.find('#evStartTime').data('datebox').val(event.);
	        	$content.find('#evPrice').val(event.price);
	        	$content.find('#evTags').val(event.tag);
	        	$content.find('#evUrl').val(event.url);
	        	
	        	$content.find('#vnId').val(event.venue.id);
	        	$content.find('#vnName').val(event.venue.name);
	        	$content.find('#vnUrl').val(event.venue.website);
	        	$content.find('#vnPhone').val(event.venue.phoneNumber);
	        	$content.find('#vnLocCountry').val(event.venue.location.country);
	        	$content.find('#vnLocCity').val(event.venue.location.city);
	        	$content.find('#vnLocStreet').val(event.venue.location.street);
	        	$content.find('#vnLocLat').val(event.venue.location.latitude);
	        	$content.find('#vnLocLong').val(event.venue.location.longitude);

	        	
    		});
    	}

    	// Pages are lazily enhanced. We call page() on the page
    	// element to make sure it is always enhanced.
    	$page.page();
    	
    	
    	// Now call changePage() and tell it to switch to the page we just modified.
    	$.mobile.changePage($page, options);
    	
    }
 
    function loadVenuesAjax(){
    	var url = AjaxEventHelper.getRootURL() + 'venue/country/pt';  /* Now we are passing country hardcoded */
    	
    	AjaxEventHelper.createGETRequestAjax(url, function(data){
    		var html = '';
    		
    		//if (!data )
    		// validar se existe events .. se n fazer display ao user
    		
    		$.each(data, function(index, _venueDto) {

    			html += '<li data-role="list-divider">' + _venueDto.city + '</li>';
    			var list = _venueDto.venueList;
    			for(var i = 0; i < list.length ; i++) {	
    				var _venue = list[i];
    				// Create html row for displaying event
    				html += '<li ><a href="javascript:loadVenueById('+ _venue.id + ')"><img alt="coverArt" src="images/mia.png" /><h3>' + _venue.name + '</h3>';
    			    html += '<p>' + _venue.location.country + '</p>';
    			    html += '<p>' + _venue.location.city + '</p>';
    			    html += '</a>';
    			    html += '</li>';
    			}
    		});
    		//console.log(html);
      		$("#searchVenueList").html(html);
      		$("#searchVenueList").listview('refresh');
      		/*
      		//$(".console").html("Data refreshed ..");
    			*/
    		
        });
    };

    
	// ***********************************************************
	// ******************* jQuery event listeners ****************
	// ***********************************************************
    
    // When a event is deleted, remove it from the local storage and display the home page.
    $("#deleteEventDialogPageForm").submit(function(event) {
    	var evId = $("#evIdToDlt", $.mobile.activePage).val();
    	
    	EventService.deleteEventById(evId, 
    								 function () {    		
							    		//$("#deleteEventDialogPage").dialog('close');
							    		$.mobile.changePage("#byUserSearchPage");
							    	});
    	event.preventDefault();
        return false;
    });

    $("#crEventBtn").click(function(event) {
    	//reset form values
   		resetEventCreationFields();
    	// expand basic collapsable panel
    	$("#evBasicColapInfo").trigger('expand');
    	// collapsable other panels
    	$("#evColapInfo, #vnColapInfo, #arColapInfo ").trigger('collapse');
    	
    	var today = new Date();
    	var todayStr = today.getDate() +"/"+(today.getMonth()+1)+"/"+ today.getFullYear();
    	if($('#evStartDate').val() == "")
    		$('#evStartDate').trigger('datebox', {'method':'set', 'value':todayStr});
    });
    
    
    
    
    // code to execute when user clicks in submit event button
    // this has to be done so the validation can be fulfilled.
    // If the the panel is colapsed the validatiion of the fields wont be fired
    $('#evCreateSubmBtn').click( function(event){
    	// expand basic event and venue collapsable panel
    	$("#evBasicColapInfo, #vnColapInfo").trigger('expand');
//    	event.preventDefault();
//        return false;
    });

	 		    
	    //$(":jqmData(role=datebox)").css({"width":"60%"});
    //$(":jqmData(role=datebox)").parent("div").css({"display":"inline-block","width":"60%"});
});




//********************************************************************************
//************************ Start of JavaScript functions *************************
//********************************************************************************


// function invoked when the user selects an existent venue 
function loadVenueById(venueId) {
	console.log("loadVenueById: " + venueId);
	var url = AjaxEventHelper.getRootURL() + 'venue/'+venueId; 
	
	
	EventService.findVenueById(
			venueId, 
			function (data) {
				$('#vnId').val(data.id);
				$('#vnName').val(data.name);
				$('#vnUrl').val(data.url);
				$('#vnPhone').val(data.vnPhone);
				$('#vnLocCountry').val(data.location.country);
				$('#vnLocCity').val(data.location.city);
				$('#vnLocStreet').val(data.location.street);
				$('#vnLocLat').val(data.location.latitude);
				$('#vnLocLong').val(data.location.longitude);
		
				// if an existent venue is selected user can't change its details do we have disable all fields 
				if($('#vnId').val() != null) {
					$("#vnColapInfo input").prop('disabled', true);
				}
				
				//$("#searchVenueDialogPage").dialog('close');
				$.mobile.changePage("#createEventPage");
			});
	
	// invoke ws for obtain venue info for populate  form
	/*
	AjaxEventHelper.createGETRequestAjax(url, function(data){
		$('#vnId').val(data.id);
		$('#vnName').val(data.name);
		$('#vnUrl').val(data.url);
		$('#vnPhone').val(data.vnPhone);
		$('#vnLocCountry').val(data.location.country);
		$('#vnLocCity').val(data.location.city);
		$('#vnLocStreet').val(data.location.street);
		$('#vnLocLat').val(data.location.latitude);
		$('#vnLocLong').val(data.location.longitude);

		// if an existent venue is selected user can't change its details do we have disable all fields 
		if($('#vnId').val() != null) {
			$("#vnColapInfo input").prop('disabled', true);
		}
		
		$("#searchVenueDialogPage").dialog('close');
	});
	*/
	
}

function resetEventCreationFields(){
	//reset previous values
	$('#createEventForm')[0].reset();
	//document.getElementById('createEventForm').reset();

	// Put all fields editable (user might have created a previous event with existent venues ou artist)
	$("#createEventForm input").prop('disabled', false);
	
	$('#evId').val('');
} 


function createEventJsRegisterRequest(){	
	
	var evId = $('#evId').val();
	evId = (evId == '' || evId == undefined) ? null : evId;
	var evTitle = $('#evTitle').val();
	var evDescr = $('#evDescr').val();
	var evStartDate = $('#evStartDate').data('datebox').theDate; 
	var evStartTime = $('#evStartTime').val();
	var evPrice = $('#evPrice').val();
	var evTags = $('#evTags').val();
	var evUrl = $('#evUrl').val();
	
	var vnId = $('#vnId').val();
	var vnName = $('#vnName').val();
	var vnUrl = $('#vnUrl').val();
	var vnPhone = $('#vnPhone').val();
	var vnLocCountry = $('#vnLocCountry').val();
	var vnLocCity = $('#vnLocCity').val();
	var vnLocStreet = $('#vnLocStreet').val();
	var vnLocLat = $('#vnLocLat').val();
	var vnLocLong = $('#vnLocLong').val();
	
	var event;
	event = new Event(  evId, evTitle, evStartDate, evDescr, null, null,  
						evPrice, evTags, 1, 0/*'UserId'*/, null/*new Date()*/, evUrl,
  						new Artist(null, 'Artist XPTO'),
  						new Venue( vnId, 
								   vnName,
								   new Location(vnLocCity,
											    vnLocCountry,
											    vnLocStreet,
					   						  	null,
					   						  	vnLocLat,
					   						  	vnLocLong ),
					   		       vnUrl,
					   		       vnPhone,
					   		       null));
	//console.log(event.toString());
	
	//Note: maybe we should add the event to a userList events in memory and add this event to the existent singleton list
	
	console.log("object create: " + event);
	return event;
} 


// Generic Refresh/sync function 
// Its called whenever the user clicks on refresh button on every page
// Receives the url and sync events with server and enters on the generic routing function  (see pagebeforechange event listener)
function refresh(url) {
	var urlTobeRefreshed = "#".concat(url);
	EventService.sync(function(){
		$.mobile.changePage(urlTobeRefreshed);
	});
}



function findNearby(){
	$.mobile.changePage("#nearbySearchPage");
}

function createHtmlEventRow(_event) {
	var html = '';
	html += '<li ><a href="#eventDetails?eventId='+ _event.id + '">';
	html += '<img alt="coverArt" src="images/star_empty.png" />';
	html += '<h3><strong>' + _event.title + '</strong></h3>';
    html += '<p>' + convert(_event.startDate) + '</p>';
    html += '<p>' + _event.venue.name + ' - '+ _event.venue.location.city + ' , ' + _event.venue.location.country  + '</p>';
    html += '<p class="favourite"></p>';
    html += '</a>';
    html += '</a></li>';
    return html;
}


function createUserInfoRequest(){
	var username = $('#userLogin').val();	
	var password = $('#passLogin').val();
	// do data validation
	//"username": wineId == "" ? null : wineId,
	var json = JSON.stringify({
		"username": username, 
		"password": password, 
		});
	console.log("json object create: " + json);
	return json;
	
}


// dummy function to emulate logged in functionality
function validateIfUserIsLogged(){
	return true;
	/*
	if($("#userLogin").val().length != 0 && $("#passLogin").val().length != 0)
		return true;
	else return false;
	*/
}

function convert(dateJson) {
	var date = new Date(dateJson); 
	
    var hour = date.getHours();
    var minute = date.getMinutes();

    if(hour < 10)
        hour = "0" + hour
    if(minute < 10)
        minute = "0" + minute

    return date.getFullYear() +"/"+(date.getMonth()+1)+"/"+ date.getDate() + ' - ' + hour + ':' + minute
}


function createOrUpdatePrefs(){
	prefs = new Object();
	prefs['userLogin'] = $('#userLogin').val();
	prefs['passLogin'] = $('#passLogin').val();
	prefs['sync'] = $('#sync').val();
	
	EventService.syncPrefs(prefs, function (prefsList) {
		for(prefKey in prefsList) {
			$('#' + prefKey).val(prefsList[prefKey]);
		}
	});
}

// ************************************************************************
// ********************** JavaScript Deprecated Code **********************
// ************************************************************************
	
// callback function (populates one <li> with the info returned by the webService) 
// this function will be refactored in some other best way 
// It was only for testing approaches 
function init(ws){
	console.log("init");
	$.ajax( {
		type:'get',
		url:ws,
		cache:false,
		datatype:'json',
	   //async: false,
		success:function(data) {
			console.log(data);
			var lang = '';
			$.each(data, function() {
				lang += this['title'] + + "<br/>";
			});
	      	console.log(lang);
			$("#searchEventsList").append('<li><a href="' + "#" + '">' +JSON.stringify(eval(data)) + '</a></li>');
		    $("#searchEventsList").listview('refresh');
		},
		error: function(request,error)  {
			console.log(arguments);
			console.log("error: "  + error);
			$("#searchEventsList").append('<li><a href="' + "#" + '">' +error + '</a></li>');
		    $("#searchEventsList").listview('refresh'); 
		}
	});
}


// *******************************************************************************
// *******************************************************************************
// *******************************************************************************
