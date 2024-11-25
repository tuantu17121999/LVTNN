var express = require("express");
const foodRouter = require('./food.route');
const addressRouter = require('./address.route');
const orderRouter = require('./order.route.js');

const router = express.Router();

router.use('/', foodRouter);
router.use('/food', foodRouter);
router.use('/address', addressRouter);
router.get('/cart', (req, res) => res.render('cart/index', { layout: 'main' }));
router.use('/order', orderRouter);



module.exports = router;