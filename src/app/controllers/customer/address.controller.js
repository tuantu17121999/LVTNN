const addressModel = require('../../models/address.model');

class addressController {

    //[GET] /cus/add/create
    create(req, res) {
        res.send('Thêm địa chỉ KH');
    }

    //[GET] /cus/add/delete
    delete(req, res) {
        res.send('Xóa địa chỉ KH');
    }

    //[GET] /cus/add/update
    update(req, res) {
        res.send('Cập nhật địa chỉ KH');
    }

    oderconfirmed(req, res) {
        res.send('Đơn hàng đc xác nhận');
    }

    customerAddressList(req, res) {
        addressModel.find({}).lean()
            .then(addresses => {
                res.render('address/customerAddressList', { 
                    addresses,
                    layout: 'main' });
            })
    }
}

module.exports = new addressController();