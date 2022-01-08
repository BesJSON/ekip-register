const Discord = require("discord.js")
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarlar.no} **Bu işlemi gerçekleştirmek için gerekli yetkin bulunmuyor!**`).then(x => x.delete({timeout: 3000})).then(message.react(client.ayarlar.no));

    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!etiketlenenKişi) return message.channel.send(`${ayarlar.no} **Rolsüz vermek için bir kişi etiketle!**`).then(x => x.delete({timeout: 3000})).then(message.react(client.emojis.cache.get(ayarlar.no)))

if(message.member.roles.highest.position <= etiketlenenKişi.roles.highest.position) return message.channel.send(`${ayarlar.no} **Senden üstte/aynı pozisyonda bir kişiye rolsüz veremezsin!**`).then(x => x.delete({timeout: 3000})).then(message.react(client.ayarlar.no));

const arwEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()

etiketlenenKişi.roles.set([ayarlar.kayıtsızRol])

message.react(ayarlar.yes)

message.channel.send(arwEmbed.setDescription(`Kullanıcıya başarıyla rolsüz verdim!`)).then(x => x.delete({ timeout: 10000 })).then(message.react(client.emojis.cache.get(ayarlar.yes))) //Youtube Matthe

}
exports.config = {
    name: "rolsüz",
    guildOnly: true,
    aliases: ["rolsüz", "r", "rolsuz"]
}