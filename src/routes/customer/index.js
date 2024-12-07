var express = require("express");
const foodRouter = require('./food.route');
const addressRouter = require('./address.route');
const orderRouter = require('./order.route.js');
const newsRouter = require('./news.route.js');

const router = express.Router();

router.use('/', foodRouter);
router.use('/food', foodRouter);
router.use('/address', addressRouter);
router.get('/cart', (req, res) => res.render('cart/index', { layout: 'main' }));
router.use('/order', orderRouter);
router.use('/news', newsRouter);



module.exports = router;