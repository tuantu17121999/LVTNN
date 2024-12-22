const express = require('express');
const router = express.Router();
const adminController = require('../../app/controllers/admin/admin.controller');
const { checkTokenAdmin } = require('../../app/common/checkAuthentication')

router.get('/',checkTokenAdmin, adminController.index);

router.get('/login', adminController.loginForm);
router.post('/login', adminController.login);

router.get('/logout', adminController.logout);

// router.get('/:id', adminController.getOne);

module.exports = router;