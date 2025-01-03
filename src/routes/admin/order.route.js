var express = require("express");
const { route } = require("./food.route");
const router = express.Router();
const orderController = require("../../app/controllers/admin/order.controller")
const { checkTokenAdmin } = require('../../app/common/checkAuthentication')

router.get('/index', checkTokenAdmin, orderController.getAll);

module.exports = router