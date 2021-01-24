const { MessageType } = require("@adiwajshing/baileys");
const fb = require("../firebase");
const siswaDb = fb.fs.collection("siswa");

module.exports.signup = async (conn, m) => {
  if (m.message.conversation.split(" ")[1] !== "!daftar") {
    let sender = m.key.fromMe ? conn.user.jid : m.participant;
    siswaDb
      .doc(m.message.conversation.replace("!daftar ", ""))
      .update({
        noHp: sender.replace("@s.whatsapp.net", ""),
      })
      .then((errr) => {
        conn.sendMessage(
          m.key.remoteJid,
          "Sukses Mendaftarkan Nomor Hp Anda",
          MessageType.text,
          {
            quoted: m,
          }
        );
      })
      .catch((err) => {
        if (err.code === "not-found") {
          conn.sendMessage(
            m.key.remoteJid,
            "Kamu siapaaaa kamu siapaaaaa.... (Nis anda tidak terdaftar)",
            MessageType.text,
            {
              quoted: m,
            }
          );
        } else {
          conn.sendMessage(m.key.remoteJid, err.message, MessageType.text, {
            quoted: m,
          });
        }
      });
  } else {
    conn.sendMessage(
      m.key.remoteJid,
      "Silahkan Ketik: !daftar NIS",
      MessageType.text,
      {
        quoted: m,
      }
    );
  }
};
