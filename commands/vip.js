const Discord = require("discord.js")
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarlar.no} **Bu işlemi gerçekleştirmek için gerekli yetkin bulunmuyor!`).then(x => x.delete({timeout: 3000})).then(message.react(client.ayarlar.no));

    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!etiketlenenKişi) return message.channel.send(`${ayarlar.no} **Vip vermek için bir kişi etiketlemelisin!**`).then(x => x.delete({timeout: 3000})).then(message.react(client.ayarlar.no));

const arwEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()

if(etiketlenenKişi.roles.cache.has(ayarlar.vipRol)) return message.channel.send(arwEmbed.setDescription(`Kullanıcıdan başarıyla vip <@&${ayarlar.vipRol}> rolü alındı!`)).then(etiketlenenKişi.roles.remove(ayarlar.vipRol)).then(x => x.delete({timeout: 5000})).then(message.react(client.ayarlar.yes));

etiketlenenKişi.roles.add(ayarlar.vipRol)
etiketlenenKişi.roles.remove(ayarlar.kayıtsızRol)

message.react(ayarlar.yes)

message.channel.send(arwEmbed.setDescription(`Kullanıcıya başarıyla <@&${ayarlar.vipRol}> rolünü verdim!`)).then(x => x.delete({timeout: 8000})).then(message.react(client.ayarlar.yes));

}
exports.config = {
    name: "vip",
    guildOnly: true,
    aliases: ["special", "very-important-person", "vip"]
}