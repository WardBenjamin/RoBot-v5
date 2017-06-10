module.exports = {
	name: 'setprefix',
	usage: 'setprefix <newprefix>',
	permission: 4,
	help: 'Sets the prefix for the server.',
	main: function(bot, msg, args) {
        if (!msg.member.hasPermission('MANAGE_GUILD')) {
            msg.reply("you do not have permission to change this server's prefix!")
            return;
        }
        if (msg.content.trim().length > 10) {
            msg.channel.send("That prefix is too long! Limit is 10 characters.");
            return;
        }
		var prefix = require("../funcs.js").setPrefix(msg.content.trim(), msg.guild);
        if(prefix != undefined)
            msg.channel.send("Server prefix successfully set to `" + prefix + "`!")
	}
};