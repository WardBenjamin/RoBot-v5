var oneLinerJoke = require('one-liner-joke');

module.exports = {
    name: 'joke',
    type: 'fun',
    usage: 'joke <optional-category>',
    permission: 1,
    help: 'Returns a joke.',
    main: function (bot, msg) {
        msg.reply(oneLinerJoke.getRandomJoke())
    }
};