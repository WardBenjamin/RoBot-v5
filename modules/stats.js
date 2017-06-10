module.exports = {
	name: 'stats',
	usage: 'stats',
	permission: 1,
	help: 'Gives the bot\'s current statistics.',
	main: function (bot, msg, args) {
		const Discord = require('discord.js');
		const os = require('os');
		const osu = require('os-utils');
		const useragent = require('useragent');
		var memory = Math.round((os.totalmem() - os.freemem()) / 1000000);
		var totalmem = Math.round(os.totalmem() / 1000000);
		var date = new Date(bot.uptime);
		var strDate = '';
		strDate += date.getUTCDate() - 1 + " d ";
		strDate += date.getUTCHours() + " h ";
		strDate += date.getUTCMinutes() + " m ";
		strDate += date.getUTCSeconds() + " s";

		osu.cpuUsage(function(v) {
			var stats = new Discord.RichEmbed()
			.setAuthor(bot.user.username + ' Stats', bot.user.avatarURL)
			.setFooter('Triggered by ' + msg.author.username, mag.author.avatarURL)
			.setTimestamp()
			.addField('Owner', 'ASIANBOI#2345\n(171319044715053057)', true)
			.addField('Library', 'discord.js', true)
			.addField(':speaking_head: Servers', bot.guilds.size, true)
			.addField(':keyboard: Channels', bot.channels.size, true)
			.addField(':man: Users Served', bot.users.size, true)
			.addField(':clock1: Uptime', strDate, true)
			.addField(':floppy_disk: RAM Usage', memory + "MB / " + totalmem + " MB", true)
			.addField(':desktop: CPU Usage', v.toFixed(2) * 100 + "%", true)
			.addField(':map: Host', os.hostname() + '(' + os.type() + ')', true)

			msg.channel.send({embed:stats});
		});
	}
};