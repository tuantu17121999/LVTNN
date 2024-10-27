const express = require('express');
const router = express.Router();
const addressController = require('../../app/controllers/customer/address.controller');

router.get('/create', addressController.create);
router.get('/delete', addressController.delete);
router.get('/update', addressController.update);
router.get('/oderconfirmed', addressController.oderconfirmed);

module.exports = router;