const advertiseModel = require('../../models/advertise.model')

const { multipleMongooseToOject } = require('../../../util/mongoose');

// tạo slug thủ công
const slugify = (text) => {
    return text.toString().toLowerCase().trim()
        .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
        .replace(/&/g, '-and-') // Thay thế & bằng 'and'
        .replace(/[^\w\-]+/g, '') // Xóa bỏ ký tự không phải là chữ cái, số, gạch ngang, gạch dưới
        .replace(/\-\-+/g, '-'); // Thay thế nhiều dấu gạch ngang bằng một dấu
};

class advertiseController {
    // show index
    async getAll(req, res) {
        advertiseModel.find({})
            .then((advertise) => {
                advertise = advertise.map(advertise => advertise.toObject())
                res.render('advertise/index', {
                    advertise,
                    layout: 'admin'
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    //[GET] admin/advertise/create
    create(req, res) {
        res.render('advertise/create', {
            layout: 'admin'
        });
    }

    //[POST] /admin/advertise/store
    async store(req, res) {
        try {
            const slug = slugify(req.body.nameAdvertise) + '-' + Date.now(); //duy nhất
            const advertise = new advertiseModel({
                nameAdvertise: req.body.nameAdvertise,
                imageAdvertise: req.file.filename,
                linkAdvertise: req.body.linkAdvertise,
                slug: slug
            });
            await advertise.save();
            res.redirect('/admin/advertise/index');
        } catch (error) {
            console.log(error);
            res.status(500).send('Error saving advertise item');
        }
    }

    //[GET] /admin/advertise/:id/edit
    edit(req, res) {
        const id = req.params.id;
        advertiseModel.findById(id)
            .then((advertise) => {
                res.render('advertise/update', {
                    advertise,
                    layout: 'admin'
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    //[PUT] /admin/advertise/:id
    async update(req, res) {
        const slug = `${slugify(req.body.nameAdvertise)}-${Date.now()}`; //duy nhất
        let body = {
            ...req.body,
            slug
        };
        if (req?.file?.filename) {
            body.imageAdvertise = req.file.filename;
        }
        const advertise = await advertiseModel.updateOne({ _id: req.params.id }, body)
            .then(() => res.redirect('/admin/advertise/index'))
            .catch(error => {
                console.log(error);
            })
    }

    //[GET] /admin/news/delete
    delete(req, res) {
        const id = req.params.id;
        advertiseModel.findByIdAndDelete(id)
            .then(() => res.redirect('/admin/advertise/index'))
            .catch(error => {
                console.log(error);
            })
    }
}

module.exports = new advertiseController();