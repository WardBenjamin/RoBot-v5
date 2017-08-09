module.exports = {
	name: 'server',
	type: 'utility',
	usage: 'server',
	permission: 1,
	help: 'Provides information about the server.',
	main: function(bot, msg) {
		const Discord = require('discord.js');
		const embed = new Discord.RichEmbed()
			.setTitle(msg.guild.name)
			.setColor(0x1675DB)
			.setFooter('Triggered by ' + msg.author.username, msg.author.avatarURL)
			.setThumbnail(msg.guild.iconURL)
			.setTimestamp()
			.addField('Name', msg.guild.name, true)
			.addField('Created', msg.guild.createdAt.toLocaleString())
			.addField('ID', msg.guild.id, true)
			.addField('Owner', msg.guild.owner.user.username, true)
			.addField('Default Channel', msg.guild.defaultChannel, true)
			.addField('Region', msg.guild.region, true)
			.addField('Member Count', msg.guild.members.size, true)
			.addField('Channel Count', msg.guild.channels.size, true)
			.addField('Roles', msg.guild.roles.size, true)

			if(msg.guild.features) {
				embed.addField('Features', msg.guild.features.join('\n'))
					.setDescription('<:partner:314068430556758017> Partnered Server <:partner:314068430556758017>')
			} else {
				embed.setDescription('Server Information')
			}
		msg.channel.send({embed:embed});
	}
};