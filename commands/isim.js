const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    if(!ayarlar.yetkiliRol.some(arwww => message.member.roles.cache.has(arwww)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarlar.no} **Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`).then(x => x.delete({timeout: 3000})).then(message.react(ayarlar.no));

    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!etiketlenenKişi) return message.channel.send(`${ayarlar.no} **İsim değiştirmek için bir kişi etiketle! Örn: Beş/İD**`).then(x => x.delete({timeout: 3000})).then(message.react(ayarlar.no));

const isim = args[1];
const yaş = args[2];
if(!isim) return message.channel.send(`${ayarlar.no} **İsim değiştirmek için bir isim belirtmelisin! Örn: Ferhat**`).then(x => x.delete({timeout: 3000})).then(message.react(ayarlar.no));
if(!yaş) return message.channel.send(`${ayarlar.no} **İsim değiştirmek için için bir yaş belirtmelisin! Örn: Ferhat 18**`).then(x => x.delete({timeout: 3000})).then(message.react(ayarlar.no));
if(isNaN(yaş)) return message.channel.send(`${ayarlar.no} **Belirttiğin yaş rakamlardan oluşturmalısın!**`).then(x => x.delete({timeout: 3000})).then(message.react(ayarlar.no));

etiketlenenKişi.setNickname(`${isim} ${ayarlar.sembol} ${yaş}`)

message.react(ayarlar.yes)

const arwEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`Kullanıcının ismini \`${isim} ${ayarlar.sembol} ${yaş}\` olarak değiştirdim!`)//Youtube Matthe
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()

message.channel.send(arwEmbed)

db.push(`isimler.${etiketlenenKişi.id}`, {
İsim: isim,
Yaş: yaş,
Yetkili: message.author.id
})

}
exports.config = {
    name: "isim",
    guildOnly: true,
    aliases: ["i", "nick"]
}