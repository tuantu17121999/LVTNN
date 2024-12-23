var express = require("express");
const orderRouter = require('./order.route');
const staffController = require('../../app/controllers/staff/staff.controller.js');
const router = express.Router();

const { checkTokenStaff } = require('../../app/common/checkAuthentication')

router.get('/', checkTokenStaff, staffController.getAll);
router.use('/order', orderRouter);

router.get('/logout', staffController.logout);

module.exports = router;