const Discord = require('discord.js');
const config = require('../../config/config');
const TrustedUserIDs = require('../Database/WhitelistUserIDs.json');
const TrustedUsers = require('../Database/WhitelistUsers.json');
const fs = require("fs");
const { red } = require('chalk');
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.channel.send(`${message.author} ไม่ได้รับอนุญาตให้ใช้คำสั่ง \`${config.prefix}trustUser\``);
        return;
    };
    const Mentioned = message.mentions.users.first();
    const GetMember = message.guild.member(Mentioned);
    if (Mentioned) {
        function TrustUser(ID) {
            const TrustedUserArray = TrustedUsers;
            const TrustedUserIDArray = TrustedUserIDs;
            const FindID = TrustedUserIDArray.find((el) => el === ID);
            const InArray = TrustedUserIDArray.includes(FindID);
            if (InArray === true) {
                return message.reply('ผู้ใช้มี Whitelist แล้ว.').then((msg) => msg.delete({ timeout: 4000 })) && console.log(red('ERROR: USER ALREADY TRUSTED'));
            } else if (isNaN(ID)) {
                return message.reply('ไม่พบผู้ใช้.') || console.error(red('ERROR: PROVIDE VALID NUMBER'));
            } else {
                TrustedUserArray.push(`<@${ID}>`);
                TrustedUserIDArray.push(ID);
                const content = JSON.stringify(TrustedUserArray, null, 2);
                const content2 = JSON.stringify(TrustedUserIDArray, null, 2);
                fs.writeFileSync('commands/Database/WhitelistUserIDs.json', content2, 'utf8');
                fs.writeFileSync('commands/Database/WhitelistdUsers.json', content, 'utf8');
                const Successful = new Discord.MessageEmbed()
                    .setDescription(`Successfully Trusted \`${GetMember.id}\`. Updating Database!`)
                    .setColor(config.colorsuccess)
                message.channel.send(Successful).then((msg) => msg.react('✅'));
            };
        };
        TrustUser(GetMember.id);
    } else {
        const noID = new Discord.MessageEmbed()
            .setDescription('Error: ไม่พบผู้ใช้')
            .setColor(config.colorfail)
        return message.channel.send(noID) && console.log(red('User Not Mentioned'));
    };
}

exports.conf = { aliases: ["whitelist"] };