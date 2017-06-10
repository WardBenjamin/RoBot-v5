const config = require("../config.json");

exports.run = (bot, funcs, guild) => {
    funcs.addServer(guild);
	funcs.sendServerCount(bot);
    bot.user.setGame(config.prefix + 'help | ' + bot.guilds.size + ' Servers');
    bot.users.get(config.owner).send("I joined **" + guild.name + "** (" + guild.id + ") with **" + guild.members.size + "** members. It's owner is **" + guild.owner.user.username + "** (" + guild.owner.user.id + "). I am now in " + bot.guilds.size + " guilds.")
}