const express = require('express');
const router = express.Router();
const newsController = require('../../app/controllers/admin/news.controller');
const upload = require('../../app/middlewares/multer')
const { checkTokenAdmin } = require('../../app/common/checkAuthentication')


router.get('/index', checkTokenAdmin, newsController.getAll);

router.get('/create', checkTokenAdmin, newsController.create);
router.post('/store', checkTokenAdmin, upload.single('imageNews'), newsController.store);

router.get('/:id/edit', checkTokenAdmin, newsController.edit);
router.put('/:id/update', checkTokenAdmin, upload.single('imageNews'), newsController.update);

router.delete('/:id', checkTokenAdmin, newsController.delete);

module.exports = router;