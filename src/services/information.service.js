const { getBanners } = require("../models/banner.model");

const getInformation = async () => {
  const banner = await getBanners();
  return banner;
};

module.exports = { getInformation };
