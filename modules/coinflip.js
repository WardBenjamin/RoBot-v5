module.exports = {
	name: 'coinflip',
	usage: 'coinflip',
	permission: 1,
	help: 'Flips a coin.',
	main: function(bot, msg, args) {
		let coin = Math.random() > 0.5 ? 'Heads' : 'Tails'
		msg.channel.send("The coin landed on " + `${coin}!`);
	}
};