const sqlite3 = require('sqlite3').verbose();

exports.syncServers = {
	
}

exports.enabled = function(command, guild) {
    return true;
}

exports.has = function(command) {
    return true;
}