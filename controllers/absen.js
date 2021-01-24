const { MessageType } = require("@adiwajshing/baileys");
const fb = require("../firebase");
const siswaDb = fb.fs.collection("siswa");
const absenDb = fb.fs.collection("absen");
const date = new Date();

module.exports.input = async (conn, m) => {
  let sender = m.key.fromMe ? conn.user.jid : m.participant;
  const data = await siswaDb
    .where("noHp", "==", sender.replace("@s.whatsapp.net", ""))
    .get();

  if (data.docs[0]) {
    const check = await absenDb
      .where("siswa.nis", "==", data.docs[0].id)
      .where("tahun", "==", date.getFullYear())
      .where("bulan", "==", date.getMonth() + 1)
      .where("tanggal", "==", date.getDate())
      .get();
    if (check.empty) {
      await absenDb.add({
        absen: "hadir",
        tanggal: date.getDate(),
        bulan: date.getMonth() + 1,
        tahun: date.getFullYear(),
        siswa: {
          nis: data.docs[0].id,
          ...data.docs[0].data(),
        },
      });
      conn.sendMessage(
        m.key.remoteJid,
        `Hai ${data.docs[0].data().nama} absen anda sukses`,
        MessageType.text,
        {
          quoted: m,
        }
      );
    } else {
      conn.sendMessage(
        m.key.remoteJid,
        `Udah bwang udahh sekali aja udahhh...`,
        MessageType.text,
        {
          quoted: m,
        }
      );
    }
  } else {
    conn.sendMessage(
      m.key.remoteJid,
      `Daftar dulu dong bwanggg... Coba ketik:!daftar <NIS>`,
      MessageType.text,
      {
        quoted: m,
      }
    );
  }
};

module.exports.getAbsen = async (conn) => {
  const absen = await absenDb
    .where("tahun", "==", date.getFullYear())
    .where("bulan", "==", date.getMonth() + 1)
    .where("tanggal", "==", date.getDate())
    .get();

  const absenArr = [];
  absen.docs.forEach((element, index) => {
    absenArr.push(`${index + 1}. ${element.data().siswa.nama}`);
  });

  conn.sendMessage(
    process.env.GRUP_ID,
    `${absenArr.join("\n")}`,
    MessageType.text
  );
};

module.exports.getAllAbsenJson = async (req, res, next) => {
  const absen = await absenDb
    .where("tahun", "==", date.getFullYear())
    .where("bulan", "==", date.getMonth() + 1)
    .where("tanggal", "==", date.getDate())
    .get();

  const absenArr = [];
  absen.docs.forEach((element, index) => {
    absenArr.push(element.data());
  });

  res.status(200).json({
    status: 200,
    message: "success",
    results: absenArr,
  });
};
