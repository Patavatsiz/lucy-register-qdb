const { MessageEmbed } = require('discord.js');
const value = require('../../settings.json');
module.exports = {
  name: "say",
  aliases: [""],
  run: async(client, message, args) => {
  let guildCount = message.guild.members.cache.size.toString();
  let voiceCount = message.guild.members.cache.filter(v => v.voice.channel).size.toString();
  let tagCount = message.guild.members.cache.filter(x => !x.bot && x.user.username.includes(value.Register.Tag)).size.toString();
  let onlineCount = message.guild.members.cache.filter(x => x.presence.status !== "offline").size.toString();
  let boosterCount = message.guild.premiumSubscriptionCount
  let level = message.guild.premiumTier

    message.channel.send(new MessageEmbed().setColor("RANDOM").setDescription(`
\`•\` Sesli kanallarda toplam **${voiceCount}** kullanıcı bulunmakta.
\`•\` Sunucumuzda toplam **${guildCount}** üye bulunmakta.
\`•\` Sunucumuza toplam **${boosterCount}** takviye yapılmış ve **${level}.** seviye.
\`•\` Sunucumuzda toplam **${onlineCount}** kullanıcı aktif.
\`•\` Toplam **${tagCount}** kişi tagımıza sahip.`))
  }
}