var express = require("express");
const foodRouter = require('./food.route');
const addressRouter = require('./address.route');
const router = express.Router();

router.use('/', foodRouter);
router.use('/food', foodRouter);
router.use('/address', addressRouter);


module.exports = router;