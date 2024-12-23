const express = require('express');
const router = express.Router();
const advertiseController = require('../../app/controllers/admin/advertise.controller.js');
const upload = require('../../app/middlewares/multer')
const { checkTokenAdmin } = require('../../app/common/checkAuthentication')


router.get('/index', checkTokenAdmin, advertiseController.getAll);

router.get('/create', checkTokenAdmin, advertiseController.create);
router.post('/store', checkTokenAdmin, upload.single('imageAdvertise'), advertiseController.store);

router.get('/:id/edit', checkTokenAdmin, advertiseController.edit);
router.put('/:id/update', checkTokenAdmin, upload.single('imageAdvertise'), advertiseController.update);

router.delete('/:id', checkTokenAdmin, advertiseController.delete);

module.exports = router;