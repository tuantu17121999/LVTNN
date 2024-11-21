var express = require("express");
const orderRouter = require('./order.route');
const staffController = require('../../app/controllers/staff/staff.controller.js');
const router = express.Router();

router.get('/', staffController.getAll);
router.use('/order', orderRouter);

module.exports = router;