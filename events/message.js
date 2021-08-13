const Discord = require("discord.js");
const config = require("../config/config");
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 */
module.exports = async (bot, message) => {
	if (message.author.bot) return;
    if (message.channel.type == "dm") return;

	if (!message.content.startsWith(prefix)) return false;
	const slice = message.content.startsWith(prefix) ? prefix.length : 0
	const args = message.content.slice(slice).split(/\s+/)
	let command = args.shift().toLowerCase()
	if (!bot.commands.has(command)) {
		command = bot.aliases.get(command)
		if (!command) return;
	}
	console.log([message.author.tag, command, ...args].join(" | "))
    try {
        bot.commands.get(command).run(bot, message, args)

    } catch (error) {
        console.log(`Error found on ${command} command!`)
        let errorembed = new Discord.MessageEmbed()
            .setTitle(`มีปัญหาในการเรียกใช้คำสัง \`${command}\``)
            .setDescription(error)
            .setTimestamp(Date.now())
            .setColor(config.colorfail)
            .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)
        message.channel.send(errorembed)
    }
}