const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('servers.sqlite');
const fs = require("fs");
const unirest = require("unirest");
const config = require("./config.json");

exports.syncServers = function(bot) {
	db.serialize(function() {
		db.run("CREATE TABLE IF NOT EXISTS servers (id VARCHAR(25) PRIMARY KEY, name VARCHAR(100), prefix VARCHAR(10), welcomeChannel VARCHAR(25), welcomeMessagesEnabled BOOLEAN, welcomeMessage VARCHAR(200), modMessagesChannel VARCHAR(25), modMessagesEnabled BOOLEAN)");
		bot.guilds.forEach(guild => {
			db.run(`INSERT OR IGNORE INTO servers VALUES (${guild.id}, "${guild.name}", "${config.prefix}", ${guild.defaultChannel.id}, 0, "Welcome {user} to the server!", ${guild.defaultChannel.id}, 0);`)
		});
	});
	console.log("Servers synced.")
}

exports.removeServer = function(guild) {
	db.run(`DELETE FROM servers WHERE id = ${guild.id}`);
	console.log(guild.name + " successfully removed from the database!");
}

exports.addServer = function(guild) {
	db.run(`INSERT INTO servers VALUES (${guild.id}, "${guild.name}", "${config.prefix}", ${guild.defaultChannel.id}, 0, "Welcome {user} to the server!", ${guild.defaultChannel.id}, 0);`)
	console.log(guild.name + " successfully inserted into the database!");
}

exports.setPrefix = function(prefix, guild) {
	db.run("UPDATE servers SET prefix = \"" + prefix + "\" WHERE id = " + guild.id);
	return prefix;
}

exports.getPrefix = function(bot, msg, callback) {
	db.all("SELECT * FROM servers WHERE id = " + msg.guild.id, function(err, rows) {
		if(err) 
			console.log(err);
		else 
			callback(bot, msg, rows[0].prefix, this);
	});
}

exports.displayServers = function(msg) {
	db.each("SELECT * FROM servers", function(err, row) {
		if (err)
			msg.channel.send(err);
		else
			msg.channel.send("```\nServer ID: " + row.id + "\nName: " + row.name + "\nPrefix" + row.prefix + "\nWelcome Channel: " + row.welcomeChannel + "\nWelcome Messages Enabled: " + row.welcomeMessagesEnabled + "\nWelcome Message: " + row.welcomeMessage + "\nMod Messages Channel: " + row.modMessagesChannel + "\nMod Messages Enabled: " + row.modMessagesEnabled + "\n```")
	});
}

exports.displayServer = function(msg, serverID) {
	db.run(`SELECT * FROM servers WHERE id = ${serverID}`, function(err, row) {
		if (err)
			msg.channel.send(err);
		else
			msg.channel.send("```\nServer ID: " + row.id + "\nName: " + row.name + "\nPrefix" + row.prefix + "\nWelcome Channel: " + row.welcomeChannel + "\nWelcome Messages Enabled: " + row.welcomeMessagesEnabled + "\nWelcome Message: " + row.welcomeMessage + "\nMod Messages Channel: " + row.modMessagesChannel + "\nMod Messages Enabled: " + row.modMessagesEnabled + "\n```")
	});
}

exports.enabled = function(command, guild) {
    return true;
}

exports.sendServerCount = function(bot) {
	unirest.post("https://bots.discordlist.net/api")
	.send({"token": config.dlist, "servers": bot.guilds.size})
	.end(function (response) {
		console.log(response.body);
	});

	unirest.post("https://bots.discord.pw/api/bots/" + bot.user.id + "/stats")
	.headers({'Authorization': config.dbotspw, 'Content-Type': 'application/json'})
	.send({"server_count": bot.guilds.size})
	.end(function (response) {
		console.log(response.body);
	});

	unirest.post("https://discordbots.org/api/bots/" + bot.user.id + "/stats")
	.headers({'Authorization': config.dbotsorg, 'Content-Type': 'application/json'})
	.send({"server_count": bot.guilds.size})
	.end(function (response) {
		console.log(response.body);
	});

	console.log("All server counts posted successfully!");
}

exports.handler = function(bot, msg, prefix, funcs) {
	if (msg.content.startsWith(prefix)) {
		let args = msg.content.substring(msg.content.indexOf(" ") + 1, msg.content.length).split(" "),
			content = msg.content.substring(msg.content.indexOf(" ") + 1, msg.content.length),
			command = msg.content.split(" ").shift().slice(prefix.length);
		
		try {
			var found = false;
			var files = fs.readdirSync("./modules/");
			for(var i = 0; i < files.length; i++) {
				if(files[i].substring(0, files[i].indexOf('.')) == command) found = true;
			}
			if(found) {
				msg.content = content;
				console.log(msg.author.username + " executed " + command + " in " + msg.channel.name + " in " + msg.guild.name);
				require(`./modules/${command}.js`).main(bot, msg, args);
			}
		} catch (err) {
			msg.channel.send(err.toString());
			console.error(err);
		}
	}
}