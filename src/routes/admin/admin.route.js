const express = require('express');
const router = express.Router();
const adminController = require('../../app/controllers/admin/admin.controller');

router.get('/', adminController.show);

module.exports = router;