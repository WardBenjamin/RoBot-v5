module.exports = {
    name: 'dog',
    usage: 'dog',
    permission: 1,
    help: 'Returns a random dog picture.',
    main: function(bot, msg, args) {
		const randomPuppy = require('random-puppy');
        randomPuppy().then(url => {
            msg.channel.send(url);
        })
	}
};