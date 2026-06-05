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

module.exports = { topUp, balance };
