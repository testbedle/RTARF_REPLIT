const Discord = require('discord.js');
const config = require("../../config/config");
const { MessageActionRow, MessageButton } = require('discord-buttons');
/**
* @param {import("discord.js").Client} bot
* @param {import("discord.js").Message} message
* @param {String[]} args
*/
exports.run = async (bot, message, args) => {
  console.log(`Reload Command use by ${message.member.user.tag} with ${config.version} in ${message.guild.name}`)
  if (message.author.id !== `${config.botownerid}` && message.author.id !== "777484720887169045") {
    console.log(`${message.member.user.tag} has beed deny(User Permission) in ${message.guild.name}! | restart`)
    return message.channel.send(":x: | You must be Bot Developer or Bot Owner!");
  }

  message.delete()
  let appdone_YorN = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setThumbnail(message.author.avatarURL())
    .setDescription(`${message.author} จะรีโหลดคอมมานด์
กดเพื่อยืนยันการรีโหลดคอมมานด์`)
    .setColor(config.colorwait)
    .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)

  let app_sure = new MessageButton()
    .setLabel("Yes")
    .setStyle("green")
    .setEmoji("✅")
    .setID("reloadcommandsure")

  let app_nosure = new MessageButton()
    .setLabel("No")
    .setStyle("red")
    .setEmoji("⛔")
    .setID("reloadcommandnotsure")

  let yesorno_row = new MessageActionRow()
    .addComponents(app_sure, app_nosure);

    const msg = await message.channel.send({ content: message.author, embed: appdone_YorN, components: yesorno_row })
  const filter2 = (button) => button.clicker.user.id === message.author.id;
  let collector = msg.createButtonCollector(filter2, { time: 1000 * 120 });

  collector.on('collect', (btn) => {
    if (btn.id == 'reloadcommandsure') {
      require(appRoot + '/config/command')(bot);
      msg.delete()
      msg.channel.send(`${message.author}\n` + "<:CheckMark:860827028030881812> รีโหลดคอมมานด์สำเสร็จ!")
    }
    if (btn.id == 'reloadcommandnotsure') {
      msg.delete()
      msg.channel.send(`${message.author}\n` + "<a:no_check:867119304218116096> รีโหลดคอมมานด์ไม่สำเสร็จ!")
    }
  })
}

exports.conf = { aliases: ["comm_reload", "c_reload", "r"] };