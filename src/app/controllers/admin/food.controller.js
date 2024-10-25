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
        res.send('tạo món ăn');
    }

    //[GET] /admin/food/delete
    delete(req, res) {
        res.send('xóa môn ăn');
    }

    //[GET] /admin/food/update
    update(req, res) {
        res.send('cap nhật môn ăn');
    }
}

module.exports = new FoodController();