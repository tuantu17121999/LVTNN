const express = require('express');
const router = express.Router();
const foodController = require('../../app/controllers/admin/food.controller');
const upload = require('../../app/middlewares/multer')


router.get('/index', foodController.getAll);

router.get('/create', foodController.create);
router.post('/store', upload.single('image'), foodController.store);

router.get('/:id/edit', foodController.updateForm);
router.put('/:id/update', upload.single('image'), foodController.update);

router.delete('/:id', foodController.delete);




module.exports = router;