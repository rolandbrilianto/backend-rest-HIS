const { topUpBalance, getBalance } = require("../services/transaction.service");
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
module.exports = { topUpController, getBalanceController };
