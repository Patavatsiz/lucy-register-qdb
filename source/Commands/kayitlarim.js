const { MessageEmbed } = require('discord.js');
const qdb = require('quick.db');
const sdb = new qdb.table("staff")
const value = require('../../settings.json');
const { patavatsizDatabase } = require('../Helpers/patavatsizDatabase');
module.exports = {
  name: "kayıtlarım",
  aliases: [""],
  run: async(client, message, args) => {

    function embed(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg)
      message.channel.send(embed).s(10)
    }

    if (![value.Register.registerStaff].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission("ADMINISTRATOR")) return embed("Bu komudu kullanamazsın.").s(10)
 
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) {
        let e = sdb.fetch(`yetkili.${message.author.id}.erkekkayit`)
        let k = sdb.fetch(`yetkili.${message.author.id}.kadinkayit`)
        let t = sdb.fetch(`yetkili.${message.author.id}.toplamkayit`)
        if(e  === undefined || e  === null) e = "0"
        if(t  === undefined || t  === null) t = "0"
        if(k  === undefined || k  === null) k = "0"
        message.react("✅")
        embed(`\`•\` Toplam **__${t}__** net kaydınız bulunmakta.
        \`•\` Toplam **__${e}__** erkek kaydınız bulunmakta.
        \`•\` Toplam **__${k}__** kadın kaydınız bulunmakta.`)
    } else if(member) {
        let e = sdb.fetch(`yetkili.${member.id}.erkekkayit`)
        let k = sdb.fetch(`yetkili.${member.id}.kadinkayit`)
        let t = sdb.fetch(`yetkili.${member.id}.toplamkayit`)
        if(e  === undefined || e  === null) e = "0"
        if(t  === undefined || t  === null) t = "0"
        if(k  === undefined || k  === null) k = "0"
        message.react("✅")
        embed(`\`•\` Toplam **__${t}__** net kaydı bulunmakta.
        \`•\` Toplam **__${e}__** erkek kaydı bulunmakta.
        \`•\` Toplam **__${k}__** kadın kaydı bulunmakta.`)
        
    }
    

  }
}
    
    
    
    
    