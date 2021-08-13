const Discord = require("discord.js");
const config = require("../../config/config");
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
    console.log(`Admission Help Command use by ${message.member.user.tag} with ${config.version} in ${message.guild.name}`)
    let awaitembed = new Discord.MessageEmbed()
        .setAuthor('กำลังโหลดข้อมูล. . . ')
        .setColor(config.colorwait)
    const awaitdelete = message.channel.send(awaitembed)
        ; (await awaitdelete).delete()
    let admissionembed = new Discord.MessageEmbed()
        .setTitle("Admission Format | แบบฟอร์มการสมัตร, เลื่อนขั้น ฯลฯ")
        .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.author.displayAvatarURL()}`)
        .setTimestamp(Date.now())
        .setColor(config.colorwait)
        .setDescription(`\`\`\`ml
[Rank, Name | ยศและชื่อ] : 
[Branch | เหล่า] : 
[Profile Link] : 
[Admission Reason | เหตุผลในการสมัคร] : 

-- Example --

[Rank, Name | ยศและชื่อ] : Recuit(Phase 1), HELLO_WORLD
[Branch | เหล่า] : -
[Profile Link] : https://www.roblox.com/users/1/profile
[Admission Reason | เหตุผลในการสมัคร] : หนูเหงาค่ะ
\`\`\``)
    message.channel.send(admissionembed)
}

exports.conf = { aliases: ["a_h", "a_help", "admission_help", "admission_h"] };