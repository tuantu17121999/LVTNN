var express = require("express");
const foodRouter = require('./food.route');
const foodDetailRouter = require('./fooddetail.route');
const router = express.Router();

router.use('/', foodRouter);
router.use('/fooddetail', foodDetailRouter);

module.exports = router;