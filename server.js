const express = require("express");
const absen = require("./routes/expressAbsen");
const app = express();

module.exports = server = () => {
  app.use("/api/v1/absen", absen);

  app.listen(process.env.PORT, () =>
    console.log("server listening on port: " + process.env.PORT)
  );
};
