module.exports = {
	name: 'emoji',
	usage: 'emoji',
	permission: 1,
	help: 'Returns a random emoji.',
	main: function(bot, msg, args) {
		var emoji = require('emoji-random');
		msg.channel.send(emoji.random());
	}
};