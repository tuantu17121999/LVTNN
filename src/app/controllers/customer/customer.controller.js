const { Cookie } = require("express-session");
const { generateToken } = require("../../common/generateToken");
const customerModel = require("../../models/customer.model");
const bcrypt = require("bcryptjs");

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
          return res.json("Tai khoan khong ton tai");
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
          return res.json("Sai mat khau");
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

  avatar(req, res) {
    res.render("customer/avatar", { layout: "main" });
  }

  index(req, res) {
    res.render("customer/index", { layout: "main" });
}
}

module.exports = new CustomerController();
