'use strict';
const discord = require('discord.js')
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
const config = require('./config.json')

//Variables 
let prefix = '-'

client.once('ready', () => {
    console.log(`\nPrefix:${prefix} \nName: ${client.user.tag}\n `);
    client.user.setPresence({ activities: [{ name: 'with new suggestions' }],type: 'WATCHING', status: 'dnd' });
    })




client.on('messageCreate' , async message => {
    if (!message.content.includes(prefix)) return
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
    if (!message.guild) return 
    if (message.author.bot) return;




})
      