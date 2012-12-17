// ********************************************************
// *************** Javascript User object ***************
// ******************************************************** 	
var User = function (id, username, password, favourtites){
	this.id = id;
	this.username = username;
	this.password = password;
	this.favourtites = favourtites;
}
// adding methods to User Object
// create method toString    
User.prototype.toString  = function(){
	return '[id:' + this.id + ' ,username: '+ this.username + ',password: '+ this.password + ',favourtites: '+ this.favourtites + ']';
}