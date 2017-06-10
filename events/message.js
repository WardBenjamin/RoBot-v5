const config = require("../config.json");
const fs = require("fs");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../servers.sqlite');

exports.run = (bot, funcs, msg) => {
	if (msg.author.bot || !msg.channel.type === "text") return;

	if (msg.isMentioned(bot.user)) {
		let args = msg.content.substring(msg.content.indexOf(" ") + 1, msg.content.length).split(" "),
			content = msg.content.substring(msg.content.indexOf(" ") + 1, msg.content.length);

		if(content.toLowerCase() == "what's your prefix?") {
			funcs.getPrefix(bot, msg, sendPrefix);
		}
	}

	funcs.getPrefix(bot, msg, funcs.handler);

	function sendPrefix(bot, msg, prefix, funcs) {
		msg.reply("my prefix for this server is `" + prefix + "`!")
	}
}
