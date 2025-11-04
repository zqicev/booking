const express = require("express");
const bookingsRouter = express.Router();

const { reserve } = require("../controllers/bookingsController");

bookingsRouter.post('/reserve', reserve);

module.exports = bookingsRouter;