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

    async confirmOrder(req, res) {
        try {
            const id = req.body.id;
            if (!id) {
                return res.status(400).send('Order ID is required');
            }
            await orderModel.updateOne({ _id: id }, { status: "inProgress" });
            const order = await orderModel.findById(id); // Lấy lại đơn hàng sau khi cập nhật
            res.json(order);
            global.io.emit('confirmOrder', id); // Gửi thông báo sau khi cập nhật thành công
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating order');
        }
    } 

    async complete(req, res) {
        try {
            const id = req.body.id;
            if (!id) {
                return res.status(400).send('Order ID is required');
            }
            await orderModel.updateOne({ _id: id }, { status: "completed" });
            const order = await orderModel.findById(id); // Lấy lại đơn hàng sau khi cập nhật
            res.json(order);
            global.io.emit('completeOrder', id); // Gửi thông báo sau khi cập nhật thành công
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating order');
        }
    }
    

    //[POST] /oder/cancel/:id
    async cancel(req, res) {
        try {
            const id = req.body.id;
            const reason = req.body.reason;
            if (!reason) {
                return res.status(400).json({ msg: "Không thể huỷ đơn hàng khi chưa nhập lý do" });
            }
            if (!id) {
                return res.status(400).json({ msg: 'Order ID is required' });
            }
            await orderModel.updateOne({ _id: id }, { status: "cancel" });
            const canceledOrder = await canceledOrderModel.create({ orderId: id, reason: reason });
            res.json(canceledOrder);
            global.io.emit('cancelOrder', id); // Gửi thông báo sau khi huỷ thành công
        } catch (error) {
            console.error('không thể huỷ đơn hàng', error);
            res.status(500).json({ msg: 'Error canceling order' });
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