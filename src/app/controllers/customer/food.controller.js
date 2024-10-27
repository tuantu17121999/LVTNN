const foodModel = require('../../models/food.model');

class FoodController {
    //[GET] /
    home(req, res) {
        res.send('Trang chủ Món ăn của KH');
    }

    detail(req, res) {
        res.send('Xem chi tiet thuc an');
    }
}

module.exports = new FoodController();