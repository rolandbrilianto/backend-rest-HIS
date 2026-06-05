const express = require("express");
const router = express.Router();
const {
  topUpController,
  getBalanceController,
} = require("../controllers/transaction.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/topup", authMiddleware, topUpController);
router.get("/balance", authMiddleware, getBalanceController);

module.exports = router;
