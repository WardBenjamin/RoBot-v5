const Discord = require('discord.js');
var unirest = require('unirest');

module.exports = {
    name: 'toa',
    type: 'utility',
    usage: 'toa <arguments>',
    permission: 1,
    help: 'Querys The Orange Alliance API for information.',
    main: function (bot, m) {
        var curYear = new Date().getFullYear();
        var args = m.content.split(" ")[0];
        var teamNumber = m.content.split(" ")[1];
        console.log(args + ", " + teamNumber);

        if (!isNaN(args)) {
            team(args)
        } else if (!isNaN(teamNumber)) {
            if (args === "team") {
                team(teamNumber)
            } else {
                m.channel.send("Please specify an argument! Accepted arguments: team");
            }
        }

        function sendEmbed(embed) {
            m.channel.send({ embed: embed })
                .then(msg => {
                    if (!m.content.endsWith('--nodel')) {
                        setTimeout(() => {
                            msg.delete();
                        }, 30000);
                    } else {
                        m.channel.send("This message will not autodelete.")
                            .then(msg => {
                                setTimeout(() => {
                                    msg.delete();
                                }, 5000);
                            })
                    }
                })
        }

        function team(num) {
            var teaminfo = new Discord.RichEmbed();
            req("team/" + num).then(b => {
                if (!b[0]) return m.channel.send("This team does not have any data on it, or it does not exist!")
                var website = b[0].Website || "None";
                teaminfo.setAuthor('FIRST® Tech Challenge Team ' + num, 'https://cdn.discordapp.com/icons/342152047753166859/4e48a7a9122137223d11090ba0792d39.jpg', 'https://www.theorangealliance.com/team/' + num)
                    .setColor(0xff9800)
                    .addField('Name', b[0].TeamNameLong + "\n(" + b[0].TeamNameShort + ")", true)
                    .addField('Rookie Year', b[0].RookieYear, true)
                    .addField('Location', b[0].City + ", " + b[0].StateProv + ", " + b[0].Country, true)
                    .addField('Website', website, true)
                    .addField('FTCRoot Page', "http://www.ftcroot.com/teams/" + num, true);
                sendEmbed(teaminfo)
            })
        }

        function req(endpoint) {
            return new Promise(
                function (resolve, reject) {
                    unirest.get("http://dev.theyellowalliance.com/api/" + endpoint)
                        .headers({ 'X-Application-Origin': bot.user.username, 'X-TOA-Key': bot.config.toa })
                        .end(function (response) {
                            resolve(response.body);
                        });
                }
            )
        }
    }
};
