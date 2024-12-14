const foodModel = require('../../models/food.model');
const foodTypeModel = require('../../models/foodtype.model');
const advModel = require('../../models/advertise.model');
const promotionModel = require('../../models/promotion.model');

function replaceDescription(foods) {
    return foods.map(food => {
        if (food.promotionid != null && parseFloat(food.promotionid.discount) > 0) {
            const newPrice = parseFloat(food.price) - (parseFloat(food.price) / 100 * parseFloat(food.promotionid.discount));
            return {
                ...food,
                newPrice: newPrice.toFixed(0), // Đảm bảo giá trị số với 2 chữ số thập phân
                description: food.description.replace(/\r\n/g, '<br/>'),
            };
        }
        return {
            ...food,
            description: food.description.replace(/\r\n/g, '<br/>'),
        };
    });
}


class FoodController {
    //[GET] /
    home(req, res) {
        Promise.all([
            foodTypeModel.find({}).lean(), // Sử dụng lean() để chuyển đổi trực tiếp sang Object
            foodModel.find({ tag: 'New' }).populate('promotionid').lean(),
            foodModel.find({ promotionid: { $exists: true, $ne: null } }).populate('promotionid').lean(),
            foodModel.find({ foodtypeid: '672731488fc21635cbe96291'}).populate('promotionid').lean(), 
            foodModel.find({ foodtypeid: { $ne: '672731488fc21635cbe96291' } }).populate('promotionid').lean(), //$ne là toán tử (not equals)
            advModel.find({}).lean()
        ])
            .then(([foodtypes, foods, deals, food2, food3, adv]) => {

                // Thay thế ký tự xuống dòng trong mô tả thực phẩm
                foods = replaceDescription(foods);
                deals = replaceDescription(deals);
                food2 = replaceDescription(food2);
                food3 = replaceDescription(food3);
                res.render('home', {
                    foodtypes, // Đổ dữ liệu foodtypes vào view
                    foods, // Đổ dữ liệu foods vào view
                    deals,
                    food2,
                    food3,
                    adv
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    showFoodDetail(req, res) {
        const slug = req.params.slug;
        foodModel.findOne({ slug }).populate('promotionid').lean()
            .then(food => {
                if (food.promotionid != null && parseFloat(food.promotionid.discount) > 0) {
                    const newPrice = parseFloat(food.price) - (parseFloat(food.price) / 100 * parseFloat(food.promotionid.discount));
                    // Thay thế tất cả các ký tự \r\n trong description bằng thẻ <br/>
                    food.description = food.description.replace(/\r\n/g, '<br/>').replaceAll('-', '');
                    const list = food.description.split('<br/>'); // Chia chuỗi thành từng dòng bằng thẻ <br/>
                    food = {
                        name: food.name,
                        description: food.description,
                        discount: food.promotionid.discount,
                        image: food.image,
                        price: food.price,
                        newPrice: newPrice.toFixed(0), // Đảm bảo giá trị số với 2 chữ số thập phân
                    }
                    res.render('food/detail', {
                        food,
                        list
                    });
                } else {
                    // Thay thế tất cả các ký tự \r\n trong description bằng thẻ <br/>
                    food.description = food.description.replace(/\r\n/g, '<br/>').replaceAll('-', '');
                    const list = food.description.split('<br/>'); // Chia chuỗi thành từng dòng bằng thẻ <br/>
                    res.render('food/detail', {
                        food,
                        list
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
}

module.exports = new FoodController();