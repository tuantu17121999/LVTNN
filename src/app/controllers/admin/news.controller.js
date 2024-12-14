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

function trimDescription(description, maxLength = 30) {
    if (description.length <= maxLength) {
        return description;
    }
    const trimmedString = description.substr(0, maxLength);
    const lastSpaceIndex = trimmedString.lastIndexOf(' '); //tìm vị trí khoảng trắng cuối cùng
    
    if (lastSpaceIndex > 0) {
        return trimmedString.substr(0, lastSpaceIndex) + '...';
    } else {
        return trimmedString + '...';
    }
}

class newsController {
    // show index
    async getAll(req, res) {
        try {
            let news = await newsModel.find({}).lean();
            news = news.map(news => {
                return {
                    ...news,
                    descriptionNews: trimDescription(news.descriptionNews)
                };
            });
            res.render('news/index', {
                news,
                layout: 'admin'
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching news items');
        }
    }

    //[GET] admin/news/create
    create(req, res) {
        res.render('news/create', {
            layout: 'admin'
        });
    }

    //[POST] /admin/food/store
    async store(req, res) {
        try {
            const slug = slugify(req.body.nameNews) + '-' + Date.now(); //duy nhất
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

    //[GET] /admin/food/:id/edit
    edit(req, res) {
        const id = req.params.id;
        newsModel.findById(id)
            .then((news) => {
                res.render('news/update', {
                    news,
                    layout: 'admin'
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    //[PUT] /admin/food/:id
    async update(req, res) {
        const slug = `${slugify(req.body.nameNews)}-${Date.now()}`;
        let body = {
            ...req.body,
            slug
        };
        if (req?.file?.filename) {
            body.imageNews = req.file.filename;
        }
        const news = await newsModel.updateOne({ _id: req.params.id }, body)
            .then(() => res.redirect('/admin/news/index'))
            .catch(error => {
                console.log(error);
            })
    }

    //[GET] /admin/news/delete
    delete(req, res) {
        const id = req.params.id;
        newsModel.findByIdAndDelete(id)
            .then(() => res.redirect('/admin/news/index'))
            .catch(error => {
                console.log(error);
            })
    }
}

module.exports = new newsController();
