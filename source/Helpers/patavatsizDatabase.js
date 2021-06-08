const { MessageEmbed, Client } = require('discord.js');
const client = new Client();
require('moment-duration-format');
const value = require('../../settings.json');
const qdb = require('quick.db');
const rdb = new qdb.table("register");
const sdb = new qdb.table("staff");
const ldb = new qdb.table("rolelog");

Promise.prototype.s = function (time) {
  if (this) this.then(s => {
    if (s.deletable) s.delete({ timeout: time * 1000 });
  });
};

class patavatsizDatabase {

  
  static man(member) {
    member.roles.cache.has(value.Register.Booster) ? member.roles.set([ value.Register.erkekRolleri[0], value.Register.erkekRolleri[1], value.Register.Booster ]) : member.roles.set([ value.Register.erkekRolleri[0], value.Register.erkekRolleri[1] ]);
  }

  static woman(member) {
    member.roles.cache.has(value.Register.Booster) ? member.roles.set([value.Register.kadinRolleri[0], value.Register.kadinRolleri[1], value.Register.Booster]) : member.roles.set([ value.Register.kadinRolleri[0], value.Register.kadinRolleri[1] ]);
  }

  static staff(authority, sex, isim, member) {
    if (sex === `<@&${value.Register.erkekRolleri[0]}>`) {
      sdb.add(`yetkili.${authority.id}.erkekkayit`, 1) && sdb.add(`yetkili.${authority.id}.toplamkayit`, 1) && rdb.push(`kullanici.${member.id}.gecmis`, { Name: isim, Process: sex }) && rdb.add(`kullanici.${member.id}.isimgecmis`, 1)
    } else if (sex === `<@&${value.Register.kadinRolleri[0]}>`) { sdb.add(`yetkili.${authority.id}.kadinkayit`, 1) && sdb.add(`yetkili.${authority.id}.toplamkayit`, 1) && rdb.push(`kullanici.${member.id}.gecmis`, { Name: isim, Process: sex }) && rdb.add(`kullanici.${member.id}.isimgecmis`, 1) }
    rdb.set(`kullanici.${member.id}.songecmis`, {
      Name: isim
    });
  }

  static isimEkle(member, isim, islem) {
    rdb.push(`kullanici.${member.id}.gecmis`, {
      Name: isim,
      Process: islem
    });
  }

  static isimGuncelle(member, isim, islem) {
    rdb.set(`kullanici.${member.id}.songecmis`, {
      Name: isim
    });
    rdb.push(`kullanici.${member.id}.gecmis`, {
      Name: isim,
      Process: islem
    });
  }

  static isimCek(member) {
  let cek = rdb.get(`kullanici.${member.id}.gecmis`) || [];
  return cek
  }

  static sonIsimCek(member) {
    let sonisim = rdb.fetch(`kullanici.${member.id}.songecmis`)
    return sonisim;
  }

  static roleAdd(member, role, date, author) {
    ldb.push(`kullanici.${member}.rollog`, {
      Push: `${value.Emoji.Check} Rol Verildi. Rol: ${role} Yetkili: ${author}\nTarih: ${date}\n⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽`
    })
  }

  static roleRemove(member, role, date, author) {
    ldb.push(`kullanici.${member}.rollog`, {
      Push: `${value.Emoji.Cross} Rol Alındı. Rol: ${role} Yetkili: ${author}\nTarih: ${date}\n⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽`
    })
  }

  static rolCek(member) {
    let cek = ldb.get(`kullanici.${member}.rollog`) || [];
    return cek;
  }
  
}

module.exports = {patavatsizDatabase}
