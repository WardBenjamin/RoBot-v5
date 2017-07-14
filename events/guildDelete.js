const config = require("../config.json");

exports.run = (bot, guild) => {
    bot.funcs.removeServer(guild);
	bot.funcs.sendServerCount(bot);
    bot.user.setGame(config.PREFIX + 'help | ' + bot.guilds.size + ' Servers');
    bot.users.get(config.owner).send("I left **" + guild.name + "** (" + guild.id + ") with **" + guild.members.size + "** members. It's owner is **" + guild.owner.user.username + "** (" + guild.owner.user.id + "). I am now in " + bot.guilds.size + " guilds.")
}