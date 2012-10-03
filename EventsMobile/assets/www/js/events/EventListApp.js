// **************************************************************************************************
// ********************************** Event Singleton application ***********************************
// **************************************************************************************************
// creation of a singleton object (as advised in mobile javascript mobile development book)
// One of the ideas is to create a singleton object that will maintain application state.
// When we add html5 offline support all the caching mechanism will be placed in this object 
var EventListApp = function () { 
	var list;
	
	return {
		init : function() {
			list = new Array();
		},
		clear : function(){
			list = [];
		},
		size : function(){
			return list.length;
		},
		addEvent : function(event){
			list.push(event);
		}, 
		findEventsInEventList : function (eventId){
			console.log("findEventsInEventList: " + eventId);
			//This should be replaced by cache mechanisms ... until then :)
			for(i=0;i < list.length; i++){
		  		var event = list[i];
		  		if(event && event.id === eventId) 
		  			return event;
			};
		}, 
		findEventsInEventListByCity : function (cityId) {
			console.log("findEventsInEventListByCity: " + cityId);
			//This should be replaced by cache mechanisms ... until then :)
			var eventsByCity = new Array();
			var event;
			for(i=0;i < list.length; i++){
				event = list[i];
		  		if(event && event.venue.location.city === cityId)
		  			eventsByCity.push(event);
			}
			return eventsByCity;
		}
	}
}(); // for what I read what makes it singleton are these last '()' !?!?? strange .. ah