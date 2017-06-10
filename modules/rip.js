module.exports = {
	name: 'rip',
	usage: 'rip <user-mention>',
	permission: 1,
	help: 'Returns a ripme.xyz link for the mentioned user.',
	main: function(bot, msg, args) {
		msg.channel.send("**RIP " + msg.mentions.users.first().username + "**\nhttps://ripme.xyz/#" + msg.mentions.users.first().username);
	}
};