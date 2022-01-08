const Discord = require("discord.js")
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarlar.no} **Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`).then(x => x.delete({timeout: 3000})).then(message.react(client.ayarlar.no));

    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!etiketlenenKişi) return message.channel.send(`${ayarlar.no} **Kayıtsıza atmak için bir kişi etiketle!**`).then(x => x.delete({timeout: 3000})).then(message.react((ayarlar.no)))

if(message.member.roles.highest.position <= etiketlenenKişi.roles.highest.position) return message.channel.send(`${ayarlar.no} **Senden üstte/aynı pozisyonda bir kişiyi kayıtsıza atamazsın!**`).then(x => x.delete({timeout: 3000})).then((client.ayarlar.no));

const arwEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()

etiketlenenKişi.roles.set([ayarlar.kayıtsızRol])
etiketlenenKişi.setNickname(`İsim | Yaş`)

message.react(ayarlar.yes)

message.channel.send(arwEmbed.setDescription(`Kullanıcı başarıyla kayıtsıza (<@&${ayarlar.kayıtsızRol}>) attım!`)).then(x => x.delete({ timeout: 10000 })).then(message.react(client.emojis.cache.get(ayarlar.yes))) //Youtube Matthe

}
exports.config = {
    name: "kayıtsız",
    guildOnly: true,
    aliases: ["unregistered", "yallah", "kayitsiz", "unreg", "unregister"]
}