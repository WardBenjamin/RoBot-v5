var funcs = require("../funcs.js");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('servers.sqlite');

module.exports = {
	name: 'settings',
	usage: 'settings <arguments>',
	permission: 4,
	help: 'Changes server settings.',
	main: function(bot, msg, args) {
		if (!msg.member.hasPermission('MANAGE_GUILD')) return msg.reply("you do not have permission to manage this server's setings!")
		
		if (args[0] == "greeting") {
			getWelcomeMessageStatus(msg.guild.id).then(value => {
				var str, str2;
				if(value) {
					str = "on";
                    str2 = "off";
                }
				else {
					str = "off";
                    str2 = "on";
                }
				msg.channel.send("The welcome message for this server is **" + str + "**. Do you want to turn it **" + str2 + "**?");
			})
		} else {
			msg.reply("please specify an argument!")
		}

		function getWelcomeMessageStatus (id) {  
			return new Promise((resolve, reject) => {
				db.all("SELECT * FROM servers WHERE id = " + id, function(err, rows) {
					if(rows[0].welcomeMessagesEnabled == 1)
						resolve(true);
					resolve(false);
				});
			})
		}
	}
};