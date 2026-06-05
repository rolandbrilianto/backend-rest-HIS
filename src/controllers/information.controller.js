const {
  getInformation,
  getServiceList,
} = require("../services/information.service");

const { sendResponse } = require("../utils/response");

const getInformationController = async (req, res) => {
  try {
    const information = await getInformation();
    sendResponse(res, 200, 0, "Sukses", information);
  } catch (error) {
    sendResponse(res, 500, error.status, error.message || "Terjadi kesalahan");
  }
};

const getServicesController = async (req, res) => {
  try {
    const services = await getServiceList();
    sendResponse(res, 200, 0, "Sukses", services);
  } catch (error) {
    sendResponse(res, 500, error.status, error.message || "Terjadi kesalahan");
  }
};
module.exports = { getInformationController, getServicesController };
