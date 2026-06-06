const express = require("express");
const router = express.Router();
const {
  topUpController,
  getBalanceController,
  historyController,
  transactionController,
} = require("../controllers/transaction.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/topup", authMiddleware, topUpController);
router.post("/transaction", authMiddleware, transactionController);
router.get("/balance", authMiddleware, getBalanceController);
router.get("/transaction/history", authMiddleware, historyController);

module.exports = router;
