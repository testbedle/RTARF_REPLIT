const Discord = require('discord.js');
const config = require('../../config/config');
const Blacklisted = require('../Database/blacklisted.json');
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
    if (Blacklisted.length > 0) {
        const List = new Discord.MessageEmbed()
            .setTitle(`${bot.user.username} | Blacklisted Users: ${Blacklisted.length}`)
            .setDescription(`${Blacklisted}`)
            .setColor(config.colorsuccess)
        message.channel.send(List);
    } else {
        const noList = new Discord.MessageEmbed()
            .setTitle(`${bot.user.username} | Blacklisted Users: ${Blacklisted.length}`)
            .setDescription(`ไม่พบผู้ที่โดน Blacklist.`)
            .setColor(config.colorfail)
        message.channel.send(noList);
    };
};

exports.conf = { aliases: [] };