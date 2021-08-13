const Discord = require('discord.js');
const config = require("../config/config");
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
module.exports = async(bot) => {
    console.log(`Logged in as ${bot.user.tag} with Prefix : ${config.prefix}, Version : ${config.version}, Server Size : ${bot.guilds.cache.size}`);
    let activities = [`${config.prefix}help | ยินดีต้อนรับ`,  `${config.prefix}help | Create By WeWanna`], i = 0;
    setInterval(() => bot.user.setActivity(`${activities[i++ % activities.length]}`, { type: "WATCHING" }), 15000);
    let days = 0;
    let week = 0;
    let start = Date.now();
    let diff = (Date.now() - start);
            let uptime = ``;
            let totalSeconds = (bot.uptime / 1000);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);
            if (hours > 23) {
                days = days + 1;
                hours = 0;
            }
            if (days == 7) {
                days = 0;
                week = week + 1;
            }
            if (week > 0) {
                uptime += `${week} สัปดาห์, `;
            }
            if (minutes > 60) {
                minutes = 0;
            }
            uptime += `${days} วัน, ${hours} ชั่วโมง, ${minutes} นาที, ${seconds} วินาที`;
    let ready_log = new Discord.MessageEmbed()
        .setColor(config.colorsuccess)
        .setAuthor(`${bot.user.tag} - on ready`, bot.user.displayAvatarURL())
        .addField(`ผู้สร้าง`, `<@777484720887169045>, <@445218908010577930>`, true)
        .addField(`เวอร์ชั่น`, `${config.version}`, true)
        .addField(`เซิฟเวอร์ที่ทำงาน`, `${bot.guilds.cache.size}`, true)
        .addField("ค่าความหน่วงของบอท", `${diff} ms`, true)
        .setTimestamp(Date.now())
        .setFooter(`อัพเดทล่าสุดเมื่อ : ${uptime} ที่แล้ว`);
        bot.channels.cache.get(config.botonlinelog).send(ready_log);
        console.log(`Ready Log has been send in ${config.botonlinelog}`)
}