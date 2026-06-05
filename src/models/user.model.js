const pool = require("../config/db");

const createUser = async (email, firstName, lastName, hashedPassword) => {
  const query = `INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name`;
  const values = [email, firstName, lastName, hashedPassword];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const findUserByEmail = async (email) => {
  const query = `SELECT email, first_name, last_name, profile_image  FROM users WHERE email = $1`;
  const values = [email];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// const findUserById = async (id) => {
//   const query = `SELECT id, email, first_name, last_name FROM users WHERE id = $1`;
//   const values = [id];
//   const { rows } = await pool.query(query, values);
//   return rows[0];
// };

const updateProfile = async (email, firstName, lastName) => {
  const query = `UPDATE users SET first_name = $1, last_name = $2, updated_at = CURRENT_TIMESTAMP WHERE email = $3 RETURNING email, first_name, last_name, profile_image`;
  const values = [firstName, lastName, email];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const updateProfileImage = async (email, profileImage) => {
  const query = `UPDATE users SET profile_image = $1, updated_at = CURRENT_TIMESTAMP WHERE email = $2 RETURNING  email, first_name, last_name, profile_image`;
  const values = [profileImage, email];
  const { rows } = await pool.query(query, values);
  return rows[0];
};
module.exports = {
  createUser,
  findUserByEmail,
  //   findUserById,
  updateProfile,
  updateProfileImage,
};
