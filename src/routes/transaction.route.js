const express = require("express");
const router = express.Router();
const { topUpController } = require("../controllers/transaction.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/topup", authMiddleware, topUpController);

module.exports = router;
