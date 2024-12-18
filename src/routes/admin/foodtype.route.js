const express = require('express');
const router = express.Router();
const foodTypeController = require('../../app/controllers/admin/foodtype.controller');
const { checkTokenAdmin } = require('../../app/common/checkAuthentication')

router.get('/index', checkTokenAdmin, foodTypeController.index);

// create
router.get('/create', checkTokenAdmin, foodTypeController.createForm);
router.post('/store', checkTokenAdmin, foodTypeController.store);

// update
router.get('/:id/update', checkTokenAdmin, foodTypeController.updateForm);
router.put('/:id', checkTokenAdmin, foodTypeController.update)

// delete
router.delete('/:id', checkTokenAdmin, foodTypeController.delete);

module.exports = router;