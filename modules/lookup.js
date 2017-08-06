module.exports = {
    name: 'lookup',
    type: 'utility',
    usage: 'lookup <invite-code>',
    permission: 1,
    help: 'Shows information about an invite.',
    main: function (bot, msg) {
        bot.fetchInvite(msg.content).then(invite => {
            var e = new Discord.RichEmbed()
                .setTitle("🔗 Information about invite code " + msg.content.toUpperCase())
                .setColor(0x1675DB)
                .setFooter('Triggered by ' + msg.author.username, msg.author.avatarURL)
                .setTimestamp()
                .addField('Guild Name', invite.guild.name)
                .addField('Guild ID', invite.guild.id)
                .addField('Created', invite.guild.createdAt.toLocaleString())
                .addField('Invite Channel', "**#" + invite.channel.name + "** (" + invite.channel.id + ")")
            if (invite.guild.splash != null)
                e.setDescription(":partner: **Partnered Server** :partner:")
            if (invite.guild.spashURL != null)
                e.setIcon(invite.guild.splashURL)
            msg.channel.send({ embed: e });
        })
    }
};