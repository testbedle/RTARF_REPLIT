const Discord = require("discord.js");
const config = require("../../config/config");
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
    console.log(`BotInfo Command use by ${message.member.user.tag} with ${config.version} in ${message.guild.name}`)
    let uptime = ``;
    let days = 0;
    let week = 0;
    let totalSeconds = (bot.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    if (hours > 23) {
        days = days + 1;
        hours = 0;
    };
    if (days == 7) {
        days = 0;
        week = week + 1;
    };
    if (week > 0) {
        uptime += `${week} สัปดาห์, `;
    };
    if (minutes > 60) {
        minutes = 0;
    };

    uptime += `${days} วัน, ${hours} ชั่วโมง, ${minutes} นาที, ${seconds} วินาที`;
    const botinfoembed = new Discord.MessageEmbed()
    .setAuthor(bot.user.tag, bot.user.avatarURL())
    .setThumbnail(bot.user.avatarURL())
    .setColor(config.colorsuccess)
    .setFooter(`⏱ ทำงานมาเป็นเวลา : ${uptime} ที่แล้ว`)
    .setDescription(`

<:armedforces:867041964213534740> **ผู้สร้าง**\n\`aa.kxpnn#0365\`, \`!ꜱɪɢᴍᴄx#4733\`

<:armedforces:867041964213534740> __**ข้อมูลพื้นฐาน**__
┊\`เวอร์ชั่น\` ${config.version}
┊\`ไอดีบอท\` ${bot.user.id}
┊\`เซิร์ฟเวอร์ที่เชื่อมต่อ\` ${bot.guilds.cache.size}

<:armedforces:867041964213534740> __**ข้อมูลเพิ่มเติม**__
╰\`หมายเหตุ\` สร้างเพื่อใช้งานในกลุ่มที่มี !ꜱɪɢᴍᴄx#4733 เป็นผู้ควบคุม
`)
    message.channel.send(botinfoembed)
}