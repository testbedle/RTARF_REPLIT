const Discord = require('discord.js');
const { red, yellowBright } = require('chalk');
const Bacess = require('../Database/blacklist.json');
const TrustedUserIDs = require('../Database/WhitelistUserIDs.json');
const Blacklisted = require('../Database/blacklisted.json');
const config = require('../../config/config');
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
        message.channel.send(`${message.author} ไม่ได้รับอนุญาตให้ใช้คำสั่ง \`${config.prefix}unblacklist\``);
        return;
    };
    if (Mentioned) {
        function UnBlacklist(ID) {
            const Array = Bacess;
            const FindID = Array.find((el) => el === ID);
            const InArray = Array.includes(FindID);
            const ElIndex = Array.indexOf(FindID);
            Array.splice(ElIndex, 1);
            const content = JSON.stringify(Array);
            const Array2 = Blacklisted;
            const FindID2 = Array.find((el) => el === `<@${ID}>`);
            const ElIndex2 = Array.indexOf(FindID2);
            Array2.splice(ElIndex2, 1);
            const content2 = JSON.stringify(Array2, null, 2);
            if (isNaN(ID)) {
                return message.reply('ไม่พบผู้ใช้.') || console.error(red('ERROR: PROVIDE VALID NUMBER'));
            };
            if (InArray === false) {
                console.log('\nNot in the blacklist ❌\n');
                const notinDb = new Discord.MessageEmbed()
                    .setDescription('Error: ไม่พบผู้ใช้ใน Database.')
                    .setColor(config.colorfail)
                return message.channel.send(notinDb);
            } else {
                fs.writeFileSync('commands/Database/blacklist.json', content, 'utf8');
                fs.writeFileSync('commands/Database/blacklisted.json', content2, 'utf8');
                console.log(yellowBright('Unblacklist Successful\nData Saved ✅'));
                const Successful = new Discord.MessageEmbed()
                    .setDescription(`Successfully Unblacklisted \`${GetMember.id}\`. Updating Database!`)
                    .setColor(config.colorsuccess)
                message.channel.send(Successful).then((msg) => msg.react('✅'));
            };
        };
        UnBlacklist(GetMember.id);
    } else {
        const noID = new Discord.MessageEmbed()
            .setDescription('Error: ไม่พบผู้ใช้')
            .setColor(config.colorfail)
        return message.channel.send(noID) && console.log(red('User Not Mentioned'));
    };
};

exports.conf = { aliases: [] };