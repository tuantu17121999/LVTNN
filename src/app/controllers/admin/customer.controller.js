const customerModel = require('../../models/customer.model')

class CustomerController {
    getAll(req, res) {
        res.send("HH")
        // const foodGetAll = await foodModel
        //   .find({})
        //   .populate("foodtypeid") // Kết hợp bảng foodtypeid
        //   .populate("promotionid") // Kết hợp bảng promotionid
        //   .then((food) => {
        //     // console.log(food.length)
        //     res.render("food/index", {
        //       food,
        //       // count: food.length,
        //       layout: "admin",
        //     });
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
    }
}

module.exports = new CustomerController();