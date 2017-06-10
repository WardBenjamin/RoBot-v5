module.exports = {
	name: 'sudoleave',
	usage: 'sudoleave',
	permission: 6,
	help: 'Makes the bot leave a server.',
	main: function(bot, msg, args) {	
		if (msg.author.id === "171319044715053057") {
            msg.channel.send("Leaving this server in 5 seconds :ok_hand:");
			
			setTimeout(() => {msg.guild.leave()}, 5000)
			bot.users.get("171319044715053057").send("I left " + msg.guild.name);
        }
	}
};