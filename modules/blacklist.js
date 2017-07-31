var fs = require("fs"),
    blacklistJson = fs.readFileSync("./blacklist.json"),
    blacklist = JSON.parse(blacklistJson);

module.exports = {
	name: 'blacklist',
    type: 'core',
	usage: 'blacklist <id>',
	permission: 1,
	help: 'Adds a user to the blacklist.',
	main: function(bot, msg) {
		let id = msg.content;
        blacklist.push(id);
        fs.writeFileSync("./blacklist.json", JSON.stringify(blacklist, null, 3));
        msg.channel.send("User ID " + msg.content + " has been blacklisted!");
	}
};