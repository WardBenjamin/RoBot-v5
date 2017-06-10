var unirest = require('unirest');
var Discord = require('discord.js');

module.exports = {
	name: 'advice',
	usage: 'advice',
	permission: 1,
	help: 'Gets advice.',
	main: function(bot, msg, args) {
        unirest.get('http://api.adviceslip.com/advice')
        .end(function (result) {
            var advice = JSON.parse(result.body)
            var e = new Discord.RichEmbed()
            .setFooter("Powered by adviceslip.com")
            .setTimestamp()
            .setTitle("Advice Slip #" + advice.slip.slip_id)
            .setDescription(advice.slip.advice)

            msg.channel.send({embed:e})
        })
	}
};