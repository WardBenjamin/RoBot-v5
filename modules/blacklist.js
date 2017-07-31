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
        for(var i = 0; i < blacklist.length; i++) {
            if(blacklist[i] == id)
                msg.reply("they're already blacklisted you idiot!")
            else {
                blacklist.push(id);
                fs.writeFileSync("./blacklist.json", JSON.stringify(blacklist, null, 3));
                msg.channel.send("User ID " + msg.content + " has been blacklisted!");
            }
        }
	}
};