const foodModel = require('../../models/food.model');
const foodTypeModel = require('../../models/foodtype.model');

class FoodController {
    //[GET] /
    home(req, res) {
        Promise.all([
            foodTypeModel.find({}).lean(), // Sử dụng lean() để chuyển đổi trực tiếp sang Object
            foodModel.find({}).lean(),
            foodModel.find({foodtypeid:'672731488fc21635cbe96291'}).lean()
        ])
        .then(([foodtypes, foods, food2]) => {
            // Thay thế ký tự xuống dòng trong mô tả thực phẩm
            foods = foods.map(food => {
                return {
                    ...food,
                    description: food.description.replace(/\r\n/g, '<br/>'),
                };
            });

            food2 = food2.map(food => {
                return {
                    ...food,
                    description: food.description.replace(/\r\n/g, '<br/>'),
                };
            });
            res.render('home', {
                foodtypes, // Đổ dữ liệu foodtypes vào view
                foods, // Đổ dữ liệu foods vào view
                food2
            });
        })
        .catch(error => {
            console.log(error);
        });
    }     
}

module.exports = new FoodController();