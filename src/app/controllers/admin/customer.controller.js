const customerModel = require('../../models/customer.model')
const addressModel = require('../../models/address.model')

class CustomerController {
    getAll(req, res) {
        customerModel.find({}).populate('addressDefault').lean()
            .then(customer => {
                res.render('customer/cusIndex', {
                    customer,
                    layout: 'admin'
                })
            })
    }
}

module.exports = new CustomerController();