const express = require('express');
const router = express.Router();
const newsController = require('../../app/controllers/admin/news.controller');

router.get('/index', newsController.index);

// create
router.get('/create', newsController.createForm);
router.post('/store', newsController.store);

// update
router.get('/:id/update', newsController.updateForm);
router.put('/:id', newsController.update)

// delete
router.delete('/:id', newsController.delete);

module.exports = router;