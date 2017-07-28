var fs = require("fs"),
    afkJson = fs.readFileSync("./afk.json"),
    afk = JSON.parse(afkJson);

module.exports = {
	name: 'afk',
    type: 'fun',
	usage: 'afk <reason>',
	permission: 1,
	help: 'Sets your afk status.',
	main: function(bot, msg) {
        var afkJson = fs.readFileSync("./afk.json"),
        afk = JSON.parse(afkJson);
		let mentions = msg.mentions;
		if (mentions.everyone)
			return msg.channel.send("You're not allowed to mention everyone with this command!");
        bot.getPrefix(msg).then(prefix => {
            if(msg.content == prefix + "afk")
                var reason = "Not Specified"
            else
                var reason = msg.content.replace('@everyone', '@nope').replace('@here', '@nope');

            if (reason.length > 150)
                return msg.channel.send("Your AFK reason can't be above 150 characters!");
            afk.push({
                "name": msg.author.username,
                "id": msg.author.id,
                "reason": reason
            });
            fs.writeFileSync("./afk.json", JSON.stringify(afk, null, 3));
            msg.channel.send(":robot: **" + msg.member.displayName + "** is AFK: **" + reason + "**");
        })
	}
};