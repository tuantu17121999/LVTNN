const customerModel = require('../../models/address.model')

class CustomerController {
    getAll(req, res) {
        customerModel.find({}).lean()
            .then(customer => {
                res.render('customer/cusIndex', {
                    customer,
                    layout: 'admin'
                })
            })
    }
}

module.exports = new CustomerController();