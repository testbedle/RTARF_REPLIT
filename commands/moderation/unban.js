const Discord = require("discord.js");
const config = require("../../config/config");
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
    console.log(`Unban Command use by ${message.member.user.tag} with ${config.version} in ${message.guild.name}`)
    if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.channel.send(`${message.author} ไม่ได้รับอนุญาตให้ใช้คำสั่ง \`${config.prefix}unban\``);
        return;
    };

    const userID = args[0]
    let reason = args.slice(1).join(" ");
    if (!reason) {
        reason = `${message.member.user.tag} ไม่ได้ให้เหตุผลในการยกเลิกแบน <@${userID}>`
    };

    message.guild.fetchBans().then(async bans => {
        if (bans.size === 0) {
            message.channel.send(`ไม่พบการแบนในเซิฟ ${message.guild.name}`);
            return;
        };
        let banneduser = bans.find(ban => ban.user.id == userID);
        if (!banneduser) {
            message.channel.send(`<@${userID}> ไม่ได้ถูกแบน`);
            return;
        };
        try {
            await message.guild.members.unban(banneduser.user, reason);
            message.channel.send(`<@${userID}> ถูกยกเลิกการแบนโดย ${message.member.user.tag} ด้วยเหตุผล ${reason}`)
        } catch (err) {
            message.channel.send(`${message.author} ไม่สามารถยกเลิกแบนผู้ใช้ได้ เนื่องจาก
\`\`\`
${err}
\`\`\``)
        };
    })
}

exports.conf = { aliases: [] };