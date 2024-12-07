const express = require('express');
const router = express.Router();
const newsController = require('../../app/controllers/customer/news.controller.js');

router.get('/', newsController.home);

router.get('/:slug/detail', newsController.showNewsDetail);

module.exports = router;