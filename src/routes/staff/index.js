var express = require("express");
const orderRouter = require('./order.route');
const router = express.Router();

router.use('/', orderRouter);
router.use('/order', orderRouter);

module.exports = router;