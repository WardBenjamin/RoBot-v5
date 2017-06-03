const unirest = require('unirest');
const config = require('../config.json');
const fs = require('fs');

exports.run = (bot, funcs) => {
	//sendServerCount(bot);
	//funcs.syncServers(bot);
	
	var currentTime = new Date(),
		hours = currentTime.getHours(),
		minutes = currentTime.getMinutes(),
		seconds = currentTime.getSeconds()
	if (minutes < 10)
		minutes = "0" + minutes;
	if (seconds < 10)
		seconds = "0" + seconds;
	str = '[' + hours + ':' + minutes + ':' + seconds + ']';
	console.log(`Ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users!`);
	
	let games = [`with ASIANBOI`, `in the FIRST Robotics Competition server`, `in ${bot.guilds.size} servers`, `join my support server! https://discord.io/RoBot`];
	bot.user.setGame(games[Math.round(Math.random() * (games.length - 1))] + ' | ' + config.prefix + 'help');
	setInterval(() => {
		bot.user.setGame(games[Math.round(Math.random() * (games.length - 1))] + ' | ' + config.prefix + 'help');
	}, 300000);
}

function sendServerCount(bot) {
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