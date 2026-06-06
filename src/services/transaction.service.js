const {
  topUp,
  balance,
  createTransaction,
  deductBalance,
  getHistory,
} = require("../models/transaction.model");
const { findServiceByCode } = require("../models/service.model");
const { findUserByEmail } = require("../models/user.model");
const { generateInvoice } = require("../utils/invoice");

const topUpBalance = async (email, amount) => {
  const result = await topUp(email, amount);

  await createTransaction(
    email,
    generateInvoice(),
    null,
    "TOPUP",
    "Top-up balance",
    amount,
  );
  return result;
};

const getBalance = async (email) => {
  const result = await balance(email);
  return result;
};

const transactionHistory = async (email, limit, offset) => {
  const records = await getHistory(email, limit, offset);
  return records;
};

const processTransaction = async (email, serviceCode) => {
  // Cari service
  const service = await findServiceByCode(serviceCode);

  if (!service) {
    throw { status: 102, message: "Service ataus Layanan tidak ditemukan" };
  }

  // Cek saldo
  const user = await findUserByEmail(email);

  if (user.balance < Number(service.service_tariff)) {
    throw { status: 102, message: "Saldo tidak mencukupi" };
  }

  // Kurangi saldo
  await deductBalance(email, service.service_tariff);

  // Insert transaksi
  const transaction = await createTransaction(
    email,
    generateInvoice(),
    service.id,
    "PAYMENT",
    service.service_name,
    service.service_tariff,
  );

  return {
    invoice_number: transaction.invoice_number,
    service_code: service.service_code,
    service_name: service.service_name,
    transaction_type: transaction.transaction_type,
    total_amount: Number(transaction.total_amount),
    created_on: transaction.created_on,
  };
};

module.exports = {
  topUpBalance,
  getBalance,
  transactionHistory,
  processTransaction,
};
