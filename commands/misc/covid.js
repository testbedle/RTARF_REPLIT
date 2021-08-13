const Discord = require("discord.js");
const config = require("../../config/config");
const fetch = require("node-fetch");
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
    console.log(`Covid Command use by ${message.member.user.tag} with ${config.version} in ${message.guild.name}`)
    const country = args[0]

    let res = await fetch(`https://luminabot.xyz/api/covid?region=${encodeURIComponent(country)}`)
    const response = await res.json();

    const translateembed = new Discord.MessageEmbed()
        .setColor(config.colorsuccess)
        .setAuthor(`รายงานสถานการณ์โควิดใน ${response.country}`)
        .setFooter(`อัพเดทล่าสุดเมื่อ : ${response.last_update}`, `${message.guild.iconURL()}`)
        .addFields(
            {
                name: 'ประเทศที่ค้นหา',
                value: response.country,
                inline: false
            },
            {
                name: 'จำนวนผู้ป่วยที่ติดเชื้อ',
                value: response.confirmed_cases,
                inline: false
            },
            {
                name: 'จำนวนผู้ป่วยที่กำลังฟื้นตัว',
                value: response.recovered_cases,
                inline: false
            },
            {
                name: 'จำนวนผู้เสียชีวิต',
                value: response.confirmed_deaths,
                inline: false
            },
        )

    message.channel.send(translateembed)
}

exports.conf = { aliases: ["covid-19", "coronavirus"] };