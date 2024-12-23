const express = require("express");
const router = express.Router();

const staffController = require("../../app/controllers/admin/staff.controller");
const upload = require("../../app/middlewares/multer");

const { checkTokenAdmin } = require('../../app/common/checkAuthentication')

router.get('/index', checkTokenAdmin, staffController.index);

router.get('/active/', checkTokenAdmin, staffController.activeStaff);
router.get('/inactive/', checkTokenAdmin, staffController.inactiveStaff);

router.get("/createForm", checkTokenAdmin, staffController.createForm);
router.post("/store", checkTokenAdmin, upload.single("avatar"), staffController.create);

router.get("/:id", checkTokenAdmin, staffController.getOne);

router.get("/:id/editForm", checkTokenAdmin, staffController.updateForm);
router.put("/:id", checkTokenAdmin, upload.single("avatar"), staffController.update);

router.delete("/:id/block", checkTokenAdmin, staffController.block);
router.post("/:id/unblock", checkTokenAdmin, staffController.unBlock);

router.delete("/:id/blockIn", checkTokenAdmin, staffController.blockIn);
router.post("/:id/unblockIn", checkTokenAdmin, staffController.unBlockIn);

module.exports = router;