const Discord = require("discord.js");
const config = require("../config/config");
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
    console.log(`Secret Command use by ${message.member.user.tag} with ${config.version} in ${message.guild.name}`)
    if (message.author.id !== `${config.botownerid}` && message.author.id !== "719840703311773726" && message.author.id !== "777484720887169045") {
        console.log(`${message.member.user.tag} has beed deny(User Permission) in ${message.guild.name}! | bedle_secret`)
        message.channel.send(":x:" + ` | ควย ${message.author} อย่าเสือกไอสัส!`)
        message.channel.send(":x:" + ` | ควย ${message.author} อย่าเสือกไอสัส!`)
        message.channel.send(":x:" + ` | ควย ${message.author} อย่าเสือกไอสัส!`)
        message.channel.send(":x:" + ` | ควย ${message.author} อย่าเสือกไอสัส!`)
        message.channel.send(":x:" + ` | ควย ${message.author} อย่าเสือกไอสัส!`)
        message.channel.send(`<@445218908010577930> ${message.author} จะเสือกค่าาาาาาาา`)
        return
    }
    const annchannel = "852877250151186472"
    if (message.author.id == "445218908010577930") {
        message.channel.send(`ถึง <@719840703311773726>\n
<@445218908010577930> ฝากบอกว่า รัก <@719840703311773726> มากๆนะครับ❤ ><`)
    }
    if (message.author.id == "719840703311773726") {
        bot.channels.cache.get(annchannel).send(`@here ขอยืมพื้นที่แปปนุง อิอิ\nถึง <@445218908010577930>\n
<@719840703311773726> ฝากบอกว่า รัก <@445218908010577930> มากๆนะคะ❤ ><`)
    }
    if (message.author.id == "777484720887169045") {
        message.channel.send(`ถึง <@836910048697384972>\n
<@500138125499301888> ฝากบอกว่า รัก <@836910048697384972> มากๆนะคะ❤ ><`)
    }
}

exports.conf = { aliases: ["pong", "bom", "riw"] };