const { Admin } = require("mongodb");
const newsModel = require('../../models/news.model')

class newsController {
    // show index
    index(req, res) {
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

    //[GET] admin/news/createForm
    createForm(req, res) {
        res.render('news/createForm', {
            layout: 'admin'
        });
    }

    //[POST] admin/news/create
    store(req, res) {
        const news = new newsModel({
            nameNew: req.body.nameNew,
        })
        news.save()
            .then(() => res.redirect('/admin/news/index'))
            .catch(error => {
                console.log(error);
            })
    }

    //[GET] admin/news/:id/update
    updateForm(req, res) {
        const id = req.params.id;
        newsModel.findById(id)
            .then((news) => {
                res.render('news/updateForm',{
                    news,
                    layout: 'admin'
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    //[PUT] admin/news/:id
    update(req, res) {
        const id = req.params.id;
        newsModel.findByIdAndUpdate(id, {
            nameNew: req.body.nameNew
        })
            .then(() => res.redirect('/admin/news/index'))
            .catch(error => {
                console.log(error);
            })
    }   

    //[DELETE] admin/news/:id
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
