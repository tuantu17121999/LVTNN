const bcrypt = require('bcryptjs');
const adminModel = require('../../models/admin.model');
const { generateToken } = require('../../common/generateToken');

const nodemailer = require("nodemailer");

class AdminController {
    // [GET] /admin
    index(req, res) {
        res.render('admin/admin', { layout: 'admin' });
    }

    // getOne(req, res) {
    //     const id = req.params.id;

    //     adminModel.findOne({ id, isDeleted: false })
    //         .then(admin => {
    //             res.json(admin);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }

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
                if (admin.role === 'admin') {
                    res.cookie("adminAccessToken", accessToken, {
                        maxAge: 1800000, //end 30minutes
                        httpOnly: true,
                    });
                } else if (admin.role === 'staff') {
                    res.cookie("staffAccessToken", accessToken, {
                        maxAge: 1800000, //end 30minutes
                        httpOnly: true,
                    });
                }

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

    profile(req, res) {
        res.render('admin/profile', { layout: 'admin' });
    }
    
    async editInfo(req, res) {
        const id = req.params.id;
        const updateData = { 
            phone: req.body.phone,
        };

        if (req?.file?.filename) {
            updateData.avatar = req.file.filename;
        }

        try {
            const admin = await adminModel.findByIdAndUpdate(id, updateData, { new: true });
            res.redirect("/admin/profile");
        } catch (error) {
            console.log('Error:', error);
            res.status(500).send('Đã xảy ra lỗi khi cập nhật thông tin.');
        }
    }

    changePasswordForm(req, res) {
        res.render("admin/changePassword", { layout: "admin" });
    }

    async changePassword(req, res) {
        const id = req.params.id;
        const { password } = req.body;

        try {
            // Mã hóa mật khẩu mới
            const hashedPassword = await bcrypt.hash(password, 10);

            // Cập nhật mật khẩu mới vào cơ sở dữ liệu
            const admin = await adminModel.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });

            res.status(200).json({ message: 'Mật khẩu đã được thay đổi thành công.' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi thay đổi mật khẩu.' });
        }
    }

    forgotPasswordForm(req, res) {
        res.render("admin/forgotPassword", { layout: false });
    }

    async forgotPassword(req, res) {
        const username = req.body.username;
        try {
            const admin = await adminModel.findOne({ username });
            if (!admin) {
                res.redirect("/admin/forgotPasswordForm?message=Tai khoan khong ton tai!")
            } 
            
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&()_+';
            let newPassword = '';
            for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random()*6);
            newPassword += characters[randomIndex];
            }

            // Mã hóa mật khẩu mới 
            const hashedPassword = await bcrypt.hash(newPassword, 10); 
            
            // Cập nhật mật khẩu mới vào cơ sở dữ liệu 
            admin.password = hashedPassword; 
            await admin.save();

            // Tạo đối tượng transporter
            const transporter = nodemailer.createTransport({
            service: 'gmail', // Sử dụng Gmail làm dịch vụ email
            auth: {
                user: process.env.NODEMAILER_USER, // Địa chỉ email Gmail của bạn
                pass: process.env.NODEMAILER_PASS // Mật khẩu Gmail của bạn
            }
            });
            
            // Định nghĩa các tùy chọn email
            const mailOptions = {
            from: process.env.NODEMAILER_USER, // Địa chỉ email của người gửi
            to: username, // Địa chỉ email của người nhận
            subject: 'Quên mật khẩu', // Dòng tiêu đề
            text: `Mật khẩu mới của bạn là: ${newPassword}` // Nội dung văn bản
            };
            
            // Gửi email
            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            }); 
            res.redirect("/admin/login");
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AdminController();