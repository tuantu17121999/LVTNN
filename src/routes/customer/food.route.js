const express = require('express');
const router = express.Router();
const foodController = require('../../app/controllers/customer/food.controller');

router.get('/', foodController.home);

router.get('/:slug/detail', foodController.showFoodDetail);

module.exports = router;