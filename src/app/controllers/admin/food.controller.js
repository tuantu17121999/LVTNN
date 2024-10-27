const foodModel = require('../../models/food.model');

class FoodController {
    //[GET] /admin/food
    getAll(req, res) {
        const foodGetAll = foodModel.find({})
            .then((foodGetAll) => {
                res.json(foodGetAll);
            })
            .catch(error => {
                console.log(error);
            });
    };

    //[GET] /admin/food/create
    create(req, res) {
        res.send('Tao san pham');
    }

    //[GET] /admin/food/delete
    delete(req, res) {
        res.send('xóa san pham');
    }

    //[GET] /admin/food/update
    update(req, res) {
        res.send('cap nhật san pham');
    }
}

module.exports = new FoodController();