var googl = require('goo.gl');
var config = require('../config.json');
const Discord = require("discord.js");

module.exports = {
	name: 'shorten',
	usage: 'shorten <URL>',
	permission: 1,
	help: 'Shortens a URL.',
	main: function(bot, msg, args) {
		googl.setKey(config.googl);
        
		googl.shorten(msg.content)
		.then(function (shortURL) {
			msg.channel.send('URL shortened to ' + shortURL)
		})
		.catch(function (err) {
			msg.channel.send(err);
			console.error(err.message);
		});
	}
};