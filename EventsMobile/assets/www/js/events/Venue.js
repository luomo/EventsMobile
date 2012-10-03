// ********************************************************************
// ********************** Javascript Venue object *********************
// ********************************************************************
EventListApp.Venue = function (id,name, location, website,phoneNumber, image){
	this.id = id;
	this.name = name;
	this.location = location;
	this.website = website;
	this.phoneNumber = phoneNumber;
	this.image = image;
}

// adding methods to Venue Object
// create method toString    
EventListApp.Venue.prototype.toString  = function(){
	return '[id:' + this.id + ' , name:' + this.name + ' , location: '+ this.location.toString() + ' ,website: ' + this.website 
				+ ' ,phoneNumber:' + this.phoneNumber + ' ,image:' + this.image + ']';
}
