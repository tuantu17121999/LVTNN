const express = require('express');
const router = express.Router();
const advertiseController = require('../../app/controllers/admin/advertise.controller.js');
const upload = require('../../app/middlewares/multer')


router.get('/index', advertiseController.getAll);

router.get('/create', advertiseController.create);
router.post('/store', upload.single('imageAdvertise'), advertiseController.store);

router.get('/:id/edit', advertiseController.edit);
router.put('/:id/update', upload.single('imageAdvertise'), advertiseController.update);

router.delete('/:id', advertiseController.delete);

module.exports = router;