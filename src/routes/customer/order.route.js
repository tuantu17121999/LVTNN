const express = require('express');
const router = express.Router();
const orderController = require('../../app/controllers/customer/order.controller.js');

router.get('/place-order', orderController.placeOrder);
router.post('/submit-order', orderController.submitOrder);
router.get('/confirmation', orderController.confirmation);

module.exports = router;