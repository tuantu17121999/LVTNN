var express = require("express");
const { route } = require("./food.route");
const router = express.Router();
const orderController = require("../../app/controllers/admin/order.controller")
const { checkTokenAdmin } = require('../../app/common/checkAuthentication')

router.get('/index', checkTokenAdmin, orderController.getAll);

<<<<<<< HEAD

=======
>>>>>>> 210c9c87557076f94cd1f68258921f9640bba585
module.exports = router