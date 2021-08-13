const Discord = require("discord.js");
const config = require("../../config/config");
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
    console.log(`DM Command use by ${message.member.user.tag} with ${config.version} in ${message.guild.name}`)
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.channel.send(`${message.author} ไม่ได้รับอนุญาตให้ใช้คำสั่ง \`${config.prefix}dm\``);
        return;
    };
    let mentionMember = message.guild.member(message.mentions.users.first());
    let text = args.slice(1).join(' ');
    if (!args[0]) {
        message.channel.send(`${message.author} กรุณาแท็กผู้ใช้`);
        return;
    };
    if (!mentionMember) {
        message.channel.send(`${message.author} กรุณาแท็กผู้ใช้`);
        return;
    };
    if (!text) {
        message.channel.send(`${message.author} กรุณาใส่ข้อความที่จะส่ง`);
        return;
    };
    if (mentionMember) {
        if (text) {
            if (mentionMember.id == "719840703311773726") {
                if (message.author.id !== "445218908010577930") {
                    message.channel.send(`<@445218908010577930>, ${message.channel.send} จะเสือกทักไปหาหวานใจมึงอ่ะ ต่อยแม่งดิ\n${message.author} มึงไม่ต้องลบข้อความหนีนะ ไอสัส`);
                    return;
                } else {
                    message.channel.send(`<@445218908010577930> ส่งข้อความไปหาหวานใจเรียบร้อย`);
                    mentionMember.send(`ข้อความจากหวานใจครับ\n${text}`);
                };
            } else {
                message.delete()
                message.channel.send(`${message.author} ส่งข้อความเรียบร้อย`);
                mentionMember.send(`${message.author.tag} ฝากข้อความมาว่า\n${text}`).catch((err) => {
                    message.channel.send(`${message.author} ไม่สามารถส่งข้อความได้เนื่องจาก ${err}`);
                });
            };
        };
    };
}

exports.conf = { aliases: [] };