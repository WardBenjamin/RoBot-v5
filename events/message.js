const config = require("../config.json");

exports.run = (bot, funcs, msg) => {
	if (msg.author.bot) return;
	if (!msg.content.startsWith(config.prefix)) return;

	let command = msg.content.split(' ')[0].slice(config.prefix.length),
		content = msg.content.substring(config.prefix.length, msg.content.length),
		args = content.substring(content.indexOf(" ") + 1, content.length) || "";
	
	try {
		if(funcs.has(command) !== undefined && funcs.enabled(command, msg.guild)) {
			msg.content = args || msg.content;
			console.log(msg.author.username + " executed " + command + " in " + msg.channel.name + " in " + msg.guild.name);
			let moduleFile = require(`../modules/${command}.js`);
			moduleFile.main(bot, msg, args);
		}
	} catch (err) {
		console.error(err);
	}
}