const pool = require("../config/db");

const createUser = async (email, firstName, lastName, hashedPassword) => {
  const query = `INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name`;
  const values = [email, firstName, lastName, hashedPassword];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const values = [email];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = { createUser, findUserByEmail };
