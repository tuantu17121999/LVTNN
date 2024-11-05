const foodModel = require('../../models/food.model');
const foodTypeModel = require('../../models/foodtype.model');

const { multipleMongooseToOject } = require('../../../util/mongoose');

// tạo slug thủ công
const slugify = (text) => {
    return text.toString().toLowerCase().trim()
        .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
        .replace(/&/g, '-and-') // Thay thế & bằng 'and'
        .replace(/[^\w\-]+/g, '') // Xóa bỏ ký tự không phải là chữ cái, số, gạch ngang, gạch dưới
        .replace(/\-\-+/g, '-'); // Thay thế nhiều dấu gạch ngang bằng một dấu
};

class FoodController {
    //[GET] /admin/food
    async getAll(req, res) {
        const foodGetAll = await foodModel.find({}).populate('foodtypeid')
            .then((food) => {
                res.render('food/index', {
                    food,
                    layout: 'admin'
                })
            })
            .catch(error => {
                console.log(error);
            });
    };

    //[GET] /admin/food/create
    create(req, res) {
        foodTypeModel.find({})
            .then((foodType) =>
                res.render('food/create', {
                    foodtype: multipleMongooseToOject(foodType),
                    layout: 'admin'
                })
            )
            .catch(error => {
                console.log(error);
            });
    }

    //[POST] /admin/food/store
    async store(req, res) {
        try {
            const slug = slugify(req.body.name) + '-' + Date.now();
            const food = new foodModel({
                name: req.body.name,
                foodtypeid: req.body.foodtypeid,
                description: req.body.description,
                image: req.file.filename,
                price: req.body.price,
                slug: slug
            });
            await food.save();
            res.redirect('/admin/food/index');
        } catch (error) {
            console.log(error);
            res.status(500).send('Error saving food item');
        }
    }

    //[GET] /admin/food/:id/edit
    updateForm(req, res) {
        const id = req.params.id;
        foodModel.findById(id)
            .then((food) => {
                res.render('food/edit', {
                    food,
                    layout: 'admin'
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    //[PUT] /admin/food/:id
    async update(req, res) {
        const slug = `${slugify(req.body.name)}-${Date.now()}`;
        let body = {
            ...req.body,
            slug
        };
        if (req?.file?.filename) {
            body.image = req.file.filename;
        }
        const food = await foodModel.updateOne({ _id: req.params.id }, body)
            .then(() => res.redirect('/admin/food/index'))
            .catch(error => {
                console.log(error);
            })
    }

    //[GET] /admin/food/delete
    delete(req, res) {
        const id = req.params.id;
        foodModel.findByIdAndDelete(id)
            .then(() => res.redirect('/admin/food/index'))
            .catch(error => {
                console.log(error);
            })
    }

}

module.exports = new FoodController();