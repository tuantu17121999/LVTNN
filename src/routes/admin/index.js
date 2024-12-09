var express = require("express");
const router = express.Router();

const adminRouter = require('./admin.route');
const foodRouter = require('./food.route');
const foodTypeRouter = require('./foodtype.route.js');
const newsRouter = require('./news.route.js');
const staffRouter = require('./staff.route.js');
const orderRouter = require('./order.route.js');
const advertiseRouter = require('./advertise.route.js');


router.use('/', adminRouter);
router.use('/food', foodRouter);
router.use('/foodtype', foodTypeRouter);
router.use('/news', newsRouter);
router.use('/staff', staffRouter);
router.use('/order', orderRouter); // -> /admin/order
router.use('/advertise', advertiseRouter);

module.exports = router;