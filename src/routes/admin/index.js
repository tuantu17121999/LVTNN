var express = require("express");
const adminRouter = require('./admin.route');
const foodRouter = require('./food.route');
const foodTypeRouter = require('./foodtype.route.js');
const router = express.Router();

router.use('/', adminRouter);
router.use('/food', foodRouter);
router.use('/foodtype', foodTypeRouter);

module.exports = router;