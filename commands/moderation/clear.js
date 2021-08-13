const Discord = require("discord.js");
const config = require("../../config/config");
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async (bot, message, args) => {
    console.log(`Clear Command use by ${message.member.user.tag} with ${config.version} in ${message.guild.name}`)
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.send(`${message.author} ไม่ได้รับอนุญาตให้ใช้คำสั่ง \`${config.prefix}clear\``);
        return;
    };
    if (!args[0]) {
        message.channel.send(`${message.author} กรุณาใส่จำนวนข้อความที่จะลบ`);
        return;
    };
    if (isNaN(args[0])) {
        message.channel.send(`${message.author} กรุณาใส่จำนวนข้อความที่จะลบ`);
        return;
    };
    if (args[0] >= 101) {
        message.channel.send(`${message.author} กรุณาใส่จำนวนข้อความที่จะลบให้น้อยกว่า 100 ข้อความ`);
        return;
    };
    if (args[0] < 1) {
        message.channel.send(`${message.author} กรุณาใส่จำนวนข้อความที่จะลบให้มากกว่า 1 ข้อความ`);
        return;
    };
    await message.delete();
    message.channel.bulkDelete(+args[0]);
};

exports.conf = { aliases: ["purge"] };