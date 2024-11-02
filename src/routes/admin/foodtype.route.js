const express = require('express');
const router = express.Router();
const foodTypeController = require('../../app/controllers/admin/foodtype.controller');

router.get('/index', foodTypeController.index);
router.get('/delete', foodTypeController.delete);
// create
router.get('/create', foodTypeController.createForm);
router.post('/store', foodTypeController.store);

// update
router.get('/:id/update', foodTypeController.updateForm);
router.put('/:id',foodTypeController.update)

// delete
router.delete('/:id', foodTypeController.delete);

module.exports = router;