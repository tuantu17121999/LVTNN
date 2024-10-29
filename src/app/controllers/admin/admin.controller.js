const adminModel = require('../../models/admin.model')

class AdminController{
    getAll(req, res){
        adminModel.find({isDeleted: false})
        .then(admins => {
            res.json(admins);
        })
        .catch(error => {
            console.log(error);
        })
    }

    getOne(req, res){
        const id = req.params.id; 

        adminModel.findOne({id, isDeleted: false})
        .then(admin => {
            res.json(admin);
        })
        .catch(error => {
            console.log(error);
        })
    }

    create(req, res){
        const admin = new adminModel({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            isDeleted: false
        }); 
        admin.save()
        .then(admin => {
            res.json(admin);
        })
        .catch(error => {
            console.log(error);
        })
    }

    delete(req, res){
        const id = req.params.id;
        adminModel.findByIdAndDelete(id)
        .then(admin => {
            res.json(admin);
        })
        .catch(error => {
            console.log(error);
        })
    }

    update(req, res){
        const id = req.params.id;
        adminModel.findByIdAndUpdate(id, {
            name: req.body.name
        })
        .then(admin => {
            res.json(admin);
        })
        .catch(error => {
            console.log(error);
        })
    }

    softDelete(req, res){
        const id = req.params.id;
        adminModel.findByIdAndUpdate(id, {isDeleted: true})
        .then(admin => {
            res.json(admin);
        })
        .catch(error => {
            console.log(error);
        })
    }

    restore(req, res){
        const id = req.params.id;
        adminModel.findByIdAndUpdate(id, {isDeleted: false})
        .then(admin => {
            res.json(admin);
        })
        .catch(error => {
            console.log(error);
        })
    }

    login(req, res){
        const username = req.body.username;
        const password = req.body.password;

        adminModel.findOne({username, password})
        .then(admin => {
            res.json('Dang nhap thanh cong');
        })
        .catch(error => {
            console.log(error);
        })
    }
}

module.exports = new AdminController();