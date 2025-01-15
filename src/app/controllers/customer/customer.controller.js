const { Cookie } = require("express-session");
const { generateToken } = require("../../common/generateToken");
const customerModel = require("../../models/customer.model");
const bcrypt = require("bcryptjs");

const nodemailer = require("nodemailer");

require("dotenv").config();
const { ACCESS_TOKEN_CUSTOMER_SECRET } = process.env;
class CustomerController {
  async register(req, res) {
    try {
      const newUser = {
        username: req.body.username,
        name: req.body.name,
        phone: req.body.phone,
        avatar: req?.file?.filename,
        password: req.body.password // Thêm password vào đối tượng newUser
      };
  
      const salt = bcrypt.genSaltSync(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
  
      await customerModel.create(newUser);
      res.redirect("/customer/login");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
  
  async googleCallback(req, res) {
    const token = await generateToken(
      { email: req.user.email },
      ACCESS_TOKEN_CUSTOMER_SECRET
    );

    res.cookie("customerAccessToken", token, {
      httpOnly: true,
    });
    res.cookie(
      "customer",
      JSON.stringify({
        id: req.user._id,
        username: req.user.username,
        avatar: req?.user?.avatar,
      }),
      { httpOnly: false, maxAge: 3600000 }
    );
    res.redirect("/");
  }

  login(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    customerModel
      .findOne({ username })
      .then(async (user) => {
        if (!user) {
          res.redirect("/customer/login?message=Tai khoan khong ton tai!")
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
          res.redirect("/customer/login?message=Sai mat khau!")
        }

        const token = await generateToken(
          { id: user._id },
          ACCESS_TOKEN_CUSTOMER_SECRET
        );

        res.cookie("customerAccessToken", token, {
          httpOnly: true,
        });

        res.cookie(
          "customer",
          JSON.stringify({
            id: user._id,
            username: user.username,
            avatar: user?.avatar,
          }),
          { httpOnly: false, maxAge: 3600000 }
        );
        res.redirect("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout(req, res) {
    res.clearCookie("customerAccessToken");
    res.clearCookie('customer');
    res.redirect("/");
  }

  index(req, res) {
    res.render("customer/index", { layout: "main" });
  }

  async editInfo(req, res) {
    const id = req.params.id;
    const updateData = { 
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        sex: req.body.sex
    };

    if (req?.file?.filename) {
        updateData.avatar = req.file.filename;
    }

    try {
        const customer = await customerModel.findByIdAndUpdate(id, updateData, { new: true });
        res.redirect("/customer");
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Đã xảy ra lỗi khi cập nhật thông tin.');
    }
  }
  
  forgotPasswordForm(req, res) {
    res.render("customer/forgotPassword", { layout: false });
  }

  async forgotPassword(req, res) {
    const username = req.body.username;
    try {
      const customer = await customerModel.findOne({ username });
      if (!customer) {
        res.redirect("/customer/forgotPasswordForm?message=Tai khoan khong ton tai!")
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
      customer.password = hashedPassword; 
      await customer.save();

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
      res.redirect("/customer/login");
    } catch (error) {
      console.log(error);
    }
  }

  changePasswordForm(req, res) {
    res.render("customer/changePassword", { layout: "main" });
  }

  async changePassword(req, res) {
    const id = req.params.id;
    const { password } = req.body;

    try {
      // Mã hóa mật khẩu mới
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cập nhật mật khẩu mới vào cơ sở dữ liệu
      const customer = await customerModel.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });

      res.status(200).json({ message: 'Mật khẩu đã được thay đổi thành công.' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi thay đổi mật khẩu.' });
    }
  }

}

module.exports = new CustomerController();
