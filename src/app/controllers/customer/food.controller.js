const foodModel = require('../../models/food.model');

class FoodController {
    //[GET] /
    home(req, res) {
        res.render('home',{
            layout: 'login'
        });
    }

    detail(req, res) {
        res.render('detail',{
            layout: 'admin'
        });
    }
}

module.exports = new FoodController();