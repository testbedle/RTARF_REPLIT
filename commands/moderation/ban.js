const Discord = require("discord.js");
const config = require("../../config/config");
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
    console.log(`Ban Command use by ${message.member.user.tag} with ${config.version} in ${message.guild.name}`)
    let mentionMember = message.mentions.members.first();
    if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.channel.send(`${message.author} ไม่ได้รับอนุญาตให้ใช้คำสั่ง \`${config.prefix}ban\``);
        return;
    };
    if (!args[0]) {
        message.channel.send(`${message.author} กรุณาแท็กผู้ใช้`);
        return;
    };
    if (!mentionMember) {
        message.channel.send(`${message.author} กรุณาแท็กผู้ใช้`);
        return;
    };
    if (mentionMember.id == message.author.id) {
        message.channel.send(`${message.author} อย่าโง่แบนตัวเองครับ ไอควาย`);
        return;
    };

    let reason = args.slice(1).join(" ");
    if (!reason) {
        reason = `${message.member.user.tag} ไม่ได้ให้เหตุผลในการแบน ${mentionMember.user.tag}`
    };

    const banDMembed = new Discord.MessageEmbed()
    .setTitle(`${message.guild.name}`)
    .setColor(config.colorfail)
    .setTimestamp(Date.now())
    .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)
    .setDescription(`
คุณถูกแบนจาก ${message.guild.name} โดย ${message.member.user.tag} ด้วยเหตุผล
\`\`\`
${reason}
\`\`\``)

    if (mentionMember.bannable) {
        await mentionMember.send(banDMembed).catch ((err) => {
            console.log(`Error found : ${err}`);
        })
        await mentionMember.ban({
            reason: reason
        })
        message.channel.send(`${mentionMember.user.tag} ถูกแบนโดย ${message.member.user.tag} ด้วยเหตุผล ${reason}`);
    } else {
        message.channel.send(`${message.author} ไม่สามารถแบนผู้ใช้ได้ เนื่องจาก
\`\`\`
กูไม่รู้ error ไอสัส แต่คือมันแบนไม่ได้ อย่าโง่ดิ
\`\`\``)
    }
}

exports.conf = { aliases: [] };