const {
  WAConnection,
  MessageType,
  GroupSettingChange,
} = require("@adiwajshing/baileys");
const schedule = require("node-schedule");
const fs = require("fs");

const authController = require("./controllers/daftar");
const absenController = require("./controllers/absen");
const absenRoutes = require("./routes/absen");

module.exports = connectToWhatsApp = async () => {
  const conn = new WAConnection();
  // this will be called as soon as the credentials are updated
  conn.on("credentials-updated", () => {
    // save credentials whenever updated
    console.log(`credentials updated!`);
    const authInfo = conn.base64EncodedAuthInfo(); // get all the auth info we need to restore this session
    fs.writeFileSync("./auth_info.json", JSON.stringify(authInfo, null, "\t")); // save this info to a file
  });
  if (fs.existsSync("./auth_info.json")) {
    conn.loadAuthInfo("./auth_info.json");
  }
  await conn.connect();

  conn.on("chat-update", (chat) => {
    if (chat.hasNewMessage) {
      const m = chat.messages.all()[0];

      if (process.env.GRUP_ID) {
        const messageContent = m.message;
        // if it is not a regular text or media message
        if (!messageContent) return;
        console.log(messageContent);
        absenRoutes(conn, m, messageContent.conversation);
        return;
      }
    }
  });
  const everyone = schedule.scheduleJob({ hour: 7, minute: 31 }, async () => {
    await conn.groupSettingChange(
      "6282127624263-1611317928@g.us",
      GroupSettingChange.messageSend,
      false
    );
    console.log("semua org");
  });
  const admin = schedule.scheduleJob(
    { hour: 14, minute: 1, second: 1 },
    async () => {
      absenController.getAbsen(conn);
      await conn.groupSettingChange(
        "6282127624263-1611317928@g.us",
        GroupSettingChange.messageSend,
        true
      );
      console.log("admin");
    }
  );
};
