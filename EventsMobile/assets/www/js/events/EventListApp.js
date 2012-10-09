// **************************************************************************************************
// ********************************** Event Singleton application ***********************************
// **************************************************************************************************
// creation of a singleton object (as advised in mobile javascript mobile development book)
// One of the ideas is to create a singleton object that will maintain application state.
// When we add html5 offline support all the caching mechanism will be placed in this object 
var EventListApp = function () { 
	var list;
	
	
	function findEventById(eventId) {
		for(i=0;i < list.length; i++){
	  		var event = list[i];
	  		if(event && event.id === eventId) 
	  			return event;
		};
		return null;
	}
	
	function contains(eventId) {
		for(i=0;i < list.length; i++){
	  		var event = list[i];
	  		if(event && event.id === eventId) 
	  			return true;
		};
		return false;
	}
	
	function populateListFromDB() {
		
	}
	
	function findEventIndex(eventId){
		var index = -1;
		for(i=0;i < list.length; i++){
	  		var event = list[i];
			if(event.id == eventId) {
				return i;
			}
		}
		return index;
	} 
	
	return {
		init : function() {
			alert('Init()');
			list = new Array();
			EventDbDao.init();
		},
		clear : function(){
			list = [];
			EventDbDao.clear();
		},
		size : function(){
			return list.length;
		},
		addEvent : function(eventJson){
			// NOTE: it shouldn't be like this because if the same event has been edited we would stay with the previous version (depends on how the server  
			//       backend will treat new events on batch .. I think its always better to remove previous ones)
			console.log("addEvent:jsonObject: " + eventJson);
			var event = Event.createEventJSObjectBasedOnJsonAjaxReq(eventJson);
			console.log("addEvent:jsObject: " + event);
			// find Event on memory List
			var eventMemory = findEventById(event.id);
			// if not defined we can added to our list and persist in our local database
			if(eventMemory == undefined ) {
				EventDbDao.addEvent(event);
				list.push(event);
			} else {
				// if exists we have to validate if process date are different. If so we have to update in memory list and in local database
				var processDateDB = eventMemory.processDate;
				var processDateWS = event.processDate;
				if(processDateWS > processDateDB) {
					eventMemory = event;
					// update in local database
					EventDbDao.updateEvent(event.id);
				}
			}
			
		}, 
		removeEvent : function(eventId){
			console.log("removeEvent:id: " + eventId);
			var eventIdx = findEventIndex(eventId);
			if (eventIdx !== -1) {
				list.splice(eventIdx, 1);
				EventDbDao.removeEvent(eventId);
			}
			
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
		}, 
		findAllEventsGroupedByCity : function() {
			var map = new Object();
			for(i=0;i < list.length; i++){
				event = list[i];
				var city = event.venue.location.city;
				if(map[city] == undefined ) {
					map[city] = new Array(); 
				} 
				map[city].push(event);
			}
			
			return map;
		}
	}
}(); // for what I read what makes it singleton are these last '()' !?!?? strange .. ah