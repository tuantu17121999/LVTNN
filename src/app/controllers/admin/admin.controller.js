const bcrypt = require('bcrypt');

const adminModel = require('../../models/admin.model')
const { generateToken } = require('../../common/generateToken');

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

    async login(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        console.log(req.body);
        adminModel.findOne({ username })
        .then(async admin => {
            if(!admin){
                return res.json("Tai khoan khong ton tai");
            }
            const passwordCompare = await bcrypt.compare(password, admin.password);
            if(!passwordCompare) {
                return res.json("Sai mat khau");
            }   
            const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

            const accessToken = await generateToken(
                { id: admin._id },
                accessTokenSecret,
            );

            res.cookie('adminAccessToken', accessToken, { maxAge: 900000, httpOnly: true });
            res.redirect('/admin');
        })
        .catch(error => {
            console.log(error);
        });
    }

    loginForm(req, res){
        res.render('login');
    }
}

module.exports = new AdminController();