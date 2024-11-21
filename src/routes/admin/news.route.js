const express = require('express');
const router = express.Router();
const newsController = require('../../app/controllers/admin/news.controller');
const upload = require('../../app/middlewares/multer')


router.get('/index', newsController.getAll);

router.get('/create', newsController.create);
router.post('/store', upload.single('imageNews'), newsController.store);

router.get('/:id/edit', newsController.edit);
router.put('/:id/update', upload.single('imageNews'), newsController.update);

router.delete('/:id', newsController.delete);

module.exports = router;