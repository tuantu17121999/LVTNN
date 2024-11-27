const express = require('express');
const router = express.Router();
const orderController = require('../../app/controllers/staff/order.controller');

router.get('/', orderController.home);
router.post('/confirm/:id', orderController.confirmOrder);
router.post('/complete/:id', orderController.complete);

router.post('/cancel/:id', orderController.cancel); 
router.get('/api/orders', orderController.getOrders);
module.exports = router;