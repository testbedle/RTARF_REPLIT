const Discord = require("discord.js");
const config = require("../../config/config");
const fetch = require("node-fetch");
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
    console.log(`Translate Command use by ${message.member.user.tag} with ${config.version} in ${message.guild.name}`)
    const inp = args.slice(1).join(' ')
    const toLang = args[0]

    let res = await fetch(`https://luminabot.xyz/api/translate?text=${encodeURIComponent(inp)}&tolang=${encodeURIComponent(toLang)}`)
    const response = await res.json();

    const translateembed = new Discord.MessageEmbed()
        .setColor(config.colorsuccess)
        .setTimestamp(Date.now())
        .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)
        .addFields(
            {
                name: 'ข้อความต้นฉบับ',
                value: response.input,
                inline: false
            },
            {
                name: 'ภาษา',
                value: response.toLang,
                inline: false
            },
            {
                name: 'คำแปล',
                value: response.translated,
                inline: false
            }
        )

    message.channel.send(translateembed)
}

exports.conf = { aliases: ["t", "tran"] };