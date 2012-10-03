// ********************************************************
// *************** Javascript Artist object ***************
// ******************************************************** 	
EventListApp.Artist = function (id, artist){
	this.id = id;
	this.artist = artist;
}
// adding methods to Artist Object
// create method toString    
EventListApp.Artist.prototype.toString  = function(){
	return '[id:' + this.id + ' ,artist: '+ this.artist + ']';
}