// **********************************************************
// ****************** Main Javascript code ******************
// **********************************************************




// *************************************************************************
// ************************ Start of jQuery code ***************************
// *************************************************************************

$(function(){

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
			var url = AjaxEventHelper.getRootURL() + 'events';
			AjaxEventHelper.createPOSTRequestAjax(url, 
												  function(data){
														$("#createEventPage").dialog('close');
														$('.console').append("Event created").append(data);
												  }, 
												  createEventRegisterRequest()); 
		},
		// set this class to error-labels to indicate valid fields
		success: function(label) {
			label.html("&nbsp;").addClass("checked");
			}
 
	    });
	

	// ************************************
    
    // ****************************************
	// ****** Event configuration  Code *******	
	// ****************************************
	
	
	// try to sinalize in the console some events that are fired --- see 181 pro jquery mobile
	$( "#home" ).live( " pagebeforechange pagebeforeload pagebeforecreate pagecreate", function(e, data){
		console.log("Page events are being fired..." + e +  " "+data);
	});
	

	// try to create a splashScreen while a app loads
	/*setTimeout(hideSplash, 1000);
	function hideSplash() {
	  $.mobile.changePage("#home", "fade");
	}
	 */

	
	$('#loginBtn').click(function() {
		//event.preventDefault();
		var url = AjaxEventHelper.getRootURL() + 'users';
		AjaxEventHelper.createPOSTRequestAjax(url, 
											  function(data){
													$('#consoleLoginPage').append("dfsdfsd").append(data);
											  }, 
											  createUserInfoRequest());
				
	});

	// create a event listener for click events  on (#locationSearchList > li ... every li inside locationSearchList)
	// the idea is to try to associate a click event in a way that we create dinamically the next page (events by city page)
    $("#locationSearchList").on("click", "li", function() {
    	// fetch the id of li (it was fulfilled with item.city )
	    var city = $(this).attr('id');
	    // fetch the text of li --> to display in the header of next page
	    //var city = $(this).text();
	    // invoke function to create/fulfill new page results
	    //loadEventsByCitiesInMemory( city );
		    loadEventsByCitiesAjax(city)
	    });

    
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
    		
    		if (u.hash.search(delUrl) !== -1) {
    			// Display URL delete confirmation dialog box.
    			openDeleteEventConfirmation(u, data.options);
    			e.preventDefault();
    		} else if (u.hash.search(byLocUrl) !== -1) {
    			// Display URL delete confirmation dialog box.
    			loadCitiesAjax();
    			//e.preventDefault();
    		} else if (u.hash.search(byNameUrl) !== -1) {
    			// callback funtion invocation
     		   init(AjaxEventHelper.getRootURL() + 'events/city');
    		} 
    		else if (u.hash.search(byDateUrl) !== -1) {
    			// callback funtion invocation
    			loadEventsForTodayAjax();
    		} 
    		else if (u.hash.search(searchVenueUrl) !== -1) {
    			// callback funtion invocation
    			loadVenuesAjax();
    		} 
    		else if (u.hash.search(userUrl) !== -1) {
	    		var isLogged = true;
	    		if(isLogged) {
	    			// Display URL delete confirmation dialog box.
	    			loadEventsForUserAjax();
	    			//e.preventDefault();
	    		} else {
	    			e.preventDefault();
	    			$("#prefMsg").html("Please enter your login details");
	    			// Now call changePage() and tell it to switch to the page we just modified.
	    			$.mobile.changePage("#settings", "pop");
	    		}
	    	}
    	}
    });
    
    // Display Delete URL confirmation dialog for a specific url passed in as a parameter.
    function openDeleteEventConfirmation(urlObj, options) {
    	// Get the url parameter
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
    				html += '<li ><a href=""><img alt="coverArt" src="images/mia.png" /><h3>' + _venue.name + '</h3>';
    			    html += '<p>' + _venue.location.country + '</p>';
    			    html += '<p>' + _venue.location.city + '</p>';
    			    html += '</a>';
    			    html += '<a href="javascript:loadVenueById('+ _venue.id + ')"></a>';
    			    html += '</li>';
    			}
    		});
    		console.log(html);
      		$("#searchVenueList").html(html);
      		$("#searchVenueList").listview('refresh');
      		/*
      		//$(".console").html("Data refreshed ..");
    			*/
    		
        });
    };
    
    // When a event is deleted, remove it from the local storage and display the home page.
    $("#evDeleteBtn").live("click" , function(e, data) {
    	var evId = $("#evIdToDlt").val();
    	removeEventById(evId);
    	$("#deleteEventDialogPage").dialog('close');
    	$.mobile.changePage("#byUserSearchPage");
    	// $("#deleteEventDialogPage").dialog('close');
    	//return false;
    });
    
    
   // Setting the startDate of the event creation form to the current date
   // It MUST exist a better way of doing this 
   $(document).on('pageshow', 'div:jqmData(role="dialog")', function(event){
	   var today = new Date();
	   var todayStr = today.getDate() +"/"+(today.getMonth()+1)+"/"+ today.getFullYear();
       $('#evStartDate').trigger('datebox', {'method':'set', 'value':todayStr});
   });
        
   
    // code to execute when user clicks in add event button
    $('#addEventBtn').click( function(){
    	//reset form values
   		resetEventCreationFields();
    	// expand basic collapsable panel
    	$("#evBasicColapInfo").trigger('expand');
    	// collapsable other panels
    	$("#evColapInfo, #vnColapInfo, #arColapInfo ").trigger('collapse');

    });
    
    // code to execute when user clicks in submit event button
    // this has to be done so the validation can be fulfilled.
    // If the the panel is colapsed the validatiion of the fields wont be fired
    $('#evCreateSubmBtn').click( function(){
    	// expand basic event and venue collapsable panel
    	$("#evBasicColapInfo, #vnColapInfo").trigger('expand');
    });

	 		    
	    //$(":jqmData(role=datebox)").css({"width":"60%"});
    //$(":jqmData(role=datebox)").parent("div").css({"display":"inline-block","width":"60%"});
});


function removeEventById(eventId) {
	console.log("removeEventById: " + eventId);
	$.ajax({
        type: 'DELETE',
        url:  AjaxEventHelper.getRootURL() + 'events/'+ eventId,
        success: function(data, textStatus, jqXHR){
            console.log('Event deleted successfully');
            EventListApp.removeEvent(eventId);
            //loadEventsForUserAjax();
        },
        error: function(jqXHR, textStatus, errorThrown){
        	console.log('error deleting record');
        }
    });
}

// function invoked when the user selects an existent venue 
function loadVenueById(venueId) {
	console.log("loadVenueById: " + venueId);
	var url = AjaxEventHelper.getRootURL() + 'venue/'+venueId; 
	
	// invoke ws for obtain venue info for populate  form
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
	
}

function resetEventCreationFields(){
	//var validator = $("#createEventForm").validate();
	//validator.resetForm();
	//reset previous values
	$('#createEventForm')[0].reset();
	//document.getElementById('createEventForm').reset();

	// Put all fields editable (user might have created a previous event with existent venues ou artist)
	$("#createEventForm input").prop('disabled', false);
} 


function createEventRegisterRequest(){	
	
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
	event = new Event(  null, evTitle, evStartDate, evDescr, null, null,  
						evPrice, evTags, 0/*'UserId'*/, null, evUrl,
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
	var json = JSON.stringify(event);
	console.log("json object create: " + json);
	return json;
} 



// ********************************************************************************
// ************************ Start of JavaScript functions *************************
// ********************************************************************************



// Refresh function called whenever the user clicks on refresh button on searchByDate page
// It should be refactored to be more generic (other pages call it too) or we should create other methods for the other pages  
function refreshByDate(){
	$(".console").html("Verifying...");
	loadEventsForTodayAjax();
}

function loadEventsForUserAjax(){
	
	var url = AjaxEventHelper.getRootURL() + 'events/user/' + 0 ; // it should be the user id already logged in. We are creating events with owner == 0
	AjaxEventHelper.createGETRequestAjax(url, function(data){
		var html = '';
		
		//if (!data )
		// validar se existe events .. se n fazer display ao user
		
		$.each(data, function(index, _event) {

			// Create html row for displaying event
			//html += createHtmlEventRow(_event);
			html += '<li ><a href="javascript:loadEventById('+ _event.id +  ')"><img alt="coverArt" src="images/mia.png" /><h3>' + _event.title + '</h3>';
		    html += '<p>' + _event.startDate + '</p>';
		    html += '<p>' + _event.venue.location.city + '</p>';
		    html += '</a>';
		    //html += '<a href="javascript:removeEventById('+_event.id + ')" data-split-icon="delete"></a>';
		    html += '<a href="#deleteEventDialogPage?eventId=' +_event.id + '&eventTitle='+ _event.title + '" data-split-icon="delete"  data-rel="dialog"></a>';
		    html += '</li>';
			EventListApp.addEvent(_event);

		});
		console.log(html);
  		$("#eventsForUserSearchList").html(html);
  		$("#eventsForUserSearchList").listview('refresh');
  		$(".console").html("Data refreshed ..");
    });
	
}

function loadEventsForTodayAjax(){
	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth() +1 ; // 0 based
	var curr_year = d.getFullYear(); 
	var date = curr_year  + "/" + curr_month + "/" + curr_date; 
	var url = AjaxEventHelper.getRootURL() + 'events/date?searchDate=' + date;
	
	AjaxEventHelper.createGETRequestAjax(url, function(data){
		var html = '';
		
		//if (!data )
		// validar se existe events .. se n fazer display ao user
		
		$.each(data, function(index, _eventDto) {
			html += '<li data-role="list-divider">' + _eventDto.city + '</li>';
			var list = _eventDto.eventList;
			for(var i = 0; i < list.length ; i++) {	
				var _event = list[i];
				// Create html row for displaying event
				html += createHtmlEventRow(_event);
				EventListApp.addEvent(_event);
			}
		});
		console.log(html);
  		$("#eventsForTodaySearchList").html(html);
  		$("#eventsForTodaySearchList").listview('refresh');
  		$(".console").html("Data refreshed ..");
    });
	
}




// Refresh function called whenever the user clicks on refresh button on searchByLocation page
// It should be refactored to be more generic (other pages call it too) or we should create other methods for the other pages  
function refreshByLocation(){
	$(".console").html("Verifying...");
	loadCitiesAjax();
}



// utility function that loads cities with events and the number of events per city updating the GUI layer then
// It is called by refresh function() and when the user opens the search part of the application (search by location) 
function loadCitiesAjax(){

    // callback function invocation
    $(".console").html("Downloading ws data...");

    var eventLocal;
    var event;
    // Create WS url
   
    // create ws url based on the city id clicked
    var urlByCity = AjaxEventHelper.getRootURL() + 'events/location/country/pt';
    // invoke web service
    AjaxEventHelper.createGETRequestAjax(urlByCity, function(data){
		var html = '';
		$.each(data, function(index, item) {
			html += '<li id="' + item.city+'"><a href="#eventsByCityPage">' + item.city + '<span class=ui-li-count>' + item.nbrEvents + '</span> </a> </li>';
			var list = item.eventList;
			for(var i = 0; i < list.length ; i++) {	
				var _event = list[i];
				EventListApp.addEvent(_event);
			}
		});
		console.log(html);
  		$("#locationSearchList").html(html);
  		$("#locationSearchList").listview('refresh');
  		$(".console").html("Data refreshed ..");
    });
	

}


// function for creating events by city page	
function loadEventsByCitiesInMemory(city) {
	console.log('city:' + city);
	// create event var
	var event;
	// obtain page reference
	var $page = $("#eventsByCityPage");

	// get header 
	$header = $page.children( ":jqmData(role=header)" );
	// populate header with the name of the city we are selecting
	$header.find( "h1" ).html( city );
	
	// create ws url based on the city id clicked
    var url = AjaxEventHelper.getRootURL() + 'events/location/' + city;
    var html = '';
    var eventListByCity = EventListApp.findEventsInEventListByCity(city);
    
    for(var i = 0; i < eventListByCity.length ; i++) {		
    	var _event = eventListByCity[i];
    	// Create html row for displaying event
    	html += createHtmlEventRow(_event);
        EventListApp.addEvent(_event);
	};
	console.log(html);
	$("#eventsByCitySearchList").html(html);
	$("#eventsByCitySearchList").listview('refresh');  
}

// function for creating events by city page	
function loadEventsByCitiesAjax(city) {
	
	//if (EventListApp.isConnected()) {
	console.log('city:' + city);
	// create event var
	var event;
	// obtain page reference
	var $page = $("#eventsByCityPage");

	// get header 
	$header = $page.children( ":jqmData(role=header)" );
	// populate header with the name of the city we are selecting
	$header.find( "h1" ).html( city );
	
	// create ws url based on the city id clicked
    var url = AjaxEventHelper.getRootURL() + 'events/location/country/pt/city/' + city;
    
	AjaxEventHelper.createGETRequestAjax(url, function(data){
		
		var html = '';
		$.each(data, function (i, _event) {
			// Create html row for displaying event
			html += createHtmlEventRow(_event);
	        EventListApp.addEvent(_event);
		  });
		  console.log(html);
		  $("#eventsByCitySearchList").html(html);
		  $("#eventsByCitySearchList").listview('refresh');  
    });
	/*
	} else {
		
	}*/
	
}


function createHtmlEventRow(_event) {
	var html = '';
	html += '<li ><a href="javascript:loadEventById('+ _event.id +  ')"><img alt="coverArt" src="images/mia.png" /><h3>' + _event.title + '</h3>';
    html += '<p>' + _event.startDate + '</p>';
    html += '<p>' + _event.venue.location.city + '</p>';
    html += '</a></li>';
    return html;
}

// utility function that loads event information whenever the user chooses and event - updates the GUI layer then
function loadEventById(eventId){
	// looks in the singleton object for the event clicked/choosed
	var event = EventListApp.findEventsInEventList(eventId);
	// call function to update GUI with event details
	populateEventPage(event);
} 


// Main funtion for display event function
// This function is used to populate eventDetails page with event information
// It is called by loadEventById function()
function populateEventPage(event) {
	// fetch eventDetails page
	var $page = $("#eventDetails");
	
	// fetch page header
	$header = $page.children( ":jqmData(role=header)" );
	// find h1 header and fulfill it with event title 
	$header.find( "h1" ).html( event.title );
	
	// fetch page content
	$content = $page.children( ":jqmData(role=content)" );
	
	// Create event info
	var html = '';
	html += '<p><h1><strong> ' + event.description + '</strong></h1></p>'
	html += '<p><strong> ' + event.artist.artist + '</strong></p>'
	html += '<p>' + event.startDate + '</p>'
	html += '<p><a href="'+ event.url+ '">'+  event.url +'</a></p>'
	
	
	console.log(html);	
	// we reset the eventInfo from previous chosen events
	$content.find( "#eventInfo" ).empty();
	// append the info from the last event	
	$content.find( "#eventInfo" ).append( html );
	
	
	// create venue info
	html = '';
	html += '<p><h1><strong> ' + event.venue.venueName + '</strong></h1></p>'
	html += '<p>' + event.venue.location.street + ' - ' + event.venue.location.country +'</p>'
	html += '<p>' + event.venue.location.postalCode + ' - ' + event.venue.location.city +'</p>'
	html += '<p> lat: ' + event.venue.location.latitude + 'º</p>'
	html += '<p> long:' + event.venue.location.longitude +'º</p>'
	html += '<p><a href="'+ event.venue.website + '">'+  event.venue.website +'</a></p>'
	
	// we reset the venueInfo from previous chosen events
	$content.find( "#venueInfo" ).empty();
	// append the info from the last event venue
	$content.find( "#venueInfo" ).append( html );

	var tel = 'tel:' + event.venue.phoneNumber; 
	$( "#phoneCallButton" ).attr('href', tel);
	
	// We change to the details page
	$.mobile.changePage($("#eventDetails"));
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


// ********************************************************************************
// ********************************************************************************