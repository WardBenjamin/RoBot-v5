module.exports = {
	name: 'restart',
	usage: 'restart',
	permission: 6,
	help: 'Restarts the bot.',
	main: function(bot, msg, args){
		if (msg.author.id === "171319044715053057") {
			msg.channel.sendMessage(":wave: RoBot is restarting...");

			setTimeout(function() {
				process.exit();
			}, 2000);
		} else {
			msg.channel.sendMessage(msg.author + ": You do not have permission to do this!")
		}
	}
};
