// *********************************************************************
// ********************** Javascript Event object **********************
// *********************************************************************
// javascript Event object associated with our global singleton object
// This object will be the main javascript object for events 	
var Event = function (id, title, startDate, description, image, attendance,  price, tag, status, owner, processDate, url, artist, venue){
	this.id = id;
	this.title = title;
	this.startDate = startDate;
	this.description = description;
	this.image = image;
	this.attendance = attendance;
	this.price = price;
	this.tag = tag;
	this.status = status;
	this.owner = owner;
	this.syncStatus = 0;
	this.processDate = processDate;
	this.url = url;
	this.artist = artist;
	this.venue = venue;
	this.isFavourite = 0;
};

// adding methods to Event Object

//Create a full Event JavaScript Object based on event object returned by restfull ws
Event.createEventJSObjectBasedOnJsonAjaxReq = function(eventJson) {
	var event;
	//console.log("jsonObject: " + eventJson);
	event = new Event( eventJson.id, eventJson.title, eventJson.startDate, eventJson.description, eventJson.image, eventJson.attendance,  
	  					eventJson.price, eventJson.tag, eventJson.status, eventJson.owner, eventJson.processDate, eventJson.url,
  						new Artist(eventJson.artist.id, eventJson.artist.artist),
  						new Venue(  eventJson.venue.id, 
									eventJson.venue.name,
			 						new Location(eventJson.venue.location.city,
		 							   						  eventJson.venue.location.country,
		 							   						  eventJson.venue.location.street,
		 							   						  eventJson.venue.location.postalCode,
		 							   						  eventJson.venue.location.latitude,
		 							   						  eventJson.venue.location.longitude  ),
  						 eventJson.venue.website,
  						 eventJson.venue.phoneNumber,
  						 eventJson.venue.image));
	//console.log("jsObject: " + event);
	//console.log("Stringify: " + JSON.stringify(event));
	return event;
}
// orderBy title asc
Event.orderByTitleASC = function (e1 , e2){
	return e1.title.toUpperCase > e2.title.toUpperCase ? 1 : -1;
}

Event.prototype.setStatusToSyncNeeded  = function(){
	this.syncStatus = 1;
}

//create method toString (doing like this is not defined in the global namespace). It belong to the class and aren't created everytime an object is created.   
Event.prototype.toString  = function(){
	return '[id:' + this.id + ' ,title: '+ this.title + ' ,startDate: ' + this.startDate + ' ,description:' + this.description + 
				' ,image:' + this.image +' ,attendance:' + this.attendance +' ,price:' + this.price +' ,tag:' + this.tag + ' ,status:' + this.status +
				' ,owner:' + this.owner +' ,processDate:' + this.processDate + ' ,url:' + this.url +' ,artist:' + this.artist.toString() +' ,venue:' + this.venue.toString() +']';
}