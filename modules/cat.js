var unirest = require('unirest');

module.exports = {
    name: 'cat',
    usage: 'cat',
    permission: 1,
    help: 'Returns a random cat picture.',
    main: function(bot, msg, args) {
		unirest.get("http://random.cat/meow")
        .end(function (result) {
            msg.channel.send(result.body.file)
        });
	}
};