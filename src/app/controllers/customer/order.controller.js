const Address = require('../../models/address.model'); // Đảm bảo bạn đã tạo mô hình Address
const Order = require('../../models/order.model'); // Đảm bảo bạn đã tạo mô hình Order
const OrderDetails = require('../../models/orderDetail.model'); // Đảm bảo bạn đã tạo mô hình OrderDetails


class OrderController {
    //[GET] /address
    async placeOrder(req, res) {
        res.render('order/placeOrder', {
            layout: 'main'
        })
    }

    async submitOrder(req, res) {
        console.log(req.body.items)
        try {
            // Lưu lại địa chỉ
            const address = await Address.create({
                fullName: req.body.fullName,
                phone: req.body.phone,
                city: req.body.city,
                district: req.body.district,
                wards: req.body.wards,
                address: req.body.address
            });

            // Lưu lại đơn hàng
            const order = new Order({
                idAddress: address._id,
                status: 'new',
                moneyTotal: req.body.items.reduce((total, item) => total + item.amount * item.price, 0),
                payment: req.body.paymentMethod
            });

            // Lưu lại chi tiết đơn hàng
            const orderDetailsPromises = req.body.items.map(item => {
                return OrderDetails.create({
                    foodid: item.id,
                    orderid: order._id,
                    name: item.name,
                    amount: item.amount,
                    price: item.price
                });
            });

            // Chờ tất cả các chi tiết đơn hàng được lưu
            await Promise.all(orderDetailsPromises);

            // Cập nhật số lượng chi tiết đơn hàng trong đơn hàng
            order.amount = req.body.items.length;
            await order.save();

            res.status(201).json({ message: 'Đặt hàng thành công!', order });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Đặt hàng thất bại!' });
        }
    }

    confirmation(req, res) {
        res.redirect('/');
        // res.render('order/confirmation', {
        //     layout: 'main'
        // })
    }
}
module.exports = new OrderController();