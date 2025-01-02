const express = require('express');
const router = express.Router();
const customerController = require('../../app/controllers/admin/customer.controller.js');
const upload = require('../../app/middlewares/multer')
const { checkTokenAdmin } = require('../../app/common/checkAuthentication')


router.get('/index', checkTokenAdmin, customerController.getAll);

module.exports = router;