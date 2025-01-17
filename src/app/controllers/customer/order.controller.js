const Address = require('../../models/address.model'); // Đảm bảo bạn đã tạo mô hình Address
const Order = require('../../models/order.model'); // Đảm bảo bạn đã tạo mô hình Order
const OrderDetails = require('../../models/orderDetail.model'); // Đảm bảo bạn đã tạo mô hình OrderDetails
const Customer = require('../../models/customer.model');

const nodemailer = require('nodemailer');
const addressModel = require('../../models/address.model');
const cancelOrderModel = require('../../models/canceledOrder.model');
const Mongoose = require("mongoose");

class OrderController {
    //[GET] /address
    async placeOrder(req, res) {
        if (!req.customer) {
            res.render('order/placeOrder', {
                layout: 'main'
            }) 
        } else {
            const addressDefault = await addressModel.findOne({ _id: req.customer.addressDefault }) 
            res.render('order/placeOrder', {
                addressDefault,
                layout: 'main'
            })
        }

    }

    async submitOrder(req, res) {
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

            let order="";  
            if (req.customer) {
                    order = new Order({
                    idAddress: address._id,
                    idCustomer: req.body.customerId,              
                    status: 'new',
                    moneyTotal: req.body.items.reduce((total, item) => total + item.amount * item.price, 0),
                    payment: req.body.paymentMethod,
                    shippingFee: 15,
                    finalMoney: req.body.items.reduce((total, item) => total + item.amount * item.price, 0) + 15
                });
            } else {
                    order = new Order({
                    idAddress: address._id,            
                    status: 'new',
                    moneyTotal: req.body.items.reduce((total, item) => total + item.amount * item.price, 0),
                    payment: req.body.paymentMethod,
                    shippingFee: 15,
                    finalMoney: req.body.items.reduce((total, item) => total + item.amount * item.price, 0) + 15
                });
            }

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

            if (req.customer) {
            // Tạo đối tượng transporter
                const transporter = nodemailer.createTransport({
                service: 'gmail', // Sử dụng Gmail làm dịch vụ email
                auth: {
                    user: process.env.NODEMAILER_USER, // Địa chỉ email Gmail của bạn
                    pass: process.env.NODEMAILER_PASS // Mật khẩu Gmail của bạn
                }
                });
                
                // Định nghĩa các tùy chọn email
                const mailOptions = {
                from: process.env.NODEMAILER_USER, // Địa chỉ email của người gửi
                to: req.customer.email || req.customer.username, // Địa chỉ email của người nhận
                subject: 'Cảm ơn', // Dòng tiêu đề
                text: 'Bạn đã đặt hàng thành công, chúc bạn có một ngày vui vẻ' // Nội dung văn bản
                };
                
                // Gửi email
                transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
                });            
            }
            res.status(201).json({ message: 'Đặt hàng thành công!', order });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Đặt hàng thất bại!' });
        }
    }

    confirmation(req, res) {
        const id = req.params.id;
        res.redirect(`/customer/order/${id}`);
    }

    async getOrders(req, res) {
        try {
            const orders = await Order.find({}).lean();
            res.json(orders);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Lấy danh sách đơn hàng thất bại!' });
        }
    }

    //[post] /order/api/cancel/:id
    async cancelOrder(req, res) {
        try {
            const { reason } = req.body;
            const { id } = req.params;
    
            // Kiểm tra đầu vào
            if (!reason || !id) {
                return res.status(400).json({ msg: "Không thể huỷ đơn hàng khi chưa nhập lý do" });
            }
    
            const fullReason = `Đơn hàng hủy bởi khách hàng vì: ${reason}`;
    
            // Cập nhật trạng thái đơn hàng
            const updateResult = await Order.updateOne({ _id: id }, { status: "cancel" });
            if (updateResult.nModified === 0) {
                return res.status(404).json({ msg: "Đơn hàng không tồn tại hoặc không thể cập nhật" });
            }
    
            // Tạo bản ghi hủy đơn hàng
            const canceledOrder = await cancelOrderModel.create({ orderId: id, reason: fullReason });
    
            // Trả về kết quả thành công
            res.json(canceledOrder);
            global.io.emit('cancelOrderByCustomer', canceledOrder);
        } catch (error) {
            console.error('Không thể hủy đơn hàng', error);
            res.status(500).json({ msg: "Có lỗi xảy ra khi hủy đơn hàng" });
        }
    }
    
}
module.exports = new OrderController();