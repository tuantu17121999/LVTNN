const newsModel = require('../../models/news.model');

class newsController {
    //[GET] /
    home(req, res) {
            newsModel.find({}).lean() // Sử dụng lean() để chuyển đổi trực tiếp sang Object
            .then((newss) => {
                res.render('news/news', {
                    newss
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    showNewsDetail(req, res) {
        const slug = req.params.slug;
        newsModel.findOne({ slug })
        .then((newss) => {
            res.render('news/detail', {
                newss
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
}

module.exports = new newsController();