const orderModel = require('../../models/order.model');
const orderDetailModel = require('../../models/orderDetail.model');

class historyController {
    async customerHistory(req, res) {
        try {
            const id = req.params.id;
            const orders = await orderModel.find({ idCustomer: id }).populate('idAddress').lean().sort({ createdAt: -1 });
    
            const ordersWithDetails = await Promise.all(
                orders.map(async (order) => {
                    const details = await orderDetailModel.find({ orderid: order._id }).populate('foodid').lean();
                    return {
                        ...order,
                        details
                    };
                })
            );
            res.render('customer/history', {
                orders: ordersWithDetails
            });
        } catch (error) {
            console.error('Error fetching customer history:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    customerOrder(req, res) {
        const id = req.params.id;
        orderModel.findById(id)
            .populate('idAddress')
            .lean()
            .then(order => {
                orderDetailModel.find({ orderid: id })
                    .populate('foodid')
                    .lean()
                    .then(details => {
                        const orderDetails = { ...order, details };
                        res.render('customer/order', {
                            orderDetails
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }
}

module.exports = new historyController();