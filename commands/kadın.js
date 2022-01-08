const Discord = require("discord.js")
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    if(!ayarlar.yetkiliRol.some(arwww => message.member.roles.cache.has(arwww)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarlar.no} **Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`).then(x => x.delete({ timeout: 9000 })).then(message.react((ayarlar.no)))
  
    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!etiketlenenKişi) return message.channel.send(`${ayarlar.no} **Kaydetmek için bir kişi etiketle! Örn: Beş/ID**`).then(x => x.delete({ timeout: 5000 })).then(message.react((ayarlar.no)))
  
const isim = args[1];
const yaş = args[2];
if(!isim) return message.channel.send(`${ayarlar.no} **Kaydetmek için bir isim belirtmelisin! Örn: Beş/ID Ferhat**`).then(x => x.delete({ timeout: 5000 })).then(message.react((ayarlar.no)))
if(!yaş) return message.channel.send(`${ayarlar.no} **Kaydetmek için bir yaş belirtmelisin! Örn: Beş/ID Ferhat 18**`).then(x => x.delete({ timeout: 5000 })).then(message.react((ayarlar.no)))
if(isNaN(yaş)) return message.channel.send(`${ayarlar.no} **Belirttiğin yaş rakamlardan oluşturmalısın! Beş/ID Ferhat 18`).then(x => x.delete({ timeout: 5000 })).then(message.react((ayarlar.no)))
  
etiketlenenKişi.roles.add(ayarlar.kadınRol1)
etiketlenenKişi.roles.add(ayarlar.kadınRol2)
etiketlenenKişi.roles.remove(ayarlar.kayıtsızRol)
etiketlenenKişi.roles.remove(ayarlar.yenihesap)
etiketlenenKişi.roles.remove(ayarlar.erkekRol1)
etiketlenenKişi.roles.remove(ayarlar.erkekRol2)
etiketlenenKişi.setNickname(`${isim} ${ayarlar.sembol} ${yaş}`)

message.react(ayarlar.yes)

const arwEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`**Kullanıcının ismini \`${isim} ${ayarlar.sembol} ${yaş}\` olarak değiştirdim ve ona <@&${ayarlar.kadınRol1}> rolünü verdim!**
**.isimler @Kullanıcı/ID** yazarak kullanıcının eski isimlerini göre bilirsiniz.`)
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()

message.channel.send(arwEmbed)

db.push(`isimler.${etiketlenenKişi.id}`, {
İsim: isim,
Yaş: yaş,
Yetkili: message.author.id
})

db.add(`kadinTeyit.${message.member.id}`, `1`)
db.add(`toplamTeyit.${message.member.id}`, `1`)

client.channels.cache.get(ayarlar.sohbetKanal).send(`${etiketlenenKişi} **Hoşgeldin!** <:cukurkalp:922942603777937418>`).then(x => x.delete({ timeout: 30000 }))
  
}
exports.config = {
    name: "kadın",
    guildOnly: true,
    aliases: ["k", "female", "kız"]
}