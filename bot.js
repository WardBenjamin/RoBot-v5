const Discord = require('discord.js');
const bot = new Discord.Client(require("./config.json").opts);
const fs = require('fs');

bot.on('error', (e) => console.error(e));
bot.on('warn', (e) => console.warn(e));
bot.on('debug', (e) => console.info(e));

fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		bot.on(file.split('.')[0], (...args) => {
			var module = require(`./events/${file}`)
			module.run(bot, require('./funcs.js'), ...args);
		});
	});
});

bot.login(require("./config.json").token);