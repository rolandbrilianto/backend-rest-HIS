const express = require("express");

const router = express.Router();

const authRoutes = require("./auth.route.js");
const profileRoutes = require("./profile.route.js");
const informationRoutes = require("./information.route.js");
const transactionRoutes = require("./transaction.route.js");

router.use("/", authRoutes);
router.use("/", profileRoutes);
router.use("/", informationRoutes);
router.use("/", transactionRoutes);

module.exports = router;
