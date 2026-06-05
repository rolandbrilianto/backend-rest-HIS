const sendResponse = (res, httpStatus, status, message, data = null) => {
  res.status(httpStatus).json({
    status,
    message,
    data,
  });
};

module.exports = {
  sendResponse,
};
