const authController = require("../controllers/daftar");
const absenController = require("../controllers/absen");
module.exports = absenRoutes = (conn, m, conversation) => {
  switch (conversation.split(" ")[0]) {
    case "!absen":
      absenController.input(conn, m);
      break;
    case "!daftar":
      authController.signup(conn, m);
      break;
    case "!list":
      absenController.getAbsen(conn);
      break;
    default:
      break;
  }
};
