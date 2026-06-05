const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth.middleware");
const {
  getInformationController,
  getServicesController,
} = require("../controllers/information.controller");

router.get("/banner", getInformationController);
router.get("/services", authMiddleware, getServicesController);
module.exports = router;
