const config = require("../config.json");
const fs = require("fs");

exports.run = (bot, funcs, msg) => {
	if (msg.author.bot || !msg.channel.type === "text") return;

	if (msg.isMentioned(bot.user)) {
		let args = msg.content.substring(msg.content.indexOf(" ") + 1, msg.content.length).split(" "),
			content = msg.content.substring(msg.content.indexOf(" ") + 1, msg.content.length);

		if(content.toLowerCase() == "what's your prefix?") {
			funcs.getPrefix(bot, msg, sendPrefix);
		}

		if(content.toLowerCase() == "resetprefix" && msg.member.hasPermission("ADMINISTRATOR")) {
			funcs.setPrefix(config.prefix, msg.guild);
			msg.reply('I have reset this server\'s prefix to ``' + config.prefix + '``!')
		}
	}

	funcs.getPrefix(bot, msg, funcs.handler);

	function sendPrefix(bot, msg, prefix) {
		msg.reply("my prefix for this server is `" + prefix + "`!")
	}
}
