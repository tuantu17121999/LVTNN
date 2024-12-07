const express = require('express');
const router = express.Router();
const adminController = require('../../app/controllers/admin/admin.controller');

router.get('/', adminController.index);

router.get('/login', adminController.loginForm);
router.post('/login', adminController.login);

router.post('/logout', adminController.logout);

router.get('/:id', adminController.getOne);

module.exports = router;