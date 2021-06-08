const { MessageEmbed } = require('discord.js');
const { patavatsizDatabase } = require('../Helpers/patavatsizDatabase');
const value = require('../../settings.json');
const moment = require('moment');
module.exports = {
  name: "rolsuzver",
  aliases: ["rolsuzver", "rolsüzver"],
  run: async(client, message, args) => {

     function embed(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg)
      message.channel.send(embed).s(10)
    }

    if (![value.Register.registerStaff].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission("ADMINISTRATOR")) return embed("Bu komudu kullanamazsın.")

    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye || uye.roles.cache.has(value.Register.Kayitsiz) || uye.id === message.author.id || uye.id === message.guild.OwnerID || uye.bot || uye.roles.highest.position >= message.member.roles.highest.position) return embed("Hata: Bir kullanıcı belirtmedin veya bu kullanıcı kayıtsıza atılamaz veya bu kullanıcıda zaten kayıtsız rolü bulunmakta!")

    uye.roles.cache.filter(x => x.id !== value.Register.Booster).forEach(x => { uye.roles.remove(x.id) && uye.roles.add(value.Register.Kayitsiz)});

    patavatsizDatabase.roleAdd(uye, `<@&${value.Register.Kayitsiz}>`, moment(Date.now()).format("DD/MM/YYYY HH:mm"), message.author)

    embed(`${uye} kullanıcısına başarıyla <@&${value.Register.Kayitsiz}> rolü verildi`)


  }
}