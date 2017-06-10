module.exports = {
	name: 'git',
	usage: 'git',
	permission: 1,
	help: 'Returns the bot\'s GitHub repository.',
	main: function(bot, msg, args) {
		msg.reply("Check out my GitHub at https://github.com/FRCDiscord/RoBot");
	}
};
