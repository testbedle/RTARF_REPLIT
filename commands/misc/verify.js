//const Discord = require("discord.js");
//const config = require("../../config/config");
//const { MessageActionRow, MessageButton } = require('discord-buttons');
///**
// * @param {import("discord.js").Client} bot
// * @param {import("discord.js").Message} message
// * @param {String[]} args
//**/
//exports.run = async (bot, message, args) => {
//    console.log(`Verify Command use by ${message.member.user.tag} with ${config.version} in ${message.guild.name}`)
//
//    const e = new Discord.MessageEmbed()
//        .setAuthor(message.author.tag, message.author.avatarURL())
//        .setDescription(`กดปุ่มเพื่อรับ \`บทบาท\``)
//        .setColor(config.colorwait)
//        .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)
//
//    const add = new MessageButton()
//        .setID('verify')
//        .setStyle('green')
//        .setEmoji('✅')
//        .setLabel("รับยศ")
//
//    let row = new MessageActionRow()
//        .addComponents(add)
//
//    message.react("⏲")
//    let msg = await message.channel.send(message.author, {embed: e, component: row })
//    const filter = (button) => button.clicker.user.id === message.author.id
//    let collector = msg.createButtonCollector(filter, { time: 1000 * 120 }) // 120s
//
//    collector.on('collect', async (btn) => {
//        if (btn.id == "verify") {
//            message.react("✅")
//            let role = btn.guild.roles.cache.get('852865593819267080')
//            let member = btn.clicker.member
//            await member.roles.add(role)
//            await btn.reply.send(`${message.author} ได้รับยศเรียบร้อย`, true)
//            msg.delete()
//            collector.stop("Verified")
//        }
//    })
//
//    collector.on('end', async (collected, reason) => {
//        if (reason !== "Verified") {
//            message.react("⛔")
//            msg.delete()
//            const unverifiedembed = new Discord.MessageEmbed()
//            .setColor(config.colorfail)
//            .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)
//            .setDescription("<a:no_check:867119304218116096> " + `${message.author} ไม่ได้กดปุ่มเพื่อรับยศ`)
//            message.channel.send(unverifiedembed)
//        }
//    })
//}
//
//exports.conf = { aliases: ["ind", "vfy"] };