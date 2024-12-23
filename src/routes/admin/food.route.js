const express = require("express");
const router = express.Router();
const foodController = require("../../app/controllers/admin/food.controller");
const upload = require("../../app/middlewares/multer");
const { checkTokenAdmin } = require('../../app/common/checkAuthentication')

router.get("/index", checkTokenAdmin, foodController.getAll);

router.get("/create", checkTokenAdmin, foodController.create);
router.post("/store", checkTokenAdmin, upload.single("image"), foodController.store);

router.get("/:id/edit", checkTokenAdmin, foodController.updateForm);
router.put("/:id/update", checkTokenAdmin, upload.single("image"), foodController.update);

router.delete("/:id", checkTokenAdmin, foodController.delete);

router.get("/search", checkTokenAdmin, foodController.search);

module.exports = router;
