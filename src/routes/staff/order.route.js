const express = require('express');
const router = express.Router();
const orderController = require('../../app/controllers/staff/order.controller');

router.get('/', orderController.home);

module.exports = router;