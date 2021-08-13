const Discord = require("discord.js");
const config = require("../../config/config");
const { MessageActionRow, MessageButton } = require('discord-buttons');
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
    console.log(`Retire Apply Command use by ${message.member.user.tag} with ${config.version} in ${message.guild.name}`)
    if (message.channel.id !== "868882090589028399") {
        message.channel.send(`:x: | กรุณาใช้คำสั่งในห้อง <#868882090589028399>`);
        console.log(`${message.member.user.tag} has beed deny(Wrong Channel) in ${message.guild.name}! | retire help`)
        return;
    }
    const questions = [
        '┗[1] [Rank, Name | ยศและชื่อ]',
        '┗[2] [Branch | เหล่า]',
        '┗[3] [Profile Link]',
        '┗[4] [Retire Reason | เหตุผลในการเหตุผลในการเกษียณอายุ]'
    ]
    let counter = 0
    let endcounter = 0
    const filter = (m) => m.author.id === message.author.id
    let retireapp_warnembed = new Discord.MessageEmbed()
        .setColor(config.colorwait)
        .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)
        .setTimestamp(Date.now())
        .setDescription("<a:Load:867110514131992588> กำลังโหลดข้อมูล...")
    const retireapp_warn = await message.channel.send(retireapp_warnembed)
    let retireapp_start = new Discord.MessageEmbed()
        .setTitle('<:armedforces:867041964213534740> กรุณาตอบคำถามให้ครบถ้วน <:armedforces:867041964213534740>')
        .setDescription(`${questions[counter++]}`)
        .setFooter(`คำถามที่ [${counter}/${questions.length}]`)
        .setColor(config.colorwait)
    message.react("⏲")
    const appStart = await message.channel.send(message.author, retireapp_start)
    await appStart == retireapp_warn.delete()
    const channel = appStart.channel
    const collector = channel.createMessageCollector(filter, {
        max: questions.length,
        time: 1000 * 120 // 60s
    })
    collector.on('collect', (m) => {
        if (counter < questions.length) {
            collector.resetTimer({
                time: 1000 * 120 // 60s
            })
            let retirenextembed = new Discord.MessageEmbed()
                .setTitle('<:armedforces:867041964213534740> กรุณาตอบคำถามให้ครบถ้วน <:armedforces:867041964213534740>')
                .setDescription(`${questions[counter++]}`)
                .setFooter(`คำถามที่ [${counter}/${questions.length}]`)
                .setColor(config.colorwait)
            m.delete()
            appStart.edit(message.author, retirenextembed)
        } else {
            m.delete()
            appStart.delete()
            collector.stop('Apply_Done')
        }
    });
    const appChannel = bot.channels.cache.get('869562113616662549')
    collector.on('end', async (collected, reason) => {
        if (!collected.size) {
            appStart.delete()
            let retireapp_noanswer = new Discord.MessageEmbed()
                .setColor(config.colorfail)
                .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)
                .setDescription("<a:no_check:867119304218116096> " + `ไม่พบคำตอบของ ${message.author}`)
            channel.send(retireapp_noanswer)
            return;
        }
        if (reason === 'Apply_Done') {
            const applymap = collected.map((msg) => {
                return `${questions[endcounter++]} : ${msg.content}`
            }).join("\n\n")

            let appdone_YorN = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setThumbnail(message.author.avatarURL())
                .setDescription(applymap)
                .setColor(config.colorwait)
                .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)

            let supportbutton = new MessageButton()
                .setStyle('url')
                .setURL('https://discord.gg/ayCwP5wYQv')
                .setLabel('💭 ติดต่อผู้ดูแลระบบ')

            let app_sure = new MessageButton()
                .setLabel("Yes")
                .setStyle("green")
                .setEmoji("✅")
                .setID("appsure")

            let app_nosure = new MessageButton()
                .setLabel("No")
                .setStyle("red")
                .setEmoji("⛔")
                .setID("appnotsure")

            let yesorno_row = new MessageActionRow()
                .addComponents(app_sure, app_nosure);


            const msg = await message.channel.send({ content: message.author, embed: appdone_YorN, components: yesorno_row })
            const filter2 = (button) => button.clicker.user.id === message.author.id;
            let collector = msg.createButtonCollector(filter2, { time: 1000 * 60 });


            collector.on('collect', (btn) => {
                if (btn.id == 'appsure') {
                    message.react("✅")
                    msg.delete()
                    let retireapp_view2 = new Discord.MessageEmbed()
                        .setColor(config.colorsuccess)
                        .setTitle("<a:Load:867110514131992588> กรุณารอสักครู่ <a:Load:867110514131992588>")
                        .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)
                        .setTimestamp(Date.now())
                        .setDescription(`
ทั้ง \`${collected.size}\` คำตอบถูกส่งไปให้ แอดมิน ตรวจสอบเรียบร้อย`)
                    channel.send({ content: message.author, embed: retireapp_view2, component: supportbutton })
                    let retireapplogembed = new Discord.MessageEmbed()
                        .setAuthor('Retire Apply Log', `${message.guild.iconURL()}`)
                        .setTitle(`From ${message.member.user.tag}`)
                        .setColor(config.colorsuccess)
                        .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)
                        .setTimestamp(Date.now())
                        .setThumbnail(message.member.user.displayAvatarURL())
                        .setDescription(applymap)
                    appChannel.send(`From : ${message.author}\nChannel : <#${message.channel.id}>\nType : \`Retire Apply\``, retireapplogembed)
                }
                if (btn.id == 'appnotsure') {
                    message.react("⛔")
                    msg.delete()
                    let appnotsureembed = new Discord.MessageEmbed()
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setColor(config.colorfail)
                        .setTimestamp(Date.now())
                        .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)
                        .setDescription(`⛔ ${message.author} ได้ยกเลิกการส่งแบบฟอร์มเรียบร้อยแล้ว
สามารถพิมพ์ \`${config.prefix}a_apply\` เพื่อทำแบบฟอร์มใหม่อีกครั้ง`)
                    message.channel.send({ content: message.author, embed: appnotsureembed, component: supportbutton })
                }
            })
        }
    })
}

exports.conf = { aliases: ["r_app", "r_apply", "retire_apply"] };