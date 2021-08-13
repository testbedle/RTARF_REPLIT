const Discord = require('discord.js');
const config = require('../../config/config');
const TrustedUserIDs = require('../Database/WhitelistUserIDs.json');
const TrustedUsers = require('../Database/WhitelistUsers.json');
const fs = require("fs");
const { red, yellowBright } = require('chalk');
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.channel.send(`${message.author} ไม่ได้รับอนุญาตให้ใช้คำสั่ง \`${config.prefix}untrustUser\``);
        return;
    };
    const Mentioned = message.mentions.users.first();
    const GetMember = message.guild.member(Mentioned);
    if (Mentioned) {
            function UnTrustUser(ID) {
                const TrustedUserArray = TrustedUsers;
                const TrustedUserIDArray = TrustedUserIDs;
                if (isNaN(ID)) {
                    return message.reply('ไม่พบผู้ใช้.') || console.error(red('ERROR: PROVIDE VALID NUMBER'));
                }
                const FindID = TrustedUserIDArray.find((el) => el === ID);
                const InArray = TrustedUserIDArray.includes(FindID);
                const ElIndex = TrustedUserIDArray.indexOf(FindID);
                TrustedUserIDArray.splice(ElIndex, 1);
                const FindID2 = TrustedUserIDArray.find((el) => el === `<@${ID}>`);
                const ElIndex2 = TrustedUserIDArray.indexOf(FindID2);
                TrustedUserArray.splice(ElIndex2, 1);
                const content = JSON.stringify(TrustedUserArray, null, 2);
                const content2 = JSON.stringify(TrustedUserIDArray, null, 2);
                if (InArray === false) {
                    console.log('\nNot in the blacklist ❌\n');
                    const notinDb = new Discord.MessageEmbed()
                        .setDescription('Error: ไม่พบผู้ใช้ใน Database.')
                        .setColor(config.colorfail)
                    return message.channel.send(notinDb);
                } else {
                    fs.writeFileSync('commands/Database/WhitelistUserIDs.json', content2, 'utf8');
                    fs.writeFileSync('commands/Database/WhitelistdUsers.json', content, 'utf8');
                    console.log(yellowBright('Removal of Trust Complete\nData Saved ✅'));
                    const Successful = new Discord.MessageEmbed()
                        .setDescription(`Successfully Removed Trust off \`${GetMember.id}\`. Updating Database!`)
                        .setColor(config.colorsuccess)
                    message.channel.send(Successful).then((msg) => msg.react('✅'));
                };
            };
            UnTrustUser(GetMember.id);
    } else {
        const noID = new Discord.MessageEmbed()
            .setDescription('Error: ไม่พบผู้ใช้ใน')
            .setColor(config.colorfail)
        return message.channel.send(noID) && console.log(red('User Not Mentioned'));
    };
};

exports.conf = { aliases: ["unwhitelist"] };