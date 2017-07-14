module.exports = {
	name: 'restart',
	type: 'owner',
	usage: 'restart',
	permission: 6,
	help: 'Restarts the bot.',
	main: function(bot, msg){
		if (msg.author.id === require("../config.json").owner) {
			msg.channel.send(":wave: " + bot.user.username + " is restarting...");

			setTimeout(function() {
				process.exit();
			}, 1000);
		} else {
			msg.reply("you do not have permission to do this!")
		}
	}
};
