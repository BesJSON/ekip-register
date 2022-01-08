const Discord = require("discord.js")
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    if(!ayarlar.yetkiliRol.some(arwww => message.member.roles.cache.has(arwww)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarlar.no} **Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`).then(x => x.delete({ timeout: 5000 })).then(message.react((ayarlar.no)))
  
  
    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!etiketlenenKişi) return message.channel.send(`${ayarlar.no} **Kaydetmek için bir kişi etiketle! Örn: Beş/İD**`).then(x => x.delete({ timeout: 10000 })).then(message.react((ayarlar.no)))
const İsim = args[1];
const yaş = args[2];
if(!İsim) return message.channel.send(arwEmbed.setDescription(`${ayarlar.no} **Kaydetmek için bir isim belirtmelisin! Örn: Beş/İD**`).then(x => x.delete({ timeout: 5000 })).then(message.react((ayarlar.no))))
if(!yaş) return message.channel.send(`${ayarlar.no} **Kaydetmek için bir yaş belirtmelisin! Örn: Beş 18/İD**`).then(x => x.delete({ timeout: 5000 })).then(message.react((ayarlar.no)))
if(isNaN(yaş)) return message.channel.send(`${ayarlar.no} **Belirttiğin yaş rakamlardan oluştur! Ferhat 18**`).then(x => x.delete({ timeout: 5000 })).then(message.react((ayarlar.no)))
  
etiketlenenKişi.roles.add(ayarlar.erkekRol1)
etiketlenenKişi.roles.add(ayarlar.erkekRol2)
etiketlenenKişi.roles.add(ayarlar.erkekRol3)
etiketlenenKişi.roles.remove(ayarlar.kayıtsızRol)
etiketlenenKişi.roles.remove(ayarlar.yenihesap)
etiketlenenKişi.roles.remove(ayarlar.kadınRol1)
etiketlenenKişi.roles.remove(ayarlar.kadınRol2)

etiketlenenKişi.setNickname(`${İsim} ${ayarlar.sembol} ${yaş}`)

message.react(ayarlar.yes)

const arwEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`**Kullanıcının ismini \`${İsim} ${ayarlar.sembol} ${yaş}\` olarak değiştirdim ve ona <@&${ayarlar.erkekRol1}> rolünü verdim!**
**.isimler @Kullanıcı/ID** yazarak kullanıcının eski isimlerini göre bilirsiniz.`)
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()

message.channel.send(arwEmbed)

db.push(`isimler.${etiketlenenKişi.id}`, {
İsim: İsim,
Yaş: yaş,
Yetkili: message.author.id
})

db.add(`erkekTeyit.${message.member.id}`, `1`)
db.add(`toplamTeyit.${message.member.id}`, `1`)

client.channels.cache.get(ayarlar.sohbetKanal).send(`${etiketlenenKişi} **Hoşgeldin!** <:cukurkalp:922942603777937418>`).then(x => x.delete({ timeout: 31000 }))
  
}
exports.config = {
    name: "erkek",
    guildOnly: true,
    aliases: ["e", "male"]
}