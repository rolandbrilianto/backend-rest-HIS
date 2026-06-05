const { topUp, balance } = require("../models/transaction.model");

const topUpBalance = async (email, amount) => {
  const result = await topUp(email, amount);
  return result;
};

const getBalance = async (email) => {
  const result = await balance(email);
  return result;
};

module.exports = { topUpBalance, getBalance };
