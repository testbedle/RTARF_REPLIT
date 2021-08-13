const Discord = require('discord.js');
const config = require('../../config/config');
const TrustedUserIDs = require('../Database/WhitelistUserIDs.json');
const TrustedUsers = require('../Database/WhitelistUsers.json');
const fs = require("fs");
const { yellowBright } = require('chalk');
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.channel.send(`${message.author} ไม่ได้รับอนุญาตให้ใช้คำสั่ง \`${config.prefix}untrustAll\``);
        return;
    };
    async function UnwhitelistAll() {
        const Array = TrustedUserIDs;
        const Array2 = TrustedUsers;
        if (Array.length === 0) {
            const nothing = new Discord.MessageEmbed()
                .setDescription(`ไม่พบผู้ที่มี Whitelist.`)
                .setColor(config.colorfail)
            message.channel.send(nothing);
        } else {
            TrustedUserIDs.length = 0;
            TrustedUsers.length = 0;
            const content = JSON.stringify(Array);
            const content2 = JSON.stringify(Array2);
            fs.writeFileSync('commands/Database/WhitelistUserIDs.json', content2, 'utf8');
            fs.writeFileSync('commands/Database/WhitelistdUsers.json', content, 'utf8');
            console.log(yellowBright('\nSuccessfully Cleared trust system\nData Saved ✅'));
            const Successful = new Discord.MessageEmbed()
                .setDescription(`Successfully Cleared Database. Updating Database!`)
                .setColor(config.colorsuccess)
            message.channel.send(Successful).then((msg) => msg.react('✅'));
        };
    };
    UnwhitelistAll()
};

exports.conf = { aliases: ["unwhitelisttAll"] };