const express = require("express");
const methodsRouter = express.Router();

const bookingsRouter = require("./bookingsRouter");

methodsRouter.use('/bookings', bookingsRouter);

module.exports = methodsRouter;