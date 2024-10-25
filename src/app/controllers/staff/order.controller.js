
class orderController {
    //[GET] /
    home(req, res) {
        res.send('Đơn mới');
    }
}

module.exports = new orderController();