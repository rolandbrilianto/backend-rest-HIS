const express = require("express");
const router = express.Router();

const {
  getInformationController,
} = require("../controllers/information.controller");

router.get("/banner", getInformationController);
module.exports = router;
