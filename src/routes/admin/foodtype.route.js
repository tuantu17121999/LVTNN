const express = require('express');
const router = express.Router();
const foodTypeController = require('../../app/controllers/admin/foodtype.controller');

router.get('/create', foodTypeController.create);
router.get('/delete', foodTypeController.delete);

module.exports = router;