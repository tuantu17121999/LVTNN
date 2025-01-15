const express = require('express');
const router = express.Router();
const adminController = require('../../app/controllers/admin/admin.controller');
const { checkTokenAdmin } = require('../../app/common/checkAuthentication')
const upload = require("../../app/middlewares/multer.js");

router.get('/', checkTokenAdmin, adminController.index);

router.get('/login', adminController.loginForm);
router.post('/login', adminController.login);

router.get('/logout', adminController.logout);

router.get('/profile', checkTokenAdmin, adminController.profile);
router.post('/profile/:id/update', checkTokenAdmin, upload.single('avatarInput'), adminController.editInfo);

router.get('/changedPassword/:id', checkTokenAdmin, adminController.changePasswordForm);
router.post('/changePassword/:id', checkTokenAdmin, adminController.changePassword);

router.get('/forgotPasswordForm', adminController.forgotPasswordForm);
router.post('/forgotPassword', adminController.forgotPassword);

// router.get('/:id', adminController.getOne);

module.exports = router;