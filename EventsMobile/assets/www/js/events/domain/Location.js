// ************************************************************ 
// ***************** Javascript Location object *************** 
// ************************************************************
var Location = function ( city, country, street, postalCode, latitude, longitude){
	this.city = city;
	this.country = country;
	this.street = street;
	this.postalCode = postalCode;
	this.latitude = latitude;
	this.longitude = longitude;
}
// adding methods to Location Object
// create method toString    
Location.prototype.toString  = function(){
	return '[city: '+ this.city + ' ,country: ' + this.country + ' ,street:' + this.street 
				+ ' ,postalCode:' + this.postalCode +' ,latitude:' + this.latitude +' ,longitude:' + this.longitude + ']';
}