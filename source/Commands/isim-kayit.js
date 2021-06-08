const { MessageEmbed } = require('discord.js');
const qdb = require('quick.db');
const rdb = qdb.table("register");
const { patavatsizDatabase } = require('../Helpers/patavatsizDatabase');
const value = require('../../settings.json');
module.exports = {
  name: "isim",
  aliases: ["isim", "nick", "i"],
  run: async(client, message, args) => {

  function embed(msg) {
    let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg)
    message.channel.send(embed).s(10)
  }

  if(![value.Register.registerStaff].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission("ADMINISTRATOR")) return embed("Bu komudu kullanamazsın.")

  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!uye || uye.id === message.author.id ||uye.id === message.guild.OwnerID || uye.bot || uye.roles.highest.position >= message.member.roles.highest.position) return embed("Hata: Bu kullanıcının adını değiştiremezsin")
  
  
  let isim = args[1].charAt(0).replace("i", "İ").toLocaleUpperCase() + args[1].slice(1).toLocaleLowerCase();
  let yas = Number(args[2]);
  let fix = uye.user.username.includes(value.Register.Tag) ? value.Register.Tag : value.Register.Untag
  var isim2;
  if(yas) isim2 = `${fix} ${isim} | ${yas}`;
  if(!yas) isim2 = `${fix} ${isim}`; 
  uye.setNickname(isim2)


  
    if (!uye.roles.cache.has(value.Register.erkekRolleri[0]) && !uye.roles.cache.has(value.Register.kadinRolleri[0]) && !uye.roles.cache.has(value.Register.erkekRolleri[1]) && !uye.roles.cache.has(value.Register.kadinRolleri[1])) {
    let msg = message.channel.send(new MessageEmbed().setAuthor(uye.displayName, uye.user.avatarURL({dynamic:true})).setColor("RANDOM").setDescription(`${uye} kullanıcının adı başarıyla \`"${isim2}"\` olarak değiştirildi`).setFooter("Lütfen 30 saniye içinde kullanıcının cinsiyetini .e /.k ile belirtin.").setTimestamp()).s(10) && message.react(value.Emoji.Check)

    let col = await message.channel.awaitMessages((mes) => mes.author.id === message.author.id && [".e", ".k"].some(ans => mes.content.toLocaleLowerCase().includes(ans)), { max: 1, time: "30000" })
    if(col == null) return embed("Hata: Yetkili cinsiyet belirtmediği için işlem iptal edildi")


      let erkek = col.first();
      if (erkek.content.toLocaleLowerCase().includes(".e")) {
        patavatsizDatabase.staff(message.author, `<@&${value.Register.erkekRolleri[0]}>`, isim2, uye)
        patavatsizDatabase.man(uye)
        message.channel.send(new MessageEmbed().setAuthor(uye.displayName, uye.user.avatarURL({ dynamic: true })).setColor("RANDOM").setDescription(`${uye} kullanıcısına <@&${value.Register.erkekRolleri[0]}> rol(leri) verildi.`).setFooter(value.Embed.Footer).setTimestamp()).s(10)
        erkek.react(value.Emoji.Check)
      } 
      let kadin = col.first()
      if (kadin.content.toLocaleLowerCase().includes(".k")) {
        patavatsizDatabase.staff(message.author, `<@&${value.Register.kadinRolleri[0]}>`, isim2, uye)
        patavatsizDatabase.woman(uye)
        message.channel.send(new MessageEmbed().setAuthor(uye.displayName, uye.user.avatarURL({ dynamic: true })).setColor("RANDOM").setDescription(`${uye} kullanıcısına <@&${value.Register.kadinRolleri[0]}> rol(leri) verildi.`).setFooter(value.Embed.Footer).setTimestamp()).s(10)
        kadin.react(value.Emoji.Check)
      }
    

   
    

  } else {
    uye.setNickname(isim2)
    patavatsizDatabase.isimGuncelle(uye, isim2, "İsim Değiştirme")
    embed(`${uye} kişisinin adı başarıyla \`"${isim2}"\` olarak güncellendi.`)
    message.react(value.Emoji.Check)
  }
  
  }
}