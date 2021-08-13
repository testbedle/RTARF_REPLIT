const Discord = require('discord.js');
const config = require('../../config/config');
const { red, yellowBright } = require('chalk');
const TrustedUserIDs = require('../Database/WhitelistUserIDs.json');
const fs = require("fs");
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
    const Trusted = TrustedUserIDs.find((user) => user === `${message.author.id}`);
    const Mentioned = message.mentions.users.first();
    const GetMember = message.guild.member(Mentioned);
    if (!message.member.hasPermission("ADMINISTRATOR") && message.author.id !== Trusted) {
        message.channel.send(`${message.author} ไม่ได้รับอนุญาตให้ใช้คำสั่ง \`${config.prefix}blacklist\``);
        return;
    };
    if (Mentioned) {
        function Blacklist(ID) {
            const Array = require('../Database/blacklist.json');
            const Array2 = require('../Database/blacklisted.json');
            const FindID = Array.find((el) => el === ID);
            const InArray = Array.includes(FindID);
            if (InArray === true) {
                return message.reply('ผู้ใช้นี้ถูก Blacklist แล้ว.').then((msg) => msg.delete({ timeout: 4000 })) && console.log(red('ERROR: USER ALREADY BLACKLISTED'));
            } else if (isNaN(ID)) {
                return message.reply('ไม่พบผู้ใช้.') || console.error(red('ERROR: PROVIDE VALID NUMBER'));
            } else {
                Array.push(ID);
                Array2.push("<@" + ID + ">");
                console.log(yellowBright('Blacklist Successful\nData Saved ✅'));
                const content = JSON.stringify(Array);
                const content2 = JSON.stringify(Array2);
                fs.writeFileSync('commands/Database/blacklist.json', content, 'utf8');
                fs.writeFileSync('commands/Database/blacklisted.json', content2, 'utf8');
                const Successful = new Discord.MessageEmbed()
                    .setDescription(`Successfully Blacklisted \`${GetMember.id}\`. Updating Database!`)
                    .setColor(config.colorsuccess)
                message.channel.send(Successful).then((msg) => msg.react('✅'));
            }
        }
        Blacklist(GetMember.id);
    } else {
        const noID = new Discord.MessageEmbed()
            .setDescription('Error: ไม่พบผู้ใช้')
            .setColor(config.colorfail)
        return message.channel.send(noID) && console.log(red('User Not Mentioned'));
    };
};

exports.conf = { aliases: [] };