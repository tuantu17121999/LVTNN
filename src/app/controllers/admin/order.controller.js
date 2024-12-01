const orderModel = require('../../models/order.model')

class orderController {
    getAll(req, res) {
        Promise.all([
            orderModel.find({}).lean(), // Sử dụng lean() để chuyển đổi trực tiếp sang Object
            orderModel.find({ status: 'completed' }).lean(),
        ])
        .then(([orders, completedOrders]) => {
            // Tính tổng doanh thu từ các đơn hàng đã hoàn thành
            const totalRevenue = completedOrders.reduce((acc, order) => acc + order.moneyTotal, 0);    
            // Trả về kết quả tổng doanh thu và hiển thị trên Handlebars
            res.render('order/index', {
                orders,
                completedOrders,
                totalRevenue,
                layout: 'admin'
            });
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        });
    }
    
    
}

module.exports = new orderController()