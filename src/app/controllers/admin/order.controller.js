const orderModel = require('../../models/order.model')
const moment = require('moment');

class orderController {
    getAll(req, res) {
        Promise.all([
            orderModel.find({}).populate('idAddress').lean(), // Sử dụng lean() để chuyển đổi trực tiếp sang Object
            orderModel.find({ status: 'completed' }).lean(),
        ])
            .then(([orders, completedOrders]) => {
                // Tính tổng doanh thu từ các đơn hàng đã hoàn thành
                const totalRevenue = completedOrders.reduce((acc, order) => acc + order.moneyTotal, 0);

                const formattedOrders = orders.map(order => {
                    return {
                        ...order,
                        createdAtFormatted: moment(order.createdAt).format('DD/MM/YYYY HH:mm:ss')
                    };
                });
                res.render('order/index', {
                    orders: formattedOrders,
                    completedOrders,
                    totalRevenue,
                    layout: 'admin'
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).send('Internal Server Error');
            });
    }
}

module.exports = new orderController()