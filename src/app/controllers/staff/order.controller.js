const orderModel = require("../../models/order.model");
const canceledOrderModel = require("../../models/canceledOrder.model");
const orderDetailModel = require("../../models/orderDetail.model");

class orderController {
    //[GET] /
    home(req, res) {
        res.json({});
    }

    //[GET] /order/api/:id
    async getOneOrder(req, res) {
        const id = req.params.id;
        Promise.all([
            orderModel.findOne({ _id: id }).populate('idAddress').lean(),
            orderDetailModel.find({ orderid: id }).populate('foodid').lean()
        ])
            .then(([order, orderDetails]) => {
                const orderWithDetails = { ...order, orderDetails };
                res.json({ orderWithDetails });
            })
            .catch((error) => {
                console.log(error);
            });
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

    //[POST] /oder/cancel/:id
    cancel(req, res) {
        try {
            const id = req.body.id;
            const reason = req.body.reason;
            if (!reason) {
                return res.status(400).json({ msg: "Không thể huỷ đơn hàng khi chưa nhập lý do" });
            }
            orderModel.updateOne({ _id: id }, { status: "cancel" })
                .then((order) => {
                    canceledOrderModel.create({ orderId: id, reason: reason })
                        .then((canceledOrder) => {
                            res.json(canceledOrder);
                        })
                })
                .catch((error) => {
                    console.log('không thể huỷ đơn hàng', error);
                });
        } catch (error) {
            console.log('không thể huỷ đơn hàng', error);
        }
    }

    //[GET] /api/orders
    async getOrders(req, res) {
        try {
            const orders = await orderModel.find({}).lean();
            res.json(orders);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Lấy danh sách đơn hàng thất bại!' });
        }
    }
}

module.exports = new orderController();