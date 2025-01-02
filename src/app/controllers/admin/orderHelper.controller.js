const orderModel = require('../../models/order.model');
const OrderDetails = require('../../models/orderDetail.model');
const canceledOrderModel = require('../../models/canceledOrder.model');
class adminController {
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
                res.render('admin/orderHelper', {
                    layout: 'admin',
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
}

module.exports = new adminController();