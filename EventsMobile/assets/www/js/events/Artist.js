// ********************************************************
// *************** Javascript Artist object ***************
// ******************************************************** 	
var Artist = function (id, artist){
	this.id = id;
	this.artist = artist;
}
// adding methods to Artist Object
// create method toString    
Artist.prototype.toString  = function(){
	return '[id:' + this.id + ' ,artist: '+ this.artist + ']';
}