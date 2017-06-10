const unirest = require('unirest');
const config = require('../config.json');
const fs = require('fs');

exports.run = (bot, funcs) => {
	funcs.sendServerCount(bot);
	funcs.syncServers(bot);
	
	var currentTime = new Date(),
		hours = currentTime.getHours(),
		minutes = currentTime.getMinutes(),
		seconds = currentTime.getSeconds()
	if (minutes < 10)
		minutes = "0" + minutes;
	if (seconds < 10)
		seconds = "0" + seconds;
	str = '[' + hours + ':' + minutes + ':' + seconds + ']';
	console.log(`${bot.user.username} is online and ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers!`);
	
	let games = [`with ASIANBOI`, `in the FIRST Robotics Competition server`, `in ${bot.guilds.size} servers`, `join my support server! https://discord.io/RoBot`];
	bot.user.setGame(games[Math.round(Math.random() * (games.length - 1))] + ' | @' + bot.user.username + ' What\'s your prefix?');
	setInterval(() => {
		bot.user.setGame(games[Math.round(Math.random() * (games.length - 1))] + ' | ' + config.prefix + 'help');
	}, 300000);
}