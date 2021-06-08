const { MessageEmbed } = require('discord.js');
const { patavatsizDatabase } = require('../Helpers/patavatsizDatabase');
const value = require('../../settings.json');
const moment = require('moment');
module.exports = {
  name: "eventroles",
  aliases: ["event", "eventroles"],
  run: async(client, message, args) => {

    function embed(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg)
      message.channel.send(embed).s(10)
    }

    if (![value.Register.registerStaff].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission("ADMINISTRATOR")) return embed("Bu komudu kullanamazsın.")

    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if(!uye || uye.id === message.author.id || uye.id === message.guild.OwnerID || uye.bot || uye.roles.highest.position >= message.member.roles.highest.position) return embed("Hata: Bir kullanıcı belirtmedin veya bu kullanıcıya rol veremezsin!")


    if(args[0] === "ver" && args[2] === "müzisyen") {
      if(uye.roles.cache.has(value.Event.Musician)) return embed("Hata: Kullanıcıda zaten müzisyen rolü bulunuyor!")
      uye.roles.add(value.Event.Musician)
      message.react(value.Emoji.Check)
      embed(`${uye} kullanıcısına başarıyla <@&${value.Event.Musician}> rolü verildi`)
patavatsizDatabase.roleAdd(uye, `<@&${value.Event.Musician}>`, moment(Date.now()).format("DD/MM/YYYY HH:mm"), message.author)
    }

    if(args[0] === "ver" && args[2] === "ressam") {
if(uye.roles.cache.has(value.Event.Artist)) return embed("Hata: Kullanıcıda zaten ressam rolü bulunuyor!")
      uye.roles.add(value.Event.Artist)
      message.react(value.Emoji.Check)
      embed(`${uye} kullanıcısına başarıyla <@&${value.Event.Artist}> rolü verildi`)
patavatsizDatabase.roleAdd(uye, `<@&${value.Event.Artist}>`, moment(Date.now()).format("DD/MM/YYYY HH:mm"), message.author)
    }

        if(args[0] === "ver" && args[2] === "yazılımcı") {
          if(uye.roles.cache.has(value.Event.Developer)) return embed("Hata: Kullanıcıda zaten yazılımcı rolü bulunuyor!")
      uye.roles.add(value.Event.Developer)
      message.react(value.Emoji.Check)
      embed(`${uye} kullanıcısına başarıyla <@&${value.Event.Developer}> rolü verildi`)
patavatsizDatabase.roleAdd(uye, `<@&${value.Event.Developer}>`, moment(Date.now()).format("DD/MM/YYYY HH:mm"), message.author)
    }

        if(args[0] === "ver" && args[2] === "rapper") {
          if(uye.roles.cache.has(value.Event.Rapper)) return embed("Hata: Kullanıcıda zaten rapper rolü bulunuyor!")
      uye.roles.add(value.Event.Rapper)
      message.react(value.Emoji.Check)
      embed(`${uye} kullanıcısına başarıyla <@&${value.Event.Rapper}> rolü verildi`)
patavatsizDatabase.roleAdd(uye, `<@&${value.Event.Rapper}>`, moment(Date.now()).format("DD/MM/YYYY HH:mm"), message.author)
    }

        if(args[0] === "ver" && args[2] === "yazar") {
          if(uye.roles.cache.has(value.Event.Writer)) return embed("Hata: Kullanıcıda zaten yazar rolü bulunuyor!")
      uye.roles.add(value.Event.Writer)
      message.react(value.Emoji.Check)
      embed(`${uye} kullanıcısına başarıyla <@&${value.Event.Writer}> rolü verildi`)
patavatsizDatabase.roleAdd(uye, `<@&${value.Event.Writer}>`, moment(Date.now()).format("DD/MM/YYYY HH:mm"), message.author)
    }

if(args[0] === "al" && args[2] === "müzisyen") {
  if(!uye.roles.cache.has(value.Event.Musician)) return embed("Hata: Kullanıcıda zaten müzisyen rolü bulunmuyor!")
      uye.roles.remove(value.Event.Musician)
      message.react(value.Emoji.Check)
      embed(`${uye} kullanıcısından başarıyla <@&${value.Event.Musician}> rolü alındı`)
patavatsizDatabase.roleRemove(uye, `<@&${value.Event.Musician}>`, moment(Date.now()).format("DD/MM/YYYY HH:mm"), message.author)
    }

    if(args[0] === "al" && args[2] === "ressam") {
        if(!uye.roles.cache.has(value.Event.Artist)) return embed("Hata: Kullanıcıda zaten ressam rolü bulunmuyor!")
      uye.roles.remove(value.Event.Artist)
      message.react(value.Emoji.Check)
      embed(`${uye} kullanıcısından başarıyla <@&${value.Event.Artist}> rolü alındı`)
patavatsizDatabase.roleRemove(uye, `<@&${value.Event.Artist}>`, moment(Date.now()).format("DD/MM/YYYY HH:mm"), message.author)
    }

        if(args[0] === "al" && args[2] === "yazılımcı") {
            if(!uye.roles.cache.has(value.Event.Developer)) return embed("Hata: Kullanıcıda zaten yazılımcı rolü bulunmuyor!")
      uye.roles.remove(value.Event.Developer)
      message.react(value.Emoji.Check)
      embed(`${uye} kullanıcısından başarıyla <@&${value.Event.Developer}> rolü alındı`)
patavatsizDatabase.roleRemove(uye, `<@&${value.Event.Developer}>`, moment(Date.now()).format("DD/MM/YYYY HH:mm"), message.author)
    }

        if(args[0] === "al" && args[2] === "rapper") {
            if(!uye.roles.cache.has(value.Event.Rapper)) return embed("Hata: Kullanıcıda zaten rapper rolü bulunmuyor!")
      uye.roles.remove(value.Event.Rapper)
      message.react(value.Emoji.Check)
      embed(`${uye} kullanıcısından başarıyla <@&${value.Event.Rapper}> rolü alındı`)
patavatsizDatabase.roleRemove(uye, `<@&${value.Event.Rapper}>`, moment(Date.now()).format("DD/MM/YYYY HH:mm"), message.author)
    }

        if(args[0] === "al" && args[2] === "yazar") {
            if(!uye.roles.cache.has(value.Event.Writer)) return embed("Hata: Kullanıcıda zaten yazar rolü bulunmuyor!")
      uye.roles.remove(value.Event.Writer)
      message.react(value.Emoji.Check)
      embed(`${uye} kullanıcısından başarıyla <@&${value.Event.Writer}> rolü alındı`)
patavatsizDatabase.roleRemove(uye, `<@&${value.Event.Writer}>`, moment(Date.now()).format("DD/MM/YYYY HH:mm"), message.author)
    }
  

  }
}