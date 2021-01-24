const { getAllAbsenJson } = require("../controllers/absen");

const router = require("express").Router();

router.get("/get-all", getAllAbsenJson);

module.exports = router;
