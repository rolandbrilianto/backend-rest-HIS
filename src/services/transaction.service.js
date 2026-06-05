const { topUp } = require("../models/transaction.model");

const topUpBalance = async (email, amount) => {
  const result = await topUp(email, amount);
  return result;
};

module.exports = { topUpBalance };
