const addressModel = require('../../models/address.model');
const customerModel = require('../../models/customer.model');

class addressController {

    //[GET] /cus/add/create
    create(req, res) {
        res.render('customer/addressForm', { layout: 'main' });
    }

    storeApi(req, res) {
        try {
            const id = req.body.id;
            customerModel.findById(id)
                .then(customer => {
                    if (customer) {
                        const address = new addressModel(req.body);
                        address.customerid = id;
                        address.save()
                            .then(() => {
                                res.status(201).json({ message: 'Address created successfully' });
                            })
                            .catch(error => {
                                console.log(error);
                                res.status(500).json({ message: 'Internal Server Error' });
                            });
                    } else {
                        res.status(404).json({ message: 'Customer not found' });
                    }
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({ message: 'Internal Server Error' });
                });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    edit(req, res) {
        const id = req.params.id;
        addressModel.findById(id)
            .then((address) => {
                res.render('customer/addressEdit', { address, layout: 'main' });
            })
            .catch(error => {
                console.log(error);
                res.status(500).send('Internal Server Error');
            })
    }

    async updateApi(req, res) {
        const id = req.params.id;
        try {
            const address = await addressModel.findById(id);
            if (!address) {
                return res.status(404).send('Address không tồn tại');
            }
    
            const updatedAddress = {
                fullName: req.body.fullName,
                phone: req.body.phone,
                city: req.body.city,
                district: req.body.district,
                wards: req.body.wards,
                address: req.body.address
            };
    
            const result = await addressModel.findByIdAndUpdate(id, updatedAddress, { new: true });

            if (!result) {
                return res.status(404).send('Address không tồn tại');
            }
    
            res.status(200).send('Cập nhật thành công');
        } catch (error) {
            console.log('Error:', error);
            res.status(500).send('Đã xảy ra lỗi khi cập nhật thông tin.');
        }
    }

    customerAddressList(req, res) {
        const id = req.params.id;
        addressModel.find({ customerid: id })
            .then(address => {
                res.render('customer/address', { address });
            })
            .catch(error => {
                console.log(error);
                res.status(500).send('Internal Server Error');
            });
    }

    setDefault(req, res) {  
        const id = req.params.id;
        addressModel.findById(id)
            .then(address => {
                if (address) {
                    customerModel.findById(address.customerid)
                        .then(customer => {
                            if (customer) {
                                customer.addressDefault = id;
                                customer.save()
                                    .then(() => {
                                        res.redirect('/customer/address/' + customer._id);
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        res.status(500).send('Internal Server Error');
                                    });
                            } else {
                                res.status(404).send('Customer not found');
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(500).send('Internal Server Error');
                        });
                } else {
                    res.status(404).send('Address not found');
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).send('Internal Server Error');
            });   
    }
}

module.exports = new addressController();