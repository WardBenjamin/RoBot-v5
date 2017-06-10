const Discord = require("discord.js");

module.exports = {
	name: 'prune',
	usage: 'prune <amount>',
	permission: 2,
	help: 'Prunes messages from the channel.',
	main: function(bot, msg, args) {
		if (msg.member.hasPermission('MANAGE_MESSAGES') || msg.author.id === "171319044715053057") {
			var num = msg.content;
			if (!isNaN(num)) {
				msg.channel.fetchMessages({limit: num})
					.then(messages => msg.channel.bulkDelete(messages))
					.catch(msg.channel.bulkDelete);

				msg.channel.sendMessage("Deleted " + num + " messages under request of <@" + message.author.id + ">")
				.then(msg => setTimeout(function() {msg.delete()}, 5000));
			} else {
				msg.channel.sendMessage("Please specify a number!");
			}
		}
	}
};
