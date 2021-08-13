const Discord = require('discord.js');
const config = require('../../config/config');
const TrustedUsers = require('../Database/WhitelistUsers.json');
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
    if (TrustedUsers.length > 0) {
        const List = new Discord.MessageEmbed()
            .setTitle(`${bot.user.username} | Whitelist Users: ${TrustedUsers.length}`)
            .setDescription(`${TrustedUsers}`)
            .setColor(config.colorsuccess)
        message.channel.send(List);
    } else {
        const noList = new Discord.MessageEmbed()
            .setTitle(`${bot.user.username} | Whitelist Users: ${TrustedUsers.length}`)
            .setDescription(`ไม่พบผู้ที่มี Whitelist.`)
            .setColor(config.colorfail)
        message.channel.send(noList);
    };
};

exports.conf = { aliases: ["whitelisted"] };