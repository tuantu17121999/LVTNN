var express = require("express");
const router = express.Router();
const orderHelper = require('../../app/controllers/admin/orderHelper.controller.js');
const { checkTokenAdmin } = require('../../app/common/checkAuthentication')

router.get('/', orderHelper.getAll);

module.exports = router