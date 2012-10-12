var AjaxEventHelper = function(){
		//var rootURL = 'http://localhost:8080/EventServiceApp/resources/';
		var rootURL = 'http://localhost/crossDomain/';
	    //var rootURL = 'http://192.168.1.69:8080/EventServiceApp/resources/';
		//var rootURL = 'http://10.197.100.70:8080/EventServiceApp/resources/';
		//var rootURL = 'http://192.168.20.8/crossDomain/';

		
		errorFunction = function(xhRequest, ErrorText, thrownError){
			console.log('xhRequest: ' + xhRequest.responseText);
			console.log('ErrorText: ' + ErrorText);
			console.log("thrownError: "  + thrownError);
			$.mobile.hidePageLoadingMsg();
			$('.console').html('Error conecting to webservice');
			alert('Error conecting to requested web Service ..check log console');
		}
		
		return {
			getRootURL : function(event){
				return rootURL;
			}, 
			createGETRequestAjax : function(url, callback){
				console.log("createGETRequestAjax: " + url);
				//Starting loading animation        
				//$.mobile.showPageLoadingMsg();
					
				$.ajax({
			        type: 'GET',
			        url: url,
			        dataType: 'json', // data type of response
			        success: callback,
			        error: errorFunction,
					statusCode: {
					    404: function() {
					      alert("page not found");
					    }
					}
			    });
			    /*
			    .then(function(){
					//cue the page loader   
			    	$.mobile.hidePageLoadingMsg();
			    });*/
			},
			createPOSTRequestAjax : function(url, callback, dataToBePosted){
				console.log("createPOSTRequestAjax: " + url);
				//Starting loading animation        
				$.mobile.showPageLoadingMsg();
				
				$.ajax({
			        type: 'POST',
			        url: url,
			        contentType: "application/json; charset=utf-8",
			        dataType: 'json', // data type of response  try jsonp
			        data:dataToBePosted,// JSON.stringify({username:"test", password:"data"}),//{ username: "John", password: "2pm" } , //dataToBePosted,// jsonData:   dsfsdkfsld
			        success: callback,
			        error: errorFunction,
					statusCode: {
					    404: function() {
					      alert("page not found");
					    }
					 }
			    }).then(function(){
					//cue the page loader   
			    	$.mobile.hidePageLoadingMsg();
			    });
			}, createPUTRequestAjax : function(url, callback, dataToBePosted){
				console.log("createPutRequestAjax: " + url);
				//Starting loading animation        
				$.mobile.showPageLoadingMsg();
				
				$.ajax({
					type: 'PUT',
					url: url,
					contentType: "application/json; charset=utf-8",
					dataType: 'json', // data type of response  try jsonp
					data:dataToBePosted,// JSON.stringify({username:"test", password:"data"}),//{ username: "John", password: "2pm" } , //dataToBePosted,// jsonData:   dsfsdkfsld
					success: callback,
					error: errorFunction,
					statusCode: {
						404: function() {
							alert("page not found");
						}
					}
				}).then(function(){
					//cue the page loader   
					$.mobile.hidePageLoadingMsg();
				});
			},
			createDELETERequestAjax : function(url, callback) {
				console.log("createDELETERequestAjax: " + url);
				//Starting loading animation        
				$.mobile.showPageLoadingMsg();
				
				$.ajax({
			        type: 'DELETE',
			        url:  url,
			        success: callback,
			        error: errorFunction
			    }).then(function(){
					//cue the page loader   
			    	$.mobile.hidePageLoadingMsg();
			    }); 
			}
			
		}
	}(); 