var express = require("express");
const orderRouter = require('./order.route');
const staffController = require('../../app/controllers/staff/staff.controller.js');
const router = express.Router();
const upload = require("../../app/middlewares/multer.js");

const { checkTokenStaff } = require('../../app/common/checkAuthentication')

router.get('/', checkTokenStaff, staffController.getAll);

router.post('/profile/:id/update', checkTokenStaff, upload.single('avatarInput'), staffController.editInfo);

router.post('/changePassword/:id', checkTokenStaff, staffController.changePassword);

router.use('/order', orderRouter);

router.get('/logout', staffController.logout);

module.exports = router;