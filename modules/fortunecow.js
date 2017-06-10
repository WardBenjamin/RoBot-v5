var unirest = require('unirest');
var config = require('../config.json');

module.exports = {
	name: 'fortunecow',
	usage: 'fortunecow',
	permission: 1,
	help: 'Gets a random fortune cow.',
	main: function(bot, msg, args) {
        unirest.get('https://thibaultcha-fortunecow-v1.p.mashape.com/random')
        .header('X-Mashape-Key', config.mashape)
        .header('Accept', 'text/plain')
        .end(function (result) {
            msg.channel.send('```\n' + result.body + '\n```')
        })
	}
};