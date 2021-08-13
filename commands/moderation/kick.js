const Discord = require("discord.js");
const config = require("../../config/config");
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
    console.log(`Kick Command use by ${message.member.user.tag} with ${config.version} in ${message.guild.name}`)
    let mentionMember = message.mentions.members.first();
    if (!message.member.hasPermission("KICK_MEMBERS")) {
        message.channel.send(`${message.author} ไม่ได้รับอนุญาตให้ใช้คำสั่ง \`${config.prefix}kick\``);
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
        message.channel.send(`${message.author} อย่าโง่เตะตัวเองครับ ไอควาย`);
        return;
    };

    let reason = args.slice(1).join(" ");
    if (!reason) {
        reason = `${message.member.user.tag} ไม่ได้ให้เหตุผลในการเตะ ${mentionMember.user.tag}`
    };

    const kickDMembed = new Discord.MessageEmbed()
    .setTitle(`${message.guild.name}`)
    .setColor(config.colorfail)
    .setTimestamp(Date.now())
    .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)
    .setDescription(`
คุณถูกเตะจาก ${message.guild.name} โดย ${message.member.user.tag} ด้วยเหตุผล
\`\`\`
${reason}
\`\`\``)

    if (mentionMember.kickable) {
        await mentionMember.send(kickDMembed).catch ((err) => {
            console.log(`Error found : ${err}`);
        });
        await mentionMember.kick({
            reason: reason
        });
        message.channel.send(`${mentionMember.user.tag} ถูกเตะโดย ${message.member.user.tag} ด้วยเหตุผล ${reason}`);
    } else {
        message.channel.send(`${message.author} ไม่สามารถเตะผู้ใช้ได้ เนื่องจาก
\`\`\`
กูไม่รู้ error ไอสัส แต่คือมันเตะไม่ได้ อย่าโง่ดิ
\`\`\``);
    };
}

exports.conf = { aliases: [] };