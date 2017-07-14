module.exports = {
	name: 'take',
	type: 'moderation',
	usage: 'take <user> <role>',
	permission: 3,
	help: 'Takes a user\'s role from them',
	main: function(bot, msg) {
		if (!msg.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS') && !msg.member.hasPermission('ADMINISTRATOR') && !isCommander.indexOf(msg.author.id) > -1)
			return msg.channel.send(":x: You do not have the necessary permissions to perform this action!")
		if (!msg.guild.fetchMember(bot.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS'))
			return msg.channel.send(":x: I can't assign or deassign roles in this server!");
		if (msg.guild.fetchMember(bot.user).highestRole.comparePositionTo(role) < 1)
			return msg.channel.send(':x: I don\'t have permissions to edit this role, please check the role order!');

		var user = msg.mentions.users.array()[0];
		var roleToTake = msg.content.split(" ").splice(1).join(" ").trim();
		let role = msg.guild.roles.find("name", roleToTake);
		
		if (!role)
			return msg.channel.send(":x: Role does not exist!");
		if(!role.comparePositionTo(msg.member.highestRole) < 1)
			return msg.channel.send(":x: Your highest role is lower than this role, so you cannot deassign it!")

		msg.guild.members.get(user.id).removeRole(role).then(m => {
			if(!m.roles.has(role.id))
				msg.channel.send("Successfully removed role *" + roleToTake + "* from " + user + ".");
			else
				msg.channel.send("Failed to remove role *" + roleToTake + "* from " + user + ".");
		}).catch(console.error);
	}
};