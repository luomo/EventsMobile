$( document ).bind( "mobileinit", function() {
	
    // Make your jQuery Mobile framework configuration changes here!
	    console.log("mobileinit");
	    $.mobile.allowCrossDomainPages = true;
	    $.support.cors = true;
    	//$.mobile.loadingMessage = false;
    	//$.mobile.loadingMessage = 'Loading ... ';
    	$.mobile.loadingMessageTextVisible = true;
    	$.mobile.loadingMessageTheme = 'a';
    	//$.mobile.phonegapNavigationEnabled = true
	});	