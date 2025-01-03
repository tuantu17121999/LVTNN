var express = require("express");
const router = express.Router();
const promotionController = require('../../app/controllers/admin/promotion.controller.js');
const { route } = require("./food.route.js");
const { checkTokenAdmin } = require('../../app/common/checkAuthentication')

router.get('/index', promotionController.index);

router.get('/create', promotionController.create);
router.post('/store', promotionController.store);

router.delete('/:id', promotionController.delete);

router.get('/api/unpromotion', promotionController.getNotPromotionFoods);
router.get('/api/:id', promotionController.getPromotionFoods);

router.get('/:id/edit', promotionController.edit);
router.put('/:id/update', promotionController.update);

module.exports = router