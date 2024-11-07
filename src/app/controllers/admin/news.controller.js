const newsModel = require('../../models/news.model')

const { multipleMongooseToOject } = require('../../../util/mongoose');

// tạo slug thủ công
const slugify = (text) => {
    return text.toString().toLowerCase().trim()
        .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
        .replace(/&/g, '-and-') // Thay thế & bằng 'and'
        .replace(/[^\w\-]+/g, '') // Xóa bỏ ký tự không phải là chữ cái, số, gạch ngang, gạch dưới
        .replace(/\-\-+/g, '-'); // Thay thế nhiều dấu gạch ngang bằng một dấu
};

class newsController {
    // show index
    async getAll(req, res) {
        newsModel.find({})
            .then((news) => {
                news = news.map(news => news.toObject())
                res.render('news/index', {
                    news,
                    layout: 'admin'
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    //[GET] admin/foodtype/createForm
    create(req, res) {
        res.render('news/create', {
            layout: 'admin'
        });
    }

    //[POST] /admin/food/store
    async store(req, res) {
        try {
            const slug = slugify(req.body.nameNews) + '-' + Date.now();
            const news = new newsModel({
                nameNews: req.body.nameNews,
                imageNews: req.file.filename,
                descriptionNews: req.body.descriptionNews,
                slug: slug
            });
            await news.save();
            res.redirect('/admin/news/index');
        } catch (error) {
            console.log(error);
            res.status(500).send('Error saving news item');
        }
    }
}

    

module.exports = new newsController();
