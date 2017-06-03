const Discord = require('discord.js');
const bot = new Discord.Client(require("./config.json").opts);
const funcs = require('./funcs.js');
const fs = require('fs');

bot.login(require("./config.json").token);

bot.on('error', (e) => console.error(e));
bot.on('warn', (e) => console.warn(e));
bot.on('debug', (e) => console.info(e));

fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		bot.on(file.split('.')[0], (...args) => {
			require(`./events/${file}`).run(bot, funcs, ...args);
		});
	});
});
