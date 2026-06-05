const pool = require("../config/db");

const getServices = async () => {
  const query = `SELECT service_code, service_name, service_icon, service_tariff FROM services`;
  const { rows } = await pool.query(query);
  return rows;
};

module.exports = { getServices };
