const promotionModel = require('../../models/promotion.model');
const foodModel = require('../../models/food.model');

class promotionController {
    index(req, res) {
        promotionModel.find({}).lean()
            .then(promotions => {
                res.render('promotion/index', {
                    promotions,
                    layout: 'admin'
                })
            })
    }

    create(req, res) {
        res.render('promotion/create', {
            layout: 'admin'
        })
    }

    store(req, res) {
        try {
            // luu lai khuyen mai
            const promotion = new promotionModel({
                name: req.body.name,
                discount: req.body.discount,
                amount: req.body.promotionItems.length
            });
            promotion.save();
            // luu lai chi tiet khuyen mai
            const promotionItems = req.body.promotionItems.map(item => {
                foodModel.findById(item._id)
                    .then((food) => {
                        food.promotionid = promotion._id;
                        food.save();
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).send('Internal Server Error');
                    });
                return {
                    foodid: item.id,
                    promotionid: promotion._id,
                };
            });
            res.json(promotionItems);
        } catch (error) {
            console.log(error);
        }
    }

    async delete(req, res) {
        Promise.all([
            promotionModel.findByIdAndDelete(req.params.id),
            foodModel.updateMany({ promotionid: req.params.id }, { promotionid: null })
        ])
            .then(() => res.redirect('/admin/promotion/index'))
            .catch(error => {
                console.log(error);
            })
    }

    async edit(req, res) {
        await promotionModel.findById(req.params.id).lean()
            .then((promotion) => {
                res.render('promotion/edit', {
                    promotion,
                    layout: 'admin'
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    async update(req, res) {
        try {
            //update promotion
            await promotionModel.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                discount: req.body.discount,
                amount: req.body.promotionItems.length
            })
            const setpromotionIdNull = await foodModel.updateMany({ promotionid: req.params.id }, { promotionid: null });
            const promotionItems = req.body.promotionItems.map(item => {
                foodModel.findById(item._id)
                    .then((food) => {
                        food.promotionid = req.params.id;
                        food.save();
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).send('Internal Server Error');
                    });
                return {
                    foodid: item.id,
                    promotionid: req.params.id,
                };
            });
            res.json(promotionItems);
        } catch (error) {
            console.log(error);
        }
    }

    getPromotionFoods(req, res) {
        foodModel.find({ promotionid: req.params.id }).lean()
            .then(foods => {
                res.json(foods);
            })
            .catch(error => {
                console.log(error);
            })

    }
    
    getNotPromotionFoods(req, res) {
        foodModel.find({ promotionid: null }).lean()
            .then(foods => {
                res.json(foods);
            })
            .catch(error => {
                console.log(error);
            })
    }
}

module.exports = new promotionController();