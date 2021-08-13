const Discord = require("discord.js");
const config = require("../../config/config");
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
    console.log(`Retire Help Command use by ${message.member.user.tag} with ${config.version} in ${message.guild.name}`)
    let awaitembed = new Discord.MessageEmbed()
        .setAuthor('กำลังโหลดข้อมูล. . . ')
        .setColor(config.colorwait)
    const awaitdelete = message.channel.send(awaitembed)
        ; (await awaitdelete).delete()
    let retireembed = new Discord.MessageEmbed()
        .setTitle("Retire Format | แบบฟอร์มการเกษียณ, ลาออก ฯลฯ")
        .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.author.displayAvatarURL()}`)
        .setTimestamp(Date.now())
        .setColor(config.colorwait)
        .setDescription(`\`\`\`ml
[Rank, Name | ยศและชื่อ] : 
[Branch | เหล่า] : 
[Profile Link] : 
[Retire Reason | เหตุผลในการเหตุผลในการเกษียณอายุ] : 

-- Example --

[Rank, Name | ยศและชื่อ] : Recuit(Phase 1), HELLO_WORLD
[Branch | เหล่า] : -
[Profile Link] : -
[Retire Reason | เหตุผลในการเหตุผลในการเกษียณอายุ] : หนูไม่มีเวลาค่ะ
\`\`\``)
    message.channel.send(retireembed)
}

exports.conf = { aliases: ["r_h", "r_help", "retire_help", "r_h"] };