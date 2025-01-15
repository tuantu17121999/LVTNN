const { Admin } = require("mongodb");
const foodTypeModel = require('../../models/foodtype.model');
const foodModel = require("../../models/food.model");
const foodtypeModel = require("../../models/foodtype.model");

class foodTypeController {
    // show index
    index(req, res) {
        foodTypeModel.find({})
            .then((foodtype) => {
                foodtype = foodtype.map(foodtype => foodtype.toObject())
                res.render('foodtype/index', {
                    foodtype,
                    layout: 'admin'
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    //[GET] admin/foodtype/createForm
    createForm(req, res) {
        res.render('foodtype/createForm', {
            layout: 'admin'
        });
    }

    //[POST] admin/foodtype/create
    store(req, res) {
        foodTypeModel.findOne({ nameType: req.body.nameType })
            .then((foodtype) => {
                if (foodtype) {
                    res.render('foodtype/createForm', {
                        layout: 'admin',
                        message: 'Loại sản phẩm này đã tồn tại'
                    });
                } else {
                    const newfoodtype = new foodTypeModel({
                        nameType: req.body.nameType
                    });
                    newfoodtype.save()
                        .then(() => res.redirect('/admin/foodType/index'))
                        .catch(error => {
                            console.log(error);
                        })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    //[GET] admin/foodtype/:id/update
    updateForm(req, res) {
        const id = req.params.id;
        foodTypeModel.findById(id)
            .then((foodtype) => {
                res.render('foodtype/updateForm', {
                    foodtype,
                    layout: 'admin'
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    //[PUT] admin/foodtype/:id
    update(req, res) {
        const id = req.params.id;
        foodTypeModel.findByIdAndUpdate(id, {
            nameType: req.body.nameType
        })
            .then(() => res.redirect('/admin/foodType/index'))
            .catch(error => {
                console.log(error);
            })
    }

    //[DELETE] admin/foodtype/:id
    async delete(req, res) {
        const id = req.params.id;
        const existedFood = await foodModel.findOne({ foodtypeid: id }).exec() //Kiem tra co san pham khong
        if (existedFood === null) {
            foodTypeModel.findByIdAndDelete(id)
                .then(() => res.redirect('/admin/foodType/index'))
                .catch(error => {
                    console.log(error);
                })
        }
        else {
            res.redirect('/admin/foodType/index?delete=false')
        }
    }
}

module.exports = new foodTypeController();
