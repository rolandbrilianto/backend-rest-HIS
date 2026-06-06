const {
  topUpBalance,
  getBalance,
  processTransaction,
  transactionHistory,
} = require("../services/transaction.service");
const { sendResponse } = require("../utils/response");
const { validateAmount } = require("../schemas/transaction.schema");

const topUpController = async (req, res) => {
  try {
    const email = req.user.email;
    const top_up_amount = req.body.top_up_amount;
    validateAmount(req.body);
    const result = await topUpBalance(email, top_up_amount);
    return sendResponse(res, 200, 0, "Top Up Balance berhasil", result);
  } catch (error) {
    return sendResponse(
      res,
      401,
      error.status || 108,
      error.message || "Terjadi kesalahan",
    );
  }
};

const getBalanceController = async (req, res) => {
  try {
    const email = req.user.email;

    const result = await getBalance(email);

    return sendResponse(res, 200, 0, "Get Balance Berhasil", result);
  } catch (error) {
    return sendResponse(
      res,
      401,
      error.status || 108,
      error.message || "Terjadi kesalahan",
    );
  }
};
const transactionController = async (req, res) => {
  try {
    const email = req.user.email;
    const { service_code } = req.body;
    const result = await processTransaction(email, service_code);
    return sendResponse(res, 200, 0, "Transaksi berhasil", result);
  } catch (error) {
    return sendResponse(
      res,
      400,
      error.status || 102,
      error.message || "Terjadi kesalahan",
    );
  }
};

const historyController = async (req, res) => {
  try {
    const email = req.user.email;
    const { limit, offset = 0 } = req.query;
    const records = await transactionHistory(
      email,
      limit ? parseInt(limit) : undefined,
      parseInt(offset),
    );
    return sendResponse(res, 200, 0, "Get History Berhasil", {
      offset: parseInt(offset),
      limit: limit ? parseInt(limit) : null,
      records,
    });
  } catch (error) {
    return sendResponse(
      res,
      401,
      error.status || 108,
      error.message || "Terjadi kesalahan",
    );
  }
};

module.exports = {
  topUpController,
  getBalanceController,
  transactionController,
  historyController,
};
