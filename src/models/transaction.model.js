const pool = require("../config/db");

const topUp = async (email, amount) => {
  const query = `UPDATE users SET balance = balance + $2, updated_at = CURRENT_TIMESTAMP WHERE email = $1 RETURNING balance`;
  const values = [email, amount];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const balance = async (email) => {
  const query = `SELECT balance FROM users WHERE email = $1`;
  const values = [email];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const createTransaction = async (
  email,
  invoiceNumber,
  serviceId,
  transactionType,
  description,
  totalAmount,
) => {
  const query = `INSERT INTO transactions (invoice_number, user_id, service_id, transaction_type, description, total_amount) SELECT $1, id, $3, $4, $5, $6 FROM users WHERE email = $2 RETURNING * `;
  const values = [
    invoiceNumber,
    email,
    serviceId,
    transactionType,
    description,
    totalAmount,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const deductBalance = async (email, amount) => {
  const query = `UPDATE users SET balance = balance - $2, updated_at = CURRENT_TIMESTAMP WHERE email = $1`;
  const values = [email, amount];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getHistory = async (email, limit, offset) => {
  let query = `
    SELECT t.invoice_number, t.transaction_type, t.description, t.total_amount::integer, t.created_on
    FROM transactions t
    JOIN users u ON t.user_id = u.id
    WHERE u.email = $1
    ORDER BY t.created_on DESC
  `;
  const values = [email];

  if (limit !== undefined) {
    query += ` LIMIT $2 OFFSET $3`;
    values.push(limit, offset);
  }

  const { rows } = await pool.query(query, values);
  return rows;
};
module.exports = {
  topUp,
  balance,
  createTransaction,
  deductBalance,
  getHistory,
};
