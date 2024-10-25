const express = require('express');
const router = express.Router();
const foodController = require('../../app/controllers/customer/food.controller');

router.get('/', foodController.home);
router.get('/fooddetail', foodController.detail);

module.exports = router;