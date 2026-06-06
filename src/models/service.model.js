const pool = require("../config/db");

const getServices = async () => {
  const query = `SELECT service_code, service_name, service_icon, service_tariff::integer FROM services`;
  const { rows } = await pool.query(query);
  return rows;
};

const findServiceByCode = async (serviceCode) => {
  const query = `SELECT * FROM services WHERE service_code = $1`;
  const values = [serviceCode];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = { getServices, findServiceByCode };
