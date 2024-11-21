const express = require('express');
const router = express.Router();
const orderController = require('../../app/controllers/staff/order.controller');

router.get('/', orderController.home);
router.post('/confirm/:id', orderController.confirmOrder);
router.post('/complete/:id', orderController.complete);
module.exports = router;