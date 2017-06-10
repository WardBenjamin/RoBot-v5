var config = require("../config.json");

module.exports = {
	name: 'reload',
	usage: 'reload <commandname>',
	permission: 6,
	help: 'Reloads a command.',
	main: function(bot, msg, args) {
		if(msg.content == "reload") return msg.channel.reply("Must provide a command name to reload.");
		if(msg.author.id != config.owner) return msg.channel.reply("you do not have permission to reload a command!")
        delete require.cache[require.resolve(`./${args[0]}.js`)];
    	msg.reply(`the command ${args[0]} has been reloaded!`);
	}
};