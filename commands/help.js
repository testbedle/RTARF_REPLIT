const Discord = require('discord.js');
const config = require('../config/config');
const { MessageActionRow, MessageButton } = require('discord-buttons');
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
  console.log(`Help Command use by ${message.member.user.tag} with ${config.version} in ${message.guild.name}`)
  const helphomeembed = new Discord.MessageEmbed()
    .setAuthor(bot.user.tag, bot.user.displayAvatarURL())
    .setTimestamp(Date.now())
    .setImage("https://cdn.discordapp.com/icons/852865593819267072/2c08a222b9258abc434e8aaeb9da2d30.png?size=4096")
    .setColor(config.colorsuccess)
    .setDescription("กด **REACT** เพื่อดูคำสั่งต่างๆ\n\n" +
`💭 **ติดต่อผู้ดูแลระบบ**
╰\`Discord\` https://discord.gg/ayCwP5wYQv`)
    .setFooter("ติดต่อผู้ดูแลระบบ 💭\naa.kxpnn#0365, !ꜱɪɢᴍᴄx#4733", `${message.guild.iconURL()}`)

  const generalhelpembed = new Discord.MessageEmbed()
  .setTitle("🏠 General Help | คำสั่งช่วยเหลือพื้นฐาน")
  .setTimestamp(Date.now())
  .setColor(config.colorsuccess)
  .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)
  .setDescription(`

<:armedforces:867041964213534740> **คำสั่งทั่วไป**
┊\`${config.prefix}verify\` สำหรับยืนยันตัวตน
┊\`${config.prefix}botinfo\` สำหรับดูข้อมูลของบอท

<:armedforces:867041964213534740> **คำสั่งเพิ่มเติม**
┊\`${config.prefix}blacklisted\` สำหรับดูผผู้ติดบัญชีดำ
┊\`${config.prefix}whitelisted\` สำหรับดูผู้ที่มี Whitelist
┊\`${config.prefix}covid [country]\` สำหรับแปลภาษา
╰\`${config.prefix}translate [country] [input]\` สำหรับแปลภาษา

`)

  const admissionhelpembed = new Discord.MessageEmbed()
    .setTitle("📝 Admission Help | คำสั่งช่วยเหลือในการรับสมัคร")
    .setTimestamp(Date.now())
    .setColor(config.colorsuccess)
    .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)
    .setDescription(`

<:armedforces:867041964213534740> **Role and Nickname Request**
┊\`${config.prefix}r_n\`

<:armedforces:867041964213534740> **Admission Apply**
┊\`${config.prefix}admission_apply\`
┊\`${config.prefix}a_apply\`

<:armedforces:867041964213534740> **Admission Format Help**
┊\`${config.prefix}admission_help\`
╰\`${config.prefix}a_help\`
`)

  const retirehelpembed = new Discord.MessageEmbed()
    .setTitle("📚 Retire Help | คำสั่งช่วยเหลือในการเกษียณอายุราชการ")
    .setTimestamp(Date.now())
    .setColor(config.colorsuccess)
    .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)
    .setDescription(`

<:armedforces:867041964213534740> **Retire Apply**
┊\`${config.prefix}retire_apply\`
┊\`${config.prefix}r_apply\`

<:armedforces:867041964213534740> **Retire Format Help**
┊\`${config.prefix}retire_help\`
╰\`${config.prefix}r_help\`
`)

  const adminhelpembed = new Discord.MessageEmbed()
    .setTitle("⚙ Moderation Help | คำสั่งช่วยเหลือสำหรับแอดมิน")
    .setTimestamp(Date.now())
    .setColor(config.colorsuccess)
    .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)
    .setDescription(`

<:armedforces:867041964213534740> **คำสั่งทั่วไป**
┊\`${config.prefix}clear [int]\` สำหรับลบข้อความ
┊\`${config.prefix}kick [mention]\` สำหรับเตะผู้ใช้
┊\`${config.prefix}ban [mention]\` สำหรับแบนผู้ใช้
┊\`${config.prefix}unban [userID]\` สำหรับยกเลิกแบนผู้ใช้

<:armedforces:867041964213534740> **คำสั่งให้ Blacklist**
┊\`${config.prefix}blacklist [mention]\` สำหรับเพิ่ม Blacklist บางผู้ใช้
┊\`${config.prefix}unblacklist [mention]\` สำหรับยกเลิก Blacklist บางผู้ใช้
┊\`${config.prefix}unblacklistAll\` สำหรับยกเลิก Blacklist ทั้งหมด

<:armedforces:867041964213534740> **คำสั่งให้ Whitelist**
┊\`${config.prefix}whitelist [mention]\` สำหรับเพิ่ม Whitelist บางผู้ใช้
┊\`${config.prefix}unwhitelist [mention]\` สำหรับยกเลิก Whitelist บางผู้ใช้
╰\`${config.prefix}unwhitelisttAll\` สำหรับยกเลิก Whitelist ทั้งหมด
`)

  let generalbutton = new MessageButton()
    .setLabel("General Help")
    .setStyle("blurple")
    .setEmoji("🏠")
    .setID("generalpage")

  let admissionbutton = new MessageButton()
    .setLabel("Admission Help")
    .setStyle("blurple")
    .setEmoji("📝")
    .setID("admissionhelppage")

  let retirebutton = new MessageButton()
    .setLabel("Retire Help")
    .setStyle("blurple")
    .setEmoji("📚")
    .setID("retirehelppage")

  let adminbutton = new MessageButton()
    .setLabel("Moderation Help")
    .setStyle("blurple")
    .setEmoji("⚙")
    .setID("adminhelpembed")

  let row = new MessageActionRow()
    .addComponents(generalbutton, admissionbutton, retirebutton, adminbutton);

  message.react("<:armedforces:867041964213534740>")
    let msg = await message.channel.send(helphomeembed, row)
  const filter = (button) => button.clicker.user.id === message.author.id;
  let collector = msg.createButtonCollector(filter, { time: 1000 * 120 });

  collector.on('collect', (btn) => {
    btn.reply.defer()
    if (btn.id == 'generalpage') {
      msg.edit({
        embed: generalhelpembed,
        components: row
      });
    };
    if (btn.id == 'admissionhelppage') {
      msg.edit({
        embed: admissionhelpembed,
        components: row
      });
    };
    if (btn.id == 'retirehelppage') {
      msg.edit({
        embed: retirehelpembed,
        components: row
      });
    };
    if (btn.id == 'adminhelpembed') {
      msg.edit({
        embed: adminhelpembed,
        components: row
      });
    };
  });

  collector.on('end', collected => {
    let supportembed = new Discord.MessageEmbed()
      .setAuthor("Support Page", bot.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setColor(config.colorwait)
      .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)
      .setDescription(`
<:armedforces:867041964213534740> หมดเวลาของการใช้คำสั่ง \`${config.prefix}help\` กรุณาพิมพ์คำสั่งอีกครั้ง\n
💭 **ติดต่อผู้ดูแลระบบ**
╰\`Discord\` https://discord.gg/ayCwP5wYQv`)

    let supportbutton = new MessageButton()
      .setStyle('url')
      .setURL('https://discord.gg/ayCwP5wYQv')
      .setLabel('💭 ติดต่อผู้ดูแลระบบ')

    msg.edit({ embed: supportembed, component: supportbutton });
  });
};

exports.conf = { aliases: ["h", "g_h", "general_help", "general_h"] };