const bcrypt = require('bcryptjs');
const adminModel = require('../../models/admin.model');
const { generateToken } = require('../../common/generateToken');

class AdminController {
    // [GET] /admin
    index(req, res) {
        res.render('admin/admin', { layout: 'admin' });
    }
    
    getOne(req, res) {
        const id = req.params.id;

        adminModel.findOne({ id, isDeleted: false })
            .then(admin => {
                res.json(admin);
            })
            .catch(error => {
                console.log(error);
            });
    }

    delete(req, res) {
        const id = req.params.id;
        adminModel.findByIdAndDelete(id)
            .then(admin => {
                res.json(admin);
            })
            .catch(error => {
                console.log(error);
            });
    }

    // [GET] /admin/login
    loginForm(req, res) {
        res.render('admin/login', { layout: 'login' });
    }

    // [POST] /admin/login
    async login(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        adminModel
            .findOne({ username })
            .then(async (admin) => {

                if (!admin) {
                    res.redirect("/admin/login?message=Tai khoan khong ton tai!")
                }

                if (admin.status === "inactive" && admin.role !== "admin") {
                    res.redirect("/admin/login?message=Tai khoan da bi khoa!");
                }

                const passwordCompare = await bcrypt.compare(password, admin.password); //so sánh mk
                if (!passwordCompare) {
                    res.redirect("/admin/login?message=Sai mat khau!")

                }

                const accessTokenSecret = 'abc123';

                const accessToken = await generateToken(
                    { id: admin._id },
                    accessTokenSecret
                );
                //Lưu token vào cookie
                res.cookie("adminAccessToken", accessToken, {
                    maxAge: 900000, //end 15minutes
                    httpOnly: true,
                });
                if (admin.role === "admin") {
                    res.redirect("/admin");
                } else {
                    res.redirect("/staff");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // [GET] /admin/logout
    logout(req, res) {
        res.clearCookie('adminAccessToken');
        res.redirect('/');
    }
}

module.exports = new AdminController();