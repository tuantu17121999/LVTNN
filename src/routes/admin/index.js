var express = require("express");
const router = express.Router();

const adminRouter = require('./admin.route');
const foodRouter = require('./food.route');
const foodTypeRouter = require('./foodtype.route.js');
const newsRouter = require('./news.route.js');
const staffRouter = require('./staff.route.js');
const orderRouter = require('./order.route.js');
const advertiseRouter = require('./advertise.route.js');
const promotionRouter = require('./promotion.route');



router.use('/', adminRouter);
router.use('/food', foodRouter);
router.use('/foodtype', foodTypeRouter);
router.use('/news', newsRouter);
router.use('/staff', staffRouter);
router.use('/order', orderRouter);
router.use('/advertise', advertiseRouter);
router.use('/promotion', promotionRouter);


module.exports = router;