const path = require('path');
const Discord = require('discord.js');
const fs = require("fs");
//const Canvas = require('canvas')
const { join } = require("path");
//const fetch = require('node-fetch');
const disbut = require('discord-buttons');
const { red, green, blue, yellow, cyan, magenta, greenBright, bgGreen, magentaBright, yellowBright } = require('chalk');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const config = require('./config/config');
global.config = require("./config/config.js");
global.prefix = config.prefix;
global.appRoot = path.resolve(__dirname);
require("dotenv").config();
disbut(bot);

const Bacess = require('./commands/Database/blacklist.json');
const TrustedUserIDs = require('./commands/Database/WhitelistUserIDs.json');
const commandFiles = fs.readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
const commandFilesBlacklist = fs.readdirSync(join(__dirname, "commands/Blacklist")).filter(file => file.endsWith(".js"));
const commandFilesWhitelist = fs.readdirSync(join(__dirname, "commands/Whitelist")).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    bot.commands.set(command.name, command);
}

for (const file of commandFilesBlacklist) {
    const command = require(join(__dirname, "commands/Blacklist", `${file}`));
    bot.commands.set(command.name, command);
}

for (const file of commandFilesWhitelist) {
    const command = require(join(__dirname, "commands/Whitelist", `${file}`));
    bot.commands.set(command.name, command);
}

// ANTI-ADVERTISING
bot.on('message', async (message) => {
    if (message.guild.id !== "868882085635567616") {
        return;
    };
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        if (message.content.includes('discord.gg/' || 'discordapp.com/invite/')) {
            const advertisingwarnembed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`)
            .setTitle("**Anti Advertising**")
            .setDescription(`${message.author} ได้ส่งลิ้งค์คำเชิญ ${message.content} ในห้อง ${message.channel}`)
            .setColor(config.colorfail)
            .setTimestamp(Date.now())
            .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)
            bot.channels.cache.get(config.actionlog).send(advertisingwarnembed)
            message.delete();
            message.reply(`อย่าโปรโมทครับ ถือว่าเตือนแล้วนะ`);
        } else {
            return;
        };
    };
});

// BLACKLIST MEMBER BAN
bot.on('guildMemberAdd', member => {
    if (member.guild.id !== "868882085635567616") {
        return;
    };
    const BlacklistedUserID = Bacess.find((u) => u === `${member.id}`);
    const noAcess = new Discord.MessageEmbed()
        .setTitle(`การเข้าถึงเซิร์ฟเวอร์ : ${member.guild.name} โดยไม่ได้รับอนุญาต`)
        .setDescription(`คุณโดน Blacklist ใน **${member.guild.name}** และถูกปฏิเสธไม่ให้เข้า.
\nหากมีข้อสงสัย สามารถติดต่อ <@${config.botownerid}> หรือ <@${member.guild.owner.id}>`)
        .setFooter(`® ${member.guild.name} | เวอร์ชั่น ${config.version}`, `${member.guild.iconURL()}`)
        .setColor(config.colorfail)
        .setThumbnail(member.guild.iconURL())
        .setTimestamp(Date.now());

    if (member.id === BlacklistedUserID) {
        member.send(noAcess)
        bot.channels.cache.get(config.actionlog).send(noAcess);
        setTimeout(function () {
            member.ban({
                reason: `Blacklisted User`
            })
        }, 2000);
        console.log(red(`Unauthorised User: ${member.user.tag} tried joining ${member.guild.name} and was banned.`));
        bot.channels.cache.get(config.actionlog).send(`Unauthorised User: ${member.user.tag} tried joining ${member.guild.name} and was banned.`);
    } else {
        bot.channels.cache.get(config.actionlog).send(`Authorised User: ${member.user.tag} joined ${member.guild.name}.`)
        return console.log(greenBright(`Authorised User: ${member.user.tag} joined ${member.guild.name}.`));
    }
});

// RANDOM ADMIN BAN
bot.on("guildMemberUpdate", async (oldMember, newMember) => {
    if (oldMember.guild.id !== "868882085635567616") {
        return;
    };
    if (newMember.guild.id !== "868882085635567616") {
        return;
    };
    const FetchingLogs = oldMember.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_ROLE_UPDATE",
    })

    oldMember.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_ROLE_UPDATE"
    }).catch(() => {
        bot.channels.cache.get(config.actionlog).send('Unable to log: "guildMemberUpdate" event')
        return console.log(red('Unable to log: "guildMemberUpdate" event'));
    })

    FetchingLogs.catch(() => {
        bot.channels.cache.get(config.actionlog).send('Missing Permissions To Log Entry: Member Role Update')
        return console.log(red('Missing Permissions To Log Entry: Member Role Update'));
    })
    const MRU = (await FetchingLogs).entries.first();
    if (!MRU) {
        bot.channels.cache.get(config.actionlog).send(`MEMBER ROLE UPDATE: ${oldMember.user.tag} roles was updated in ${oldMember.guild.name} but nothing was registered in the audit log...`)
        return console.log(red(`MEMBER ROLE UPDATE: ${oldMember.user.tag} roles was updated in ${oldMember.guild.name} but nothing was registered in the audit log...`));
    }
    const { target, executor, createdAt } = MRU;
    if (target.id === oldMember.id) {
        bot.channels.cache.get(config.actionlog).send(`MEMBER ROLE UPDATE: ${oldMember.user.tag} was updated in ${oldMember.guild.name}, by ${executor.tag}`)
        console.log(greenBright(`MEMBER ROLE UPDATE: ${oldMember.user.tag} was updated in ${oldMember.guild.name}, by ${executor.tag}`));
    } else if (target.id === executor.id) {
        return;
    }
    const Trusted = TrustedUserIDs.find((user) => user === `${executor.id}`);
    if (executor.id === bot.user.id) {
        return;
    } else if (executor.id === newMember.guild.ownerID) {
        return;
    } else if (executor.id === Trusted) {
        return;
    } else if (!oldMember.permissions.has("ADMINISTRATOR") && newMember.permissions.has("ADMINISTRATOR")) {
        oldMember.guild.members.ban(executor.id, {
            reason: `Unauthorised Member Role Updated`
        }).then(bot.channels.cache.get(config.actionlog).send(`**Unauthorised Member Role Update By:** ${executor.tag} \n**Victim** ${oldMember.user.tag} \n**Permission Update:** \`ADMINISTRATOR\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban | Executor & Victim.`))
            .then(oldMember.guild.members.ban(newMember.id, {
                reason: "Illegal Passing of Permissions: ADMINISTRATOR"
            }))
            .catch(() => {
                bot.channels.cache.get(config.actionlog).send('Unable to Ban User')
                return console.log(red('Unable to Ban User'));
            });
    } else if (!oldMember.permissions.has("KICK_MEMBERS") && newMember.permissions.has("KICK_MEMBERS")) {
        oldMember.guild.members.ban(executor.id, {
            reason: `Unauthorised Member Role Updated`
        }).then(bot.channels.cache.get(config.actionlog).send(`**Unauthorised Member Role Update By:** ${executor.tag} \n**Victim** ${oldMember.user.tag} \n**Permission Update:** \`KICK_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban | Executor & Victim.`))
            .then(oldMember.guild.members.ban(newMember.id, {
                reason: "Illegal Passing of Permissions: KICK_MEMBERS"
            }))
            .catch(() => {
                bot.channels.cache.get(config.actionlog).send('Unable to Ban User')
                return console.log(red('Unable to Ban User'));
            });
    } else if (!oldMember.permissions.has("BAN_MEMBERS") && newMember.permissions.has("BAN_MEMBERS")) {
        oldMember.guild.members.ban(executor.id, {
            reason: `Unauthorised Member Role Updated`
        }).then(bot.channels.cache.get(config.actionlog).send(`**Unauthorised Member Role Update By:** ${executor.tag} \n**Victim** ${oldMember.user.tag} \n**Permission Update:** \`BAN_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban | Executor & Victim.`))
            .then(oldMember.guild.members.ban(newMember.id, {
                reason: "Illegal Passing of Permissions: BAN_MEMBERS"
            }))
            .catch(() => {
                bot.channels.cache.get(config.actionlog).send('Unable to Ban User')
                return console.log(red('Unable to Ban User'));
            });
    }
});

// INVITE TRACK

//var joinpng = {};
//joinpng.create = Canvas.createCanvas(1024, 500)
//joinpng.context = joinpng.create.getContext('2d')
//joinpng.context.font = '72px sans-serif';
//joinpng.context.fillStyle = '#ffffff';
//
//Canvas.loadImage('https://cdn.discordapp.com/attachments/872742229469442048/872749412982599760/7047_invisible.png').then(async (img) => {
//    joinpng.context.drawImage(img, 0, 0, 1024, 500)
//    joinpng.context.fillText("ยินดีต้อนรับ", 360, 360);
//    joinpng.context.beginPath();
//    joinpng.context.arc(512, 166, 128, 0, Math.PI * 2, true);
//    joinpng.context.stroke()
//    joinpng.context.fill()
//})
//var leavepng = {};
//leavepng.create = Canvas.createCanvas(1024, 500)
//leavepng.context = leavepng.create.getContext('2d')
//leavepng.context.font = '72px sans-serif';
//leavepng.context.fillStyle = '#ffffff';
//
//Canvas.loadImage('https://cdn.discordapp.com/attachments/872742229469442048/872749412982599760/7047_invisible.png').then(async (img) => {
//    leavepng.context.drawImage(img, 0, 0, 1024, 500)
//    leavepng.context.fillText("บ๊ายบายยย", 360, 360);
//    leavepng.context.beginPath();
//    leavepng.context.arc(512, 166, 128, 0, Math.PI * 2, true);
//    leavepng.context.stroke()
//    leavepng.context.fill()
//})


const invites = {};
const wait = require('util').promisify(setTimeout);
bot.on('ready', async () => {
    await wait(100);
    bot.guilds.cache.forEach(g => {
        g.fetchInvites().then(guildInvites => {
            invites[g.id] = guildInvites;
        });
    });
});
bot.on('guildMemberAdd',  (member) => {
    if (member.guild.id !== "868882085635567616") {
        return;
    };
    const membercount = "873101214873706507";
    const botcount = "873101265624768522";
    function checkBots(guild) {
        let botCount = 0;
        guild.members.cache.forEach(member => {
            if(member.user.bot) botCount++;
        });
        return botCount;
    };
    function checkMembers(guild) {
        let memberCount = 0;
        guild.members.cache.forEach(member => {
            if(!member.user.bot) memberCount++;
        });
        return memberCount;
    };
    bot.channels.cache.get(membercount).setName(`Member Count : ${checkMembers(member.guild)}`);
    bot.channels.cache.get(botcount).setName(`Bot Count : ${checkBots(member.guild)}`);
    console.log(`
Member : ${checkMembers(member.guild)}
Bot : ${checkBots(member.guild)}`);
    //bot.channels.cache.get(botcount).edit(`Bot Count : ${member.guild.}`)
    member.guild.fetchInvites().then(guildInvites => {
        const ei = invites[member.guild.id];
        invites[member.guild.id] = guildInvites;
        const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
        const inviter = bot.users.cache.get(invite.inviter.id);
        const log2Channel = "870977740906590228"
        const guildMemberAdd = new Discord.MessageEmbed()
            .setAuthor(member.user.tag, member.user.avatarURL())
            .setFooter(`® ${member.guild.name} | เวอร์ชั่น ${config.version}`, `${member.guild.iconURL()}`)
            .setColor(config.colorsuccess)
            .setDescription(`
${member.user.tag} **ได้เข้าเซิฟ**\n
**ข้อมูลของผู้ใช้**
${member.user} | ${member.user.tag} - (${member.user.id})\n
**สร้างบัญชีเมื่อ**
${new Date(member.user.createdTimestamp).toDateString()}\n
**เข้าเซิฟเมื่อ**
${new Date(member.joinedTimestamp).toDateString()}\n
**ลิ้งค์เชิญ**
${invite.code}\n
**ลิ้งค์สร้างโดย**
${inviter.tag}\n
**จำนวนสมาชิกทั้งหมด**
${member.guild.memberCount}\n
`)
        //`\`${member.user.tag}\` เข้า \`${member.guild.name}\` โดยโค๊ด \`${invite.code}\` จาก ${inviter.tag}. ถูกใช้มาแล้ว \`${invite.uses}\` ครั้ง`
        bot.channels.cache.get(log2Channel).send(guildMemberAdd);
    });
    //const logChannel = "870977740906590228"
    //let canvas = joinpng;
    //canvas.context.font = '42px sans-serif',
    //canvas.context.textAlign = 'center';
    //canvas.context.fillText(member.user.tag.toUpperCase(), 512, 410)
    //canvas.context.font = '32px sans serif'
    //canvas.context.fillText(`คุณเข้ามาเป็นคนที่ ${member.guild.memberCount}`, 512, 455)
    //canvas.context.beginPath()
    //canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true)
    //canvas.context.closePath()
    //canvas.context.clip()
    //await Canvas.loadImage(member.user.displayAvatarURL({format: 'png', size: 1024}))
    //.then(img => {
    //    canvas.context.drawImage(img, 393, 47, 238, 238);
    //})
    //let atta = new Discord.MessageAttachment(canvas.create.toBuffer(), `ยินดีต้อนรับ ${member.id}.png`)
    //try {
    //    bot.channels.cache.get(logChannel).send(`<:armedforces:867041964213534740> สวัสดีคุณ ${member}, ยินดีต้อนรับเข้าสู่ ${member.guild.name}!`, atta)
    //} catch (error) {
    //    console.log(error)
    //}
});
bot.on('guildMemberRemove',  (member) => {
    if (member.guild.id !== "868882085635567616") {
        return;
    };
    const membercount = "873101214873706507";
    const botcount = "873101265624768522";
    function checkBots(guild) {
        let botCount = 0;
        guild.members.cache.forEach(member => {
            if(member.user.bot) botCount++;
        });
        return botCount;
    };
    function checkMembers(guild) {
        let memberCount = 0;
        guild.members.cache.forEach(member => {
            if(!member.user.bot) memberCount++;
        });
        return memberCount;
    };
    bot.channels.cache.get(membercount).setName(`Member Count : ${checkMembers(member.guild)}`);
    bot.channels.cache.get(botcount).setName(`Bot Count : ${checkBots(member.guild)}`);
    console.log(`
Member : ${checkMembers(member.guild)}
Bot : ${checkBots(member.guild)}`);
    const log2Channel = "870977740906590228";
    const guildMemberRemove = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.avatarURL())
        .setFooter(`® ${member.guild.name} | เวอร์ชั่น ${config.version}`, `${member.guild.iconURL()}`)
        .setColor(config.colorfail)
        .setDescription(`
${member.user.tag} **ได้ออกจากเซิฟ**\n
**ข้อมูลของผู้ใช้**
${member.user} | ${member.user.tag} - (${member.user.id})\n
**สร้างบัญชีเมื่อ**
${new Date(member.user.createdTimestamp).toDateString()}\n
**เข้าเซิฟเมื่อ**
${new Date(member.joinedTimestamp).toDateString()}\n
**ยศที่ผู้ใช้มี**
${member.roles.cache.map(({ name }) => name).join(', ')}\n
**จำนวนสมาชิกทั้งหมด**
${member.guild.memberCount}\n
`)
    //`\`${member.user.tag}\` เข้า \`${member.guild.name}\` โดยโค๊ด \`${invite.code}\` จาก ${inviter.tag}. ถูกใช้มาแล้ว \`${invite.uses}\` ครั้ง`
    bot.channels.cache.get(log2Channel).send(guildMemberRemove);
    //const logChannel = "870977740906590228"
    //let canvas = leavepng;
    //canvas.context.font = '42px sans-serif',
    //canvas.context.textAlign = 'center';
    //canvas.context.fillText(member.user.tag.toUpperCase(), 512, 410)
    //canvas.context.font = '32px sans serif'
    //canvas.context.fillText(`เหลือสมาชิก ${member.guild.memberCount}`, 512, 455)
    //canvas.context.beginPath()
    //canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true)
    //canvas.context.closePath()
    //canvas.context.clip()
    //await Canvas.loadImage(member.user.displayAvatarURL({format: 'png', size: 1024}))
    //.then(img => {
    //    canvas.context.drawImage(img, 393, 47, 238, 238);
    //})
    //let atta = new Discord.MessageAttachment(canvas.create.toBuffer(), `บ๊ายบายยยย ${member.id}.png`)
    //try {
    //    bot.channels.cache.get(logChannel).send(`<:armedforces:867041964213534740> คุณ ${member}, ได้ออกจาก ${member.guild.name}!`, atta)
    //} catch (error) {
    //    console.log(error)
    //}
});

//LOG
const sniper = new Discord.Collection()
bot.on('messageDelete', message => {
    if (message.guild.id !== "868882085635567616") {
        return;
    };
    sniper.set(message.channel.id, message);
    const deletelog = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} - (${message.author.id})`, message.author.avatarURL())
        .setFooter(`® ${message.guild.name} | เวอร์ชั่น ${config.version}`, `${message.guild.iconURL()}`)
        .setTimestamp(Date.now())
        .setColor(config.colorfail)
        .setDescription(`**Message Delete**
In : ${message.channel}
Message : ${message.content}`)
    bot.channels.cache.get(config.actionlog).send(deletelog);
});
bot.on('messageUpdate', async (oldMessage, newMessage) => {
    if (oldMessage.guild.id !== "868882085635567616") {
        return;
    };
    if (newMessage.guild.id !== "868882085635567616") {
        return;
    };
    const editlog = new Discord.MessageEmbed()
        .setAuthor(`${oldMessage.author.tag} - (${oldMessage.author.id})`, oldMessage.author.avatarURL())
        .setFooter(`® ${oldMessage.guild.name} | เวอร์ชั่น ${config.version}`, `${oldMessage.guild.iconURL()}`)
        .setTimestamp(Date.now())
        .setColor(config.colorwait)
        .setDescription(`**Message Update**
In : ${oldMessage.channel}
Before : ${oldMessage.content}
After : ${newMessage.content}`)
    bot.channels.cache.get(config.actionlog).send(editlog);
});

//MESSAGE RESPOND
bot.on('message', async (message) => {
    if (message.guild.id !== "868882085635567616") {
        return;
    };
    if (message.member.user.bot) {
        return;
    };
    let badwordlist =
        [
            "fuck",
            "f*ck",
            "bitch",
            "dick",
            "kuy",
            "pussy",
            "k*y",
            "ลาบ",
            "ต่อย",
            "โง่",
            "เหี้ย",
            "ไอเหี้ย",
            "ควย",
            "ควาย",
            "ไอสัด",
            "ไอสัส",
            "กู",
            "มึง",
            "แม่ง",
            "กระจอก",
            "บอทกระจอก",
            "บอทโง่",
            "บอทควาย",
            "ตูด",
            "เงี่ยน",
            "เงี่*น",
            "แมร่ง"
        ]
    let badwordanswer = 
        [
            "พิมพ์ดีๆหน่อยครับ",
            "อย่าพิมพ์คำหยาบดิไอสัส!",
            "หิวแดกข้าว ห้าวแดกตีนกูมั้ย!?",
            "ถ้าพิมพ์คำหยาบอีกรอบ หนูฟ้องครูแล้วนะ :(",
            "อย่าพิมพ์คำหยาบดิไอควาย!"
        ]
    let adminbadwordanswer = 
        [
            "แอดมินเวร อย่าพิมพ์คำหยาบดิ",
            "ไม่อยากจะเชื่อว่าเขาเอามึงเป็นแอดมินได้ยังไง!?",
            "มึงเป็นแอดมิน กรุณาสำรวมหน่อยนะครับ",
            "สุภาพหน่อยดิ คุณแอดมิน"
        ]
    let badword = false;
    for (let i in badwordlist) {
        if (message.content.toLocaleLowerCase().includes(badwordlist[i])) {
            badword = true;
        };
    };
    if (badword) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            message.reply(adminbadwordanswer[Math.floor(Math.random() * adminbadwordanswer.length)]);
        } else {
            message.reply(badwordanswer[Math.floor(Math.random() * badwordanswer.length)]);
        }
    };
    if (message.mentions.users.get("719840703311773726")) {
        if (message.author.id == "719840703311773726") {
            return;
        };
        if (message.author.id !== "445218908010577930") {
            message.channel.send(`${message.author} แฟน <@445218908010577930> ครับ อย่ายุ่ง`);
        } else {
            message.channel.send(`<@719840703311773726> ที่รักเรียกค้าบบ`);
        };
    };
    if (message.mentions.users.get("445218908010577930")) {
        if (message.author.id == "445218908010577930") {
            return;
        };
        if (message.author.id !== "719840703311773726") {
            message.channel.send(`${message.author} แฟน <@719840703311773726> ครับ อย่ายุ่ง`);
        } else {
            message.channel.send(`<@445218908010577930> ที่รักเรียกค้าบบ`);
        };
    };

});

require('./config/command')(bot);
require('./config/event')(bot);
bot.login(process.env.token);