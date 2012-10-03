// *********************************************************************
// ********************** Javascript Event object **********************
// *********************************************************************
// javascript Event object associated with our global singleton object
// This object will be the main javascript object for events 	
EventListApp.Event = function (id, title, startDate, description, image, attendance,  price, tag, owner, processDate, url, artist, venue){
	this.id = id;
	this.title = title;
	this.startDate = startDate;
	this.description = description;
	this.image = image;
	this.attendance = attendance;
	this.price = price;
	this.tag = tag;
	this.owner = owner;
	this.processDate = processDate;
	this.url = url;
	this.artist = artist;
	this.venue = venue;
};

// adding methods to Event Object
// create method toString (doing like this is not defined in the global namespace). It belong to the class and aren't created everytime an object is created.   
EventListApp.Event.prototype.toString  = function(){
	return '[id:' + this.id + ' ,title: '+ this.title + ' ,startDate: ' + this.startDate + ' ,description:' + this.description + 
				' ,image:' + this.image +' ,attendance:' + this.attendance +' ,price:' + this.price +' ,tag:' + this.tag +
				' ,owner:' + this.owner +' ,processDate:' + this.processDate + ' ,url:' + this.url +' ,artist:' + this.artist.toString() +' ,venue:' + this.venue.toString() +']';
}