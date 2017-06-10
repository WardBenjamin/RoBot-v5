module.exports = {
	name: 'sudosay',
	usage: 'sudosay',
	permission: 6,
	help: 'Makes the bot say something.',
	main: function(bot, msg, args) {
		if (msg.author.id === "171319044715053057") {
			msg.channel.send(msg.content);
			msg.delete();
		}
	}
};
