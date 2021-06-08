const { MessageEmbed } = require('discord.js');
const qdb = require('quick.db');
const sdb = new qdb.table("staff")
const value = require('../../settings.json');
const { patavatsizDatabase } = require('../Helpers/patavatsizDatabase');
module.exports = {
  name: "topteyit",
  aliases: [""],
  run: async(client, message, args) => {

    function embed(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg)
      message.channel.send(embed)
    }

    if (![value.Register.registerStaff].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission("ADMINISTRATOR")) return embed("Bu komudu kullanamazsın.").s(10)

       let top = message.guild.members.cache.filter(x => sdb.get(`yetkili.${x.id}.toplamkayit`)).array().sort((a, b) => Number(sdb.get(`yetkili.${b.id}.toplamkayit`)) - Number(sdb.get(`yetkili.${a.id}.toplamkayit`))).slice(0 , 20).map((x, i) => `\`${i + 1}.\` ${x}:  \`Toplam: ${sdb.get(`yetkili.${x.id}.toplamkayit`)} , Erkek: ${sdb.get(`yetkili.${x.id}.erkekkayit`) ? sdb.get(`yetkili.${x.id}.erkekkayit`) : "0"} , Kadın: ${sdb.get(`yetkili.${x.id}.kadinkayit`) ? sdb.get(`yetkili.${x.id}.kadinkayit`) : "0"}\`${x.id === message.author.id ? " **(Siz)** " : ""}`)
    if(top === undefined || top === null) top = "Bulunamadı!"
    embed(`${top.join("\n") || "Bulunamadı"}`)

  }
}