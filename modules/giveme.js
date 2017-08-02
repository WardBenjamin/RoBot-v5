//Work on integrating this with server database later
module.exports = {
	name: 'giveme',
	type: 'utility',
	usage: 'giveme <rolename>',
	permission: 1,
	help: 'Gives the user a specified role from an allowed list.',
	main: function(bot, msg) {
		var allowedRoles = [];
		if (msg.guild.id == '176186766946992128') {
			allowedRoles = ['Gaming', 'Wiring', 'Build', 'Programming', 'Marketing', 'Design', 'Awards', 'Strategy', 'Politics', 'Java', 'C++', 'LabVIEW', 'Python', 'Media', 'CS:GO', 'Civilization', 'CAH', 'DOTA', 'League of Legends', 'Overwatch', 'Rocket League', 'Minecraft'];
		} else if (msg.guild.id == '225450307654647808') {
			allowedRoles = ['Social'];
		}
		var roleToGive = msg.content.trim().toLowerCase();
		var found = false;
		var role = null;
		for (var i = 0; i < allowedRoles.length; i++) {
			if(allowedRoles[i].toLowerCase() == roleToGive) {
				found = true;
				role = msg.guild.roles.find("name", allowedRoles[i]);
			}
		}
		if (found == true) {
			var member = msg.member;
			member.addRole(role).catch(console.error);
			msg.channel.send("Successfully gave you " + role.name + "!");
		} else if (roleToGive == "list" || roleToGive == "-l") {
			var list = "List of Allowed Roles:";
			for(var i = 0; i < allowedRoles.length; i++)
				list += "\n" + allowedRoles[i];
			msg.channel.send(list);
		} else {
			msg.reply('that giveme does not exist!');
		}
	}
};

