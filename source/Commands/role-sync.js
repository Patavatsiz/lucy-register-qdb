const { MessageEmbed } = require('discord.js');
const value = require('../../settings.json');
const { patavatsizDatabase } = require('../Helpers/patavatsizDatabase');
const moment = require("moment");
module.exports = {
  name: "rol",
  aliases: ["rol", "role"],
  run: async(client, message, args) => {

    function embed(msg) {
    let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg).setThumbnail()
    message.channel.send(embed).s(10)
  }

    if(![value.Register.RolesARL].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission("ADMINISTRATOR")) return embed("Bu komudu kullanamazsın")

    
   if(!args[0]) return embed("Hata: Bir eylem belirtin .rol ver/al/log user {role}")
   if(!isNaN(args[0])) return embed("Hata: Yalnızca ver/al/log parametrelerini kullanabilirsiniz.")
  if(!args[0].includes("ver") && !args[0].includes("al") && !args[0].includes("log")) return embed("Hata: Yalnızca ver/al/log parametrelerini kullanabilirsiniz.")

   let uye = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
   if(!uye || uye.id === message.author.id || uye.roles.highest.position >= message.member.roles.highest.position || uye.id === message.guild.OwnerID || uye.bot) return embed("Hata: Bu kullanıcıya rol veremezsin veya bir kullanıcı belirtmedin!")

if(args[0] === "log") {
    let data = patavatsizDatabase.rolCek(uye)
    data = data.reverse()
    let nums = data.length || "0";
    let roles = data.length > "0" ? data.map(x => `${x.Push}`).slice(0, 10).join("\n") : ""
    xembed(`${uye} (${uye.roles.highest}) kişisinin toplamda ${nums} rol bilgisi bulundu ve son 10 rol bilgisi aşağıda sıralandı;\n\n${roles}`)
   }

    function xembed(msg) {
    let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg).setThumbnail(uye.user.avatarURL({dynamic: true}))
    message.channel.send(embed)
  }

  let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
  if(!role && args[0] !== "log") return embed("Hata: Bir rol belirtin!")

   if(args[0] === "ver") {
      if(uye.roles.cache.has(role)) return;
      uye.roles.add(role)
      patavatsizDatabase.roleAdd(uye, `${role}`, moment(Date.now()).format("DD/MM/YYYY HH:mm"), message.author)
           embed(`${uye} kişisine başarıyla ${role} rolü verildi`)
   }

   if(args[0] === "al") {
     uye.roles.remove(role)
     patavatsizDatabase.roleRemove(uye, `${role}`, moment(Date.now()).format("DD/MM/YYYY HH:mm"), message.author)
     embed(`${uye} kişisinden başarıyla ${role} rolü alındı`)
   }

  }
}