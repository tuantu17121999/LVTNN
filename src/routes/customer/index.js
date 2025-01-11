var express = require("express");
const foodRouter = require('./food.route');
const addressRouter = require('./address.route');
const orderRouter = require('./order.route.js');
const newsRouter = require('./news.route.js');
const customerRouter = require('./customer.route.js');

const { checkTokenCustomer } = require('../../app/common/checkAuthentication.js')

const router = express.Router();

router.use('/', checkTokenCustomer, foodRouter);
router.use('/food', checkTokenCustomer, foodRouter);
router.use('/address', checkTokenCustomer, addressRouter);
router.get('/cart', checkTokenCustomer, (req, res) => res.render('cart/index', { layout: 'main' }));
router.use('/order', checkTokenCustomer, orderRouter);
router.use('/news', checkTokenCustomer, newsRouter);
router.use('/customer', checkTokenCustomer, customerRouter);

module.exports = router;