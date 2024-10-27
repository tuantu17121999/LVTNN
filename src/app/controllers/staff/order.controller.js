
class orderController {
    //[GET] /
    home(req, res) {
        res.send('Đơn mới');
    }

    orderconfirmed(req, res) {
        res.send('Don hang duoc xac nhan');
    }

}

module.exports = new orderController();