

const Discord = require("discord.js")
const client = new Discord.Client()
const ayarlar = require("./ayarlar.json")
const moment = require("moment")
const fs = require("fs")
const db = require("quick.db")
const chalk = require("chalk")
require('./util/Loader.js')(client)

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir('./commands/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} komut yüklenecek.`)
  files.forEach(f => {                    
    let props = require(`./commands/${f}`)
    console.log(`${props.config.name} komutu yüklendi.`)
    client.commands.set(props.config.name, props)
    props.config.aliases.forEach(alias => {       
      client.aliases.set(alias, props.config.name)
    });
  });
})

client.on('message', async message => {
  
  if(message.content === '-tag') {
    message.channel.send(`\`${ayarlar.taglar}\``)
    message.react(ayarlar.yes)
  }
  })

client.on("ready", async () => {
  client.user.setPresence({ activity: { name: "Beş 💙 Hasta" , type: "WATCHING"}, status: "idle" });
  })

client.on("ready", () => {
    console.log(chalk.redBright(`beş Register Bot Aktif!`))
})




client.tarihHesapla = (date) => {
    const startedAt = Date.parse(date);
    var msecs = Math.abs(new Date() - startedAt);

    const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
    msecs -= years * 1000 * 60 * 60 * 24 * 365;
    const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
    msecs -= months * 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
    msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
    msecs -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msecs / (1000 * 60 * 60));
    msecs -= hours * 1000 * 60 * 60;
    const mins = Math.floor((msecs / (1000 * 60)));
    msecs -= mins * 1000 * 60;
    const secs = Math.floor(msecs / 1000);
    msecs -= secs * 1000;

    var string = "";
    if (years > 0) string += `${years} yıl ${months} ay`
    else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
    else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
    else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
    else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
    else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
    else if (secs > 0) string += `${secs} saniye`
    else string += `saniyeler`;

    string = string.trim();
    return `\`${string} önce\``;
};




client.on("guildMemberAdd", member => {
  
    let hgkanal = member.guild.channels.cache.get(ayarlar.hgkanal)
    let guvenilirlik = Date.now() - member.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7;
    let guild = member.client.guilds.cache.get(ayarlar.sunucuid)
    let endAt = member.user.createdAt
    let gün = moment(new Date(endAt).toISOString()).format('DD')
    let ay = moment(new Date(endAt).toISOString()).format('MM').replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
    let yıl = moment(new Date(endAt).toISOString()).format('YYYY')
    let saat = moment(new Date(endAt).toISOString()).format('HH:mm')
    let dk = moment(new Date(endAt).toISOString()).format('MM:ss')
    let kuruluş = `${gün} ${ay} ${yıl} (Saat - ${saat})`;

    if (guvenilirlik === false) {
        member.roles.add(ayarlar.kayıtsızRol)
        member.roles.add(ayarlar.kayıtsızRol)
        member.roles.add(ayarlar.kayıtsızRol)
        member.roles.add(ayarlar.cekilis)
        member.roles.add(ayarlar.etkinlik)
        member.setNickname(`• Lütfen Kayıt Olunuz`) /// istedigi yap//
        hgkanal.send(`
<a:marmara_heart4:922942766886060102> ${member} - (\`${member.id}\`) **Hasta La Vista'ya hoşgeldin!**

<a:saat:922943860131397662> **Hesabın __${kuruluş}__ tarihinde oluşturulmuş.** Güvenli <:mark2:922942421959057468>
    
<a:__:922942696539185212> **Seninle beraber ${guild.memberCount} kişiye ulaştık.**

<:kurallar:922943751129804861> \` Ceza-i işlemlerin \` <#906946871489073173> **kanalını okuduğunu varsayarak gerçekleştirilecek.**

<a:marmara_star4:922942470017409114> **Tagımızı \`(✧)\` alarak ailemize katıla bilirsin.**

<:online:922946559841296424> <@&901091598631305286> **Yetkilileri sana yardımcı olucak. Şimdiden iyi eğlenceler! :tada: :tada: :tada:**
`)
    } else {
        member.roles.set([ayarlar.yenihesap])
        member.setNickname(`New Account`)
        hgkanal.send(`
<:warned:922943697253990432> ${member} - (\`${member.id}\`) **Hasta La Vista'ya, hoşgeldin.
        
<a:saat:922943860131397662> **Hesabın __${kuruluş}__ tarihinde oluşturulmuş.** Tehlikeli <:no_zade:922930823584419901>

<:online:922946559841296424> **Sunucunun güvenliği için ${member} **Karantinaya** (<@&922939474961395772>) yolladım.

<a:marmara_star4:922930768525799454> <@&922946732818579527> rolündeki yetkililerle iletişime geç!
`)
}
  });
  
client.login(ayarlar.Token)

    

client.on("ready", () => {
  client.channels.cache.get(ayarlar.botSesKanal).join();
  });

client.on("userUpdate", async function(oldUser, newUser) { 
    const guildID = (ayarlar.sunucuid)
    const roleID = (ayarlar.tagRol)
    const tag = (ayarlar.tag)
    const chat = (ayarlar.sohbetKanal)
    const taglog = (ayarlar.tagLog)
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0010').setTimestamp().setFooter('Developed by Ferhat');
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
          member.roles.remove("901091598631305286")
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} **isiminden \`✧\` çıkardığı için ondan <@&906220804818227201> rolünü aldım!**`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(`**${newUser} \`Cent tagımızı alarak ailemize katıldı!** <a:dp_gpembetac:922930940441919530>`).then(x => x.delete({ timeout: 15000 }))
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} **ismine \`✧\` aldığı için ona <@&906220804818227201> rolünü verdim!**`))
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == (ayarlar.etikettag) && newUser.discriminator !== (ayarlar.etikettag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} **isiminden \`1973\` çıkardığı için <@&906220804818227201> rolünü aldım!**`))
        } else if (oldUser.discriminator !== (ayarlar.etikettag) && newUser.discriminator == (ayarlar.etikettag)) {
            member.roles.add(roleID)-
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} **isimine \`1973,\` aldığı için <@&906220804818227201> rolünü verdim!**`))
            client.channels.cache.get(chat).send(`**${newUser} \`0050\` tagımızı alarak ailemize katıldı!** <a:dp_gpembetac:922930940441919530>`).then(x => x.delete({ timeout: 15000 }))
        }
    }
  
  })

///////---loglarrrr--/////


client.on('voiceStateUpdate', (oldMember, newMember) => {
    { 
      let giriş = client.channels.cache.get('922941446875676682');
      let çıkış = client.channels.cache.get('922941446875676682');
      let odadeğişme = client.channels.cache.get('922941446875676682');
      let logKanali = client.channels.cache.get('922941446875676682');
      let susturma = client.channels.cache.get('922941446875676682');
      let sağırlaştırma = client.channels.cache.get('922941446875676682');
  
      if (oldMember.channelID && !oldMember.serverMute && newMember.serverMute) return logKanali.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda yetkili tarafından **susturdu!**`).catch();
      if (!oldMember.channelID && newMember.channelID) return giriş.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanala **katıldı!**`).catch();
      if (oldMember.channelID && !newMember.channelID) return çıkış.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(oldMember.channelID).name}\` adlı sesli kanaldan **ayrıldı!**`).catch();
      if (oldMember.channelID && newMember.channelID && oldMember.channelID != newMember.channelID) return odadeğişme.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi ses kanalını **değiştirdi!** (\`${newMember.guild.channels.cache.get(oldMember.channelID).name}\` => \`${newMember.guild.channels.cache.get(newMember.channelID).name}\`)`).catch();
      if (oldMember.channelID && oldMember.selfMute && !newMember.selfMute) return susturma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendi susturmasını **kaldırdı!**`).catch();
      if (oldMember.channelID && !oldMember.selfMute && newMember.selfMute) return susturma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendini **susturdu!**`).catch();
      if (oldMember.channelID && oldMember.selfDeaf && !newMember.selfDeaf) return sağırlaştırma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendi sağırlaştırmasını **kaldırdı!**`).catch();
      if (oldMember.channelID && !oldMember.selfDeaf && newMember.selfDeaf) return sağırlaştırma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendini **sağırlaştırdı!**`).catch();
    };
  });


//----------------------------------------------------- TAG ROL ------------------------------------------------\\

//dm mesaj \\

client.on("guildMemberAdd", member => {
    member.send('<:cukurkalp:922942603777937418> Sunucumuza Hoşgeldin Tag Alarak Veya Boost Basarak Bize Destek Olabilirsin , Ses Teyit Kanallarına Girerek Kayıt Olabilirsin Şimdiden İyi Eğlenceler Dilerim.')
    })


       
// gunaydin //

client.on('message', msg => {
    if (msg.content === 'Günaydın') {
        msg.channel.send('Günaydın , Hayırlı sabahlar'); // tagı yazınız
    } else if (msg.content === 'gunaydin') {
        msg.channel.send('Günaydın , Hayırlı sabahlar');// tagı yazınız
    } else if (msg.content === 'gunaydn') {
        msg.channel.send('Sanada Günaydın');// tagı yazınız
    } 

    if (msg.content === 'gm') {
        msg.channel.send('Günaydın , Hayırlı sabahlar'); 
      }
  
    if (msg.content === 'Günaydin') {
        msg.channel.send('Günaydın , Hayırlı sabahlar');
      }



});

//iyi geceler//

client.on('message', msg => {
    if (msg.content === 'iyi geceler') {
        msg.channel.send('İyi Geceler , Tatlı Rüyalar'); // tagı yazınız
    } else if (msg.content === 'İyi geceler') {
        msg.channel.send('İyi Geceler , Tatlı Rüyalar');// tagı yazınız
    } else if (msg.content === 'iyi gcler') {
        msg.channel.send('İyi Geceler');// tagı yazınız
    } 


    if (msg.content === 'ig') {
        msg.channel.send('İyi Geceler , Tatlı Rüyalar');
      }
  
    if (msg.content === 'ii geceler') {
        msg.channel.send('İyi Geceler , Tatlı Rüyalar');
      }

});




// SA AS 2 //

client.on('message', msg => {
    if (msg.content === 'Sa') {
        msg.channel.send('Aleyküm Selam'); // tagı yazınız
    } else if (msg.content === 'sa') {
        msg.channel.send('Aleyküm Selam , Hoş Geldin');// tagı yazınız
    } else if (msg.content === 'Selam') {
        msg.channel.send('Selam Hoşgeldin');// tagi yaziniz yerlini bos verin sadece sa as qwe
    } else if (msg.content === 'selam') {
       msg.channel.send('Selam Hoşgeldin');
      }

    if (msg.content === 'Salam') {
        msg.channel.send('Aleyküm Selam');
      }
  
    if (msg.content === 'slm') {
        msg.channel.send('Aleyküm Selam');
      }
  
    if (msg.content === 'Sea') {
        msg.channel.send('Aleyküm Selam');
      }

  
    if (msg.content === 'sea') {
        msg.channel.send('Aleyküm Selam');
}
    
    if (msg.content === 'Slm') {
        msg.channel.send('Aleyküm Selam');
      }

});

//////______//////

/////______//////

  const kiltifat = [
    'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
    'Mavi gözlerin, gökyüzü oldu dünyamın.',
    'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
    'Huzur kokuyor geçtiğin her yer.',
    'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
    'Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.',
    'Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.',
     'Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.',
     'Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.',
     'Etkili gülüş kavramını ben senden öğrendim.',
     'Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.',
     'Gözlerinle baharı getirdin garip gönlüme.',
     'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
     'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
     'Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.',
     'Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.',
     'Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.',
     'Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.',
     'Aynı zaman diliminde yaşamak benim için büyük ödüldür.',
    'Biraz Çevrendeki İnsanları Takarmısın ?',
    'Biliyormusun? Adrenalin seni çok seviyor...', 
    'Pastayı Muzla , Seni Tuzla..',
    'Çaya kaç tane şeker atsam , senin kadar tatlı ola bilir ?', 
     'Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.',
     'Onu Bunu Boşver de bize gel 2 bira içelim.',
      'Merhem oldun yaralarıma',
      'Mucizelerden bahsediyordum sen geldin aklıma.',
  ];
  client.on("message", async message => {
    if(message.channel.id !== ('921712347125538878')) return;
    let duckywashere = db.get('chatiltifat');
    await db.add("chatiltifat", 1);
    if(duckywashere >= 78) {
      db.delete("chatiltifat");
      const random = Math.floor(Math.random() * ((kiltifat).length - 1) + 1);
      message.reply(`${(kiltifat)[random]}`);
    };
  });

//````````//

client.on("guildMemberAdd", member => {
  let sunucuid = (ayarlar.sunucuid); 
  let tag = (ayarlar.tag);
  let rol = (ayarlar.tagRol); 
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı.`)
      .setTimestamp()
     client.channels.cache.get(ayarlar.tagLog).send(tagalma)
}
})


    //////-------etiket girişte-------/////

      
  client.on("guildMemberAdd", member => {
    let sunucuid = (ayarlar.sunucuid); 
    let tag = (ayarlar.etikettag);
    let rol = (ayarlar.tagRol); 
  if(member.user.discriminator.includes(tag)){
  member.roles.add(rol)
    const tagalma = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı.`)
        .setTimestamp()
       client.channels.cache.get(ayarlar.tagLog).send(tagalma)
  }
  })