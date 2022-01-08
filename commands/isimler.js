const Discord = require("discord.js")
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
  
    if(!ayarlar.yetkiliRol.some(arwww => message.member.roles.cache.has(arwww)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarlar.no} **Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`).then(x => x.delete({ timeout: 5000 })).then(((ayarlar.no)))

    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author

const arwEmbed = new Discord.MessageEmbed()
.setColor("2f3136")
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()

let isimler = db.get(`isimler.${etiketlenenKişi.id}`) || [];
isimler = isimler.reverse()
let isimler2 = isimler.length > 0 ? isimler.map((value) => `${value.İsim} ${ayarlar.sembol} ${value.Yaş}  ( <@!${value.Yetkili}> ) tarafından kayıt edilmiş`).join("\n") : `${ayarlar.no} ${etiketlenenKişi} kullanıcısına ait isim bulunamadı!`

message.react(ayarlar.yes)

message.channel.send(arwEmbed.setDescription(`
${ayarlar.yes} ${etiketlenenKişi} kullanıcısına ait isimler:

${isimler2}
`)).then(x => x.delete({ timeout: 10000 }))

}
exports.config = {
    name: "isimler",
    guildOnly: true,
    aliases: ["names", "nicknames"]
}