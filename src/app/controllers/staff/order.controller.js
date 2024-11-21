const orderModel = require("../../models/order.model");

class orderController {
    //[GET] /
    home(req, res) {
        res.json({});
    }

    confirmOrder(req, res) {
        const id = req.body.id;
        orderModel
            .updateOne({ _id: id }, { status: "inProgress" })
            .then((order) => {
                res.json(order);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    complete(req, res) {
        const id = req.body.id;
        orderModel
            .updateOne({ _id: id }, { status: "completed" })
            .then((order) => {
                res.json(order);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

module.exports = new orderController();