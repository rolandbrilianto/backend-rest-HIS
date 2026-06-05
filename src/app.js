const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const routes = require("./routes/index");

app.use("/", routes);

module.exports = app;
