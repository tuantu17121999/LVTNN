const orderModel = require('../../models/order.model');

class staffController {
    getAll(req, res) {
        Promise.all([
            orderModel.find({ status: 'new' }).lean(),
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