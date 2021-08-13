const Discord = require('discord.js');
const { yellowBright } = require('chalk');
const Bacess = require('../Database/blacklist.json');
const Blacklisted = require('../Database/blacklisted.json');
const TrustedUserIDs = require('../Database/WhitelistUserIDs.json');
const config = require('../../config/config');
const fs = require("fs");
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
    const Trusted = TrustedUserIDs.find((user) => user === `${message.author.id}`);
    if (!message.member.hasPermission("ADMINISTRATOR") && message.author.id !== Trusted) {
        message.channel.send(`${message.author} ไม่ได้รับอนุญาตให้ใช้คำสั่ง \`${config.prefix}unblacklistAll\``);
        return;
    };
    async function UnblacklistAll() {
        const Array = Bacess;
        const Array2 = Blacklisted;
        if (Array.length === 0) {
            const nothing = new Discord.MessageEmbed()
                .setDescription(`ไม่พบผู้ที่โดน Blacklist.`)
                .setColor(config.colorfail)
            message.channel.send(nothing);
        } else {
            Bacess.length = 0;
            Blacklisted.length = 0;
            const content = JSON.stringify(Array);
            const content2 = JSON.stringify(Array2);
            fs.writeFileSync('commands/Database/blacklist.json', content, 'utf8');
            fs.writeFileSync('commands/Database/blacklisted.json', content2, 'utf8');
            console.log(yellowBright('\nUnblacklist Successful \nData Saved ✅'));
            const Successful = new Discord.MessageEmbed()
                .setDescription(`Successfully Cleared Database. Updating Database!`)
                .setColor(config.colorsuccess)
            message.channel.send(Successful).then((msg) => msg.react('✅'));
        };
    };
    UnblacklistAll();
};

exports.conf = { aliases: ["unblacklistAll"] };