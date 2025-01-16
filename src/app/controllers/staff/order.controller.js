const orderModel = require("../../models/order.model");
const canceledOrderModel = require("../../models/canceledOrder.model");
const orderDetailModel = require("../../models/orderDetail.model");
const staffModel = require("../../models/admin.model");
const io = require("socket.io");

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
        const id = req.body.id;
        const idStaff = req.body.staffId;
    
        if (!id) {
            return res.status(400).send("ID đơn hàng không hợp lệ");
        }
    
        try {
            const staff = await staffModel.findOne({ _id: idStaff });
            const updateData = { status: "inProgress" };
    
            if (staff) {
                updateData.idStaff = idStaff;
            }

            const order = await orderModel.findOne({ _id: id });
            if (!order) {
                return res.status(404).send("Đơn hàng không tồn tại");
            }
    
            await orderModel.updateOne({ _id: id }, updateData);
            res.json({ message: "Cập nhật đơn hàng thành công" });
            global.io.emit('confirmOrder', id); // Gửi thông báo sau khi cập nhật thành công
        } catch (error) {
            console.log(error);
            res.status(500).send("Có lỗi xảy ra");
        }
    }
    
    async complete(req, res) {
        const id = req.body.id;
        const idStaff = req.body.staffId;
    
        if (!id || !idStaff) {
            return res.status(400).send("ID đơn hàng hoặc ID nhân viên không hợp lệ");
        }
    
        try {
            const staff = await staffModel.findOne({ _id: idStaff });
            const updateData = staff ? { status: "completed", idStaff } : { status: "completed" };
    
            const order = await orderModel.findOne({ _id: id });
            if (!order) {
                return res.status(404).send("Đơn hàng không tồn tại");
            }
    
            await orderModel.updateOne({ _id: id }, updateData);
            res.json({ message: "Đơn hàng đã được hoàn thành" });
            global.io.emit('completeOrder', id); // Gửi thông báo sau khi cập nhật thành công
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            res.status(500).send("Có lỗi xảy ra");
        }
    }    

    //[POST] /oder/cancel/:id
    async cancel(req, res) {
        const id = req.body.id;
        const reason = req.body.reason;
        const idStaff = req.body.staffId;
    
        if (!id || !reason || !idStaff) {
            return res.status(400).json({ msg: "ID đơn hàng, lý do hoặc ID nhân viên không hợp lệ" });
        }
    
        try {
            const order = await orderModel.findOne({ _id: id });
            if (!order) {
                return res.status(404).send("Đơn hàng không tồn tại");
            }
    
            await orderModel.updateOne({ _id: id }, { status: "cancel" });
            const canceledOrder = await canceledOrderModel.create({ orderId: id, reason: reason, idStaff: idStaff });
            res.json(canceledOrder);
            global.io.emit('cancelOrder', id); // Gửi thông báo sau khi huỷ thành công
        } catch (error) {
            console.error('không thể huỷ đơn hàng:', error);
            res.status(500).send("Có lỗi xảy ra");
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