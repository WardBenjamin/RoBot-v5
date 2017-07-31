module.exports = {
    name: 'discrim',
    type: 'utility',
    usage: 'discrim <optional-discriminator>',
    permission: 1,
    help: 'Searches for a discriminator.',
    main: function (bot, msg) {
        var discrim = msg.content || msg.author.discriminator,
            usernames = "";
        msg.channel.send("Hunting for other users with the discriminator #" + discrim + "...")
        bot.users.forEach(user => {
            if(user.discriminator == discrim)
                usernames += user.username + "\n";
        });
        if(usernames == "")
            msg.channel.send("There are no other users with your discriminator in my cache :cry:")
        else
            msg.channel.send("Change your username to one of the following to change your discriminator:```" + usernames + "```")
    }
};