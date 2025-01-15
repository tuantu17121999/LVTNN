const adminModel = require("../../models/admin.model");
const bcrypt = require('bcryptjs');

const { multipleMongooseToOject } = require("../../../util/mongoose");
const { validateErrorHandler } = require("../../common/handleError");

class staffController {
  index(req, res) {
    adminModel
      .find({ role: "staff" })
      .then((staffs) => {
        res.render("staff/index", {
          staffs: multipleMongooseToOject(staffs),
          layout: "admin",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getOne(req, res) {
    adminModel
      .findById(req.params.id)
      .then((staff) => {
        res.json({ data: staff });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  activeStaff(req, res) {
    adminModel.find({ status: 'active', role: 'staff' }).lean()
      .then((activeStaffss) => {
        res.render('staff/indexActive', {
          activeStaffss,
          layout: 'admin',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  inactiveStaff(req, res) {
    adminModel.find({ status: 'inactive', role: 'staff' }).lean()
      .then((inactiveStaffss) => {
        res.render('staff/indexInactive', {
          inactiveStaffss,
          layout: 'admin',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createForm(req, res) {
    res.render("staff/create", {
      layout: "admin",
    });
  }

  async create(req, res, next) {
    const { name, username, phone, sex, identity } = req.body;
    let { password } = req.body;

    const avatar = req?.file ? req.file.filename : "avatar-staff-default.jpg";

    try {
        // Kiểm tra xem username có bị trùng không
        const existingUser = await adminModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username đã tồn tại.' });
        }

        // Kiểm tra xem identity có bị trùng không
        const existingIdentity = await adminModel.findOne({ identity });
        if (existingIdentity) {
            return res.status(400).json({ message: 'Identity đã tồn tại.' });
        }

        // Tạo hash cho password
        const salt = bcrypt.genSaltSync(10);

        // Tạo instance mới của adminModel
        const staff = new adminModel({
            name,
            username,
            password: password ? await bcrypt.hash(password, salt) : password,
            phone,
            sex,
            identity,
            avatar,
            status: "active",
        });

        // Lưu staff, nếu không hợp lệ sẽ vào catch
        await staff
            .save()
            .then(() => {
                res.redirect("/admin/staff/index?message=đã tạo nhân viên thành công");
            })
            .catch((error) => {
                console.log(error, "Error creating staff");
                validateErrorHandler("staff/create.hbs", error, req, res);
            });
    } catch (error) {
        console.error(error, "Error creating staff");
        res.status(500).json({ message: 'Đã xảy ra lỗi khi tạo nhân viên.' });
    }
  }


  updateForm(req, res) {
    adminModel
      .findById(req.params.id)
      .then((admin) => {
        res.render("staff/update", {
          formData: admin,
          layout: "admin",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async update(req, res) {
    const { name, phone, sex, identity, avatar } = req.body;
    const { password } = req.body ? req.body : null;
    const params = {
      name,
      phone,
      sex,
      identity,
      avatar,
    };
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      params.password = await bcrypt.hash(password, salt);
    }
    if (req?.file?.filename) {
      params.avatar = req.file.filename;
    }

    adminModel
      .findByIdAndUpdate(req.params.id, params, {
        new: true,
        runValidators: true, // Đảm bảo kiểm tra lại các điều kiện khác
      })
      .then((result) => {
        res.redirect("/admin/staff/index");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  block(req, res) {
    adminModel
      .findByIdAndUpdate(req.params.id, {
        status: "inactive",
      })
      .then((result) => {
        res.redirect("/admin/staff/index");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  unBlock(req, res) {
    adminModel
      .findByIdAndUpdate(req.params.id, {
        status: "active",
      })
      .then((result) => {
        res.redirect("/admin/staff/index");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  blockIn(req, res) {
    adminModel
      .findByIdAndUpdate(req.params.id, {
        status: "inactive",
      })
      .then((result) => {
        res.redirect("/admin/staff/active");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  unBlockIn(req, res) {
    adminModel
      .findByIdAndUpdate(req.params.id, {
        status: "active",
      })
      .then((result) => {
        res.redirect("/admin/staff/inactive");
      })
      .catch((error) => {
        console.log(error);
      });
  }

}

module.exports = new staffController();