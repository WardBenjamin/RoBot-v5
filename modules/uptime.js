module.exports = {
	name: 'uptime',
	usage: 'uptime',
	permission: 1,
	help: 'Provides the bot\'s uptime.',
	main: function(bot, msg, args) {
		var date = new Date(bot.uptime);
		var strDate = '**';
		strDate += date.getUTCDate() - 1 + " days, ";
		strDate += date.getUTCHours() + " hours, ";
		strDate += date.getUTCMinutes() + " minutes, ";
		strDate += date.getUTCSeconds() + " seconds**";
		msg.channel.send("UPTIME:\n" + strDate);
	}
};