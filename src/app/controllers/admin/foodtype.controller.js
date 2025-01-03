const { Admin } = require("mongodb");
const foodTypeModel = require('../../models/foodtype.model');
const foodModel = require("../../models/food.model");

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
        const foodtype = new foodTypeModel({
            nameType: req.body.nameType
        })
        foodtype.save()
            .then(() => res.redirect('/admin/foodType/index'))
            .catch(error => {
                console.log(error);
            })
    }

    //[GET] admin/foodtype/:id/update
    updateForm(req, res) {
        const id = req.params.id;
        foodTypeModel.findById(id)
            .then((foodtype) => {
                res.render('foodtype/updateForm',{
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
        const existedFood = await foodModel.findOne({foodtypeid: id}).exec() //Kiem tra co san pham khong
        if (existedFood === null){
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
