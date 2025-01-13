const express = require("express");
const router = express.Router();
const passport = require("passport");
const customerController = require("../../app/controllers/customer/customer.controller.js");
const historyController = require("../../app/controllers/customer/history.controller.js");
const addressController = require("../../app/controllers/customer/address.controller.js");
const upload = require("../../app/middlewares/multer.js");
const { route } = require("./food.route.js");

router.get("/login", (req, res) =>
  res.render("customer/login", { layout: "login" })
);
router.post("/login", customerController.login)
router.get("/register", (req, res) =>
  res.render("customer/register", { layout: "login" })
);
router.post("/register", upload.single("avatar"), customerController.register);
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/login/google/callback",
  passport.authenticate("google", { session: false }),
  customerController.googleCallback
);

router.get('/', customerController.index);

router.post('/:id/edit', upload.single('avatarInput'), customerController.editInfo);

router.get('/changedPassword/:id', customerController.changePasswordForm);
router.post('/changePassword/:id', customerController.changePassword);

router.use('/address/create', addressController.create);
router.use('/address/api/store', addressController.storeApi);

router.use('/address/:id/edit', addressController.edit);
router.use('/address/:id/update', addressController.updateApi);

router.use('/address/setDefault/:id', addressController.setDefault);

router.get('/address/:id', addressController.customerAddressList);

router.get('/history/:id', historyController.customerHistory);
router.get('/order/:id', historyController.customerOrder);

router.get('/logout', customerController.logout);

router.get('/forgotPasswordForm', customerController.forgotPasswordForm);
router.post('/forgotPassword', customerController.forgotPassword);

module.exports = router;
