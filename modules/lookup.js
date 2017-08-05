module.exports = {
    name: 'lookup',
    type: 'utility',
    usage: 'lookup <invite-code>',
    permission: 1,
    help: 'Shows information about an invite.',
    main: function (bot, msg) {
        bot.fetchInvite(msg.content).then(invite => {
            if(invite) {
                var inviter = invite.inviter.username || "N/A",
                    uses = invite.uses || 0,
                    maxUses = invite.maxUses || 0

                const Discord = require('discord.js');
                var embed = new Discord.RichEmbed()
                    .setTitle("🔗 Information about invite code " + msg.content)
                    .setColor(0x1675DB)
                    .setFooter('Triggered by ' + msg.author.username, msg.author.avatarURL)
                    .setThumbnail(msg.guild.iconURL)
                    .setTimestamp()
                    .addField('Guild Name', invite.guild.name, true)
                    .addField('Guild ID', invite.guild.id)
                    .addField('Created', msg.guild.createdAt.toLocaleString())
                    .addField('Invite Channel', "**#" + invite.channel.name + "** (" + invite.channel.id + ")")
                    .addField('Inviter', inviter)

                if(invite.guild.splash)
                    embed.setDescription("<:partner:314068430556758017> Partnered Server <:partner:314068430556758017>")
                msg.channel.send({embed:embed});
            } else {
                msg.reply("that isn't a valid invite code!")
            }
        })
    }
};