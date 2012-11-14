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
    	//$
    	/*
    	// test para melhorar performance
    	//$.mobile.page.prototype.options.addBackBtn = true;
    	$.mobile.transitionFallbacks.slideout = "none";
    	//$.mobile.phonegapNavigationEnabled = true; // test http://jquerymobile.com/test/docs/pages/phonegap.html
    	$.mobile.buttonMarkup.hoverDelay = 0;
    	$.mobile.defaultPageTransition = 'none';
        $.mobile.defaultDialogTransition = 'none';
        $.mobile.useFastClick = true; */
    	
    	$.mobile.buttonMarkup.hoverDelay = 0;
    	$.mobile.defaultPageTransition = 'none';
        $.mobile.defaultDialogTransition = 'none';
    	$.mobile.useFastClick = true;
	});	