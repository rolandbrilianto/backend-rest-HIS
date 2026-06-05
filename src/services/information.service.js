const { getBanners } = require("../models/banner.model");
const { getServices } = require("../models/service.model");
const getInformation = async () => {
  const banner = await getBanners();
  return banner;
};

const getServiceList = async () => {
  const services = await getServices();
  return services;
};
module.exports = { getInformation, getServiceList };
