var AjaxEventHelper = function(){
		//var rootURL = 'http://localhost:8081/EventServiceApp/resources/';
		var rootURL = 'http://localhost/crossDomain/';
		
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
			createGETRequestAjax : function(url, callbackfuntion){
				console.log(url);
				//Starting loading animation        
				$.mobile.showPageLoadingMsg();
					
				$.ajax({
			        type: 'GET',
			        url: url,
			        dataType: 'json', // data type of response
			        success: callbackfuntion,
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
			createPOSTRequestAjax : function(url, callbackfuntion, dataToBePosted){
				console.log(url);
				$.ajax({
			        type: 'POST',
			        url: url,
			        contentType: "application/json; charset=utf-8",
			        dataType: 'json', // data type of response  try jsonp
			        data:dataToBePosted,// JSON.stringify({username:"test", password:"data"}),//{ username: "John", password: "2pm" } , //dataToBePosted,// jsonData:   dsfsdkfsld
			        success: callbackfuntion,
			        error: errorFunction,
					statusCode: {
					    404: function() {
					      alert("page not found");
					    }
					 }
			    });
			} 
			
		}
	}(); 