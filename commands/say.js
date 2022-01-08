const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
exports.run= async (client, message, args) => {       

  module.exports = {
    name: 'sunucusay',
    aliases: ['üyesay'],
    category: 'commands',
    usage: '',
    permission: 'ADMINISTRATOR',
    guildOnly: true,
    cooldown: 5 }
    
let Tag = (ayarlar.tag)
let Etiket = (ayarlar.etikettag) 

   let TotalMember = message.guild.memberCount
          let Online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
          let Taglı = message.guild.members.cache.filter(u => u.user.username.includes(Tag)).size;
          let Etiketiniz = message.guild.members.cache.filter(u => u.user.discriminator.includes(Etiket)).size;
          let toplamTag = Etiketiniz + Taglı
          let Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
          let Boost = message.guild.premiumSubscriptionCount;
          var boostlevel = message.guild.premiumTier
          let botMembers = message.guild.members.cache.filter(member => member.user.bot && member.voice.channel).size.toString();
message.channel.send(new Discord.MessageEmbed().setDescription(`
<a:light_tacbeyaz:922942823609810966> Sunucumuzda toplam **\`${TotalMember}\`** kullanıcı bulunuyor.(**\`${Online}\`** kişi aktif)
<a:light_tacbeyaz:922942823609810966> **Normal** tagımızda **\`${Taglı}\`** kullanıcı bulunuyor.
<a:light_tacbeyaz:922942823609810966> **1973** tagımızda **\`${Etiketiniz}\`** kullanıcı bulunmaktadır.
<a:light_tacbeyaz:922942823609810966> **Ses kanallarında** **\`${Voice}\`** kullanıcı bulunmaktadır.(**\`+${botMembers}\`** bot seste)
<a:light_tacbeyaz:922942823609810966> Sunucumuzda **\`${Boost}\`** adet **boost** bulunmaktadır.(\`${boostlevel}\`. seviye)
`)).then(x => x.delete({ timeout: 10000 }))

message.react(ayarlar.yes)

}
exports.config = {
    name: "sunucusay",
    guildOnly: true,
    aliases: ["sunucusay"]
}