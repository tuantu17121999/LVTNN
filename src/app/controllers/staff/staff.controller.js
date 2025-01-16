const orderModel = require('../../models/order.model');
const OrderDetails = require('../../models/orderDetail.model');
const canceledOrderModel = require('../../models/canceledOrder.model');
const staffModel = require('../../models/admin.model');

const bcrypt = require("bcryptjs");

class staffController {
    getAll(req, res) {
        Promise.all([
            orderModel.find({ status: 'new' }).populate('idAddress').lean(),
            orderModel.find({ status: 'inProgress' }).populate('idAddress').lean(),
            orderModel.find({ status: 'completed' }).populate('idAddress').lean(),
            canceledOrderModel.find({}).populate('orderId').lean()
        ])
            .then(async ([ordersNew, ordersInProgress, ordersCompleted, ordersCancelled]) => {
                const orderIdsNew = ordersNew.map(order => order._id);
                const orderIdsInProgress = ordersInProgress.map(order => order._id);
                const orderIdsCompleted = ordersCompleted.map(order => order._id);
    
                // Lấy chi tiết đơn hàng cho tất cả các trạng thái
                const [orderDetailsNew, orderDetailsInProgress, orderDetailsCompleted] = await Promise.all([
                    OrderDetails.find({ orderid: { $in: orderIdsNew } }).lean(),
                    OrderDetails.find({ orderid: { $in: orderIdsInProgress } }).lean(),
                    OrderDetails.find({ orderid: { $in: orderIdsCompleted } }).lean()
                ]);
    
                // Kết hợp chi tiết đơn hàng với đơn hàng tương ứng
                const ordersNewWithDetails = ordersNew.map(order => ({
                    ...order,
                    details: orderDetailsNew.filter(detail => detail.orderid.toString() === order._id.toString()) //lọc
                }));
    
                const ordersInProgressWithDetails = ordersInProgress.map(order => ({
                    ...order,
                    details: orderDetailsInProgress.filter(detail => detail.orderid.toString() === order._id.toString()) //lọc
                }));
    
                const ordersCompletedWithDetails = ordersCompleted.map(order => ({
                    ...order,
                    details: orderDetailsCompleted.filter(detail => detail.orderid.toString() === order._id.toString()) //lọc
                }));
                res.render('staff/staff', {
                    layout: 'staff',
                    ordersNew: ordersNewWithDetails,
                    ordersInProgress: ordersInProgressWithDetails,
                    ordersCompleted: ordersCompletedWithDetails,
                    ordersCancelled
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    async editInfo(req, res) {
        const id = req.params.id;  
        const updateData = { 
            phone: req.body.phone,
        };

        if (req?.file?.filename) {
            updateData.avatar = req.file.filename;
        }

        try {
            const staff = await staffModel.findByIdAndUpdate(id, updateData, { new: true });
            res.status(200).json({ message: 'Đã cập nhật thông tin thành công', success: true });
        } catch (error) {
            console.log('Error:', error);
            res.status(500).send('Đã xảy ra lỗi khi cập nhật thông tin.');
        }
    }

    async changePassword(req, res) {
        try {
            const id = req.params.id;
            const { password } = req.body;

            if (!password) {
                return res.status(400).json({ message: 'Mật khẩu là bắt buộc.' });
            }
            // Mã hóa mật khẩu mới
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Cập nhật mật khẩu mới vào cơ sở dữ liệu
            const staff = await staffModel.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
    
            res.status(200).json({ message: 'Mật khẩu đã được thay đổi thành công.', success: true });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi thay đổi mật khẩu.' });
        }
    }
    
    logout(req, res) {
        res.clearCookie('staffAccessToken');
        res.redirect('/');
    }
}

module.exports = new staffController();