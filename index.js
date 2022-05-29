'use strict';
const discord = require('discord.js')
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
    ],
    partials: ["CHANNEL"]
})
const config = require('./config.json')

//Variables 
let prefix = '-'
let s_id = '980430959700766751'
let sroleid = '932315525416095855'
let guildid = '915652722815041557'
client.once('ready', () => {
    console.log(`\nPrefix:${prefix} \nName: ${client.user.tag}\n `);
    client.user.setPresence({ activities: [{ name: 'with new requests' }],type: 'PLAYING', status: 'idle' });
    })

// USER DM EVENT
client.on('messageCreate',async message => {
let staff = client.channels.cache.get(s_id)
if (message.channel.type != 'DM')return
if(message.author.bot) return;
let args = message.content
//new ticket to open
let guildid_f = client.guilds.cache.get(guildid)
if (!guildid_f.channels.cache.find(ch => ch.name == `ticket-${message.author.id}`)){
let embed = new MessageEmbed()
.setTitle('Hello, '+message.author.tag+'. You have successfully created a ticket! A staff member will answer you soon.')
message.author.send({embeds:[embed]}).then(() => message.react('👍'))

let guildid_f1 = client.guilds.cache.get(guildid)
guildid_f1.channels.create(`ticket-${message.author.id}`, {
    permissionOverwrites: [
        {
            id: sroleid,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
        },
        {
            id: guildid_f1.roles.everyone,
            deny: ['VIEW_CHANNEL'],
        },
    ],
    type: 'text',
}).then(async channel => {
    let s_embed = new MessageEmbed()
        .setTitle('New ticket')
        .setDescription(`The user ${message.author.tag} has a request and is waiting for our answer, please answer him regarding his question! His message:\n${args}`)
    await channel.send(`<@&${sroleid}>`)
    await channel.send({embeds:[s_embed]})
    
});
}
let guildid_f1 = client.guilds.cache.get(guildid) 
//Ticket is already there
if (guildid_f1.channels.cache.find(ch => ch.name == `ticket-${message.author.id}`)){
    message.react('👍')
    let ticket = guildid_f1.channels.cache.get(guildid_f1.channels.cache.find(ch => ch.name == `ticket-${message.author.id}`).id)
    let args = message.content 
    let embed = new MessageEmbed()
    .setDescription(`> ${args}`)
    .setFooter({text: `Sent by ${message.author.tag}`})
    ticket.send({embeds:[embed]})
}
})

client.on('messageCreate' , async message => {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
    if (!message.guild) return 
    if (message.author.bot) return; 
if (message.channel.name.includes('ticket-')){
    if (command === 'close'){
        let mcm = message.channel.name
        let userid = mcm.split("-")[1]
        let embed = new MessageEmbed()
        .setTitle('Your ticket has been resolved!')
        .setTimestamp()
        client.users.send(userid, {embeds:[embed]})
        message.channel.delete()
    }
    else{
    message.react('👍')
    let mcm = message.channel.name
    let userid = mcm.split("-")[1]
    //let user = message.guild.members.cache.get(userid)
    //user.send(message.content)
    let embed = new MessageEmbed()
    .setDescription(message.content)
    .setFooter({text:`sent by ${message.author.tag}`})
    client.users.send(userid, {embeds:[embed]}) 
    }
}
})
client.login(config.token)
      