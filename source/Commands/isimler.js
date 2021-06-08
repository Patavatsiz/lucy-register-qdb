const { MessageEmbed } = require('discord.js');
const qdb = require('quick.db');
const value = require('../../settings.json');
const { patavatsizDatabase } = require('../Helpers/patavatsizDatabase');
module.exports = {
  name: "isimler",
  aliases: [""],
  run: async(client, message, args) => {

    function embed(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg)
      message.channel.send(embed).s(15)
    }

    if (![value.Register.registerStaff].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission("ADMINISTRATOR")) return embed("Bu komudu kullanamazsın.")

    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!uye) return embed("Hata: Bir kullanıcı belirtin")

    let data = patavatsizDatabase.isimCek(uye)
    data = data.reverse();
    let nums = data.length || "0";
    let input = data.length > "0" ? data.map(x => `\`${x.Name}\` (${x.Process})`).join("\n") : ""
    embed(`${uye} (${uye.roles.highest}) kişisinin toplamda ${nums} isim kaydı bulundu;\n\n${input}`)
    message.react(value.Emoji.Check)

    

  }
}