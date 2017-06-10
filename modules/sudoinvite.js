module.exports = {
	name: 'sudoinvite',
	usage: 'sudoinvite <server name>',
	permission: 6,
	help: 'Sends you an invite to the given server.',
	main: function(bot, msg, args) {
		if (msg.author.id === "171319044715053057") {
			const serverToInvite = msg.content;
			msg.channel.send("Alright I am sending you an invite to " + serverToInvite + "!");
			try {
				var server = bot.guilds.find('name', serverToInvite);
				var chan = bot.channels.get(server.id);
				chan.createInvite()
				.then(i => {
					msg.author.send("https://discord.gg/" + i.code);
				});
			}
			catch(err) {
				console.log(err);
			}
        }
	}
};