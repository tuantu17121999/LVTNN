const addressModel = require('../../models/address.model'); // Đảm bảo bạn đã tạo mô hình Address
const orderModel = require('../../models/order.model'); // Đảm bảo bạn đã tạo mô hình Order
const orderDetails = require('../../models/orderDetail.model'); // Đảm bảo bạn đã tạo mô hình OrderDetails
const foodModel = require('../../models/food.model');

class staffController {
    getAll(req, res) {
        Promise.all([
            // orderDetails.populate('foodid','orderid',populate('idAddress')).find({ status: 'new' }).lean(),
            // orderDetails.populate('foodid','orderid',populate('idAddress')).find({ status: 'inProgress' }).lean(),
            // orderDetails.populate('foodid','orderid',populate('idAddress')).find({ status: 'completed' }).lean(),

            // orderDetails.find().populate('foodid').lean(),
            // orderDetails.find().lean(),
            // orderDetails.find().populate('foodid').populate('orderid').lean(),
            orderModel.find({ status: 'new' }).populate('idAddress').lean(),
            orderModel.find({ status: 'inProgress' }).lean(),
            orderModel.find({ status: 'completed' }).lean()
        ])
            .then(([ordersNew, ordersInProgress, ordersCompleted]) => {
                // res.json({
                //     ordersNew,
                //     ordersInProgress,
                //     ordersCompleted
                // })
                
                res.render('staff/staff', {        
                    layout: 'staff',
                    ordersNew,
                    ordersInProgress,
                    ordersCompleted
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
}

module.exports = new staffController();