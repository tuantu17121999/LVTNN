const staffModel = require("../../models/staff.model.js");
const bcrypt = require('bcryptjs');

const { multipleMongooseToOject } = require("../../../util/mongoose");
const { validateErrorHandler } = require("../../common/handleError");

class staffController {
  index(req, res) {
    staffModel.find({}).lean()
      .then((staffs) => {
        res.render('staff/index', {
          staffs,
          layout: 'admin',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  activeStaff(req, res) {
    staffModel.find({ status: 'active' }).lean()
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
    staffModel.find({ status: 'inactive' }).lean()
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
    console.log(req?.file?.avatar, "req?.file?.avatar");
    const avatar = req?.file ? req.file.filename : "avatar-staff-default.jpg";

    // Kiểm tra các đầu vào để debug nếu cần
    console.log("Received data:", req.body);
    console.log("Received avatar:", avatar);

    // Tạo hash cho password
    const salt = bcrypt.genSaltSync(10);
    // Tạo instance mới của staffModel
    const staff = new staffModel({
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
        validateErrorHandler("staff/create.hbs", error, req, res, next);
      });
  }

  getOne(req, res) {
    staffModel
      .findById(req.params.id)
      .then((staff) => {
        res.json({ data: staff });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateForm(req, res) {
    staffModel
      .findById(req.params.id)
      .then((staff) => {
        res.render("staff/update", {
          formData: staff,
          layout: "admin",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async update(req, res) {
    const { name, phone, sex, identity } = req.body;
    const { password } = req.body ? req.body : null;
    console.log(password, "password");
    const avatar = req.file?.filename ? req.file.filename : null;
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
    staffModel
      .findByIdAndUpdate(req.params.id, params)
      .then((result) => {
        console.log(result);
        res.redirect("/admin/staff/index");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  block(req, res) {
    staffModel
      .findByIdAndUpdate(req.params.id, {
        status: "inactive",
      })
      .then((result) => {
        console.log("block success", result);
        res.redirect("/admin/staff/index");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  unBlock(req, res) {
    staffModel
      .findByIdAndUpdate(req.params.id, {
        status: "active",
      })
      .then((result) => {
        console.log("Unblock success", result);
        res.redirect("/admin/staff/index");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  blockIn(req, res) {
    staffModel
      .findByIdAndUpdate(req.params.id, {
        status: "inactive",
      })
      .then((result) => {
        console.log("block success", result);
        res.redirect("/admin/staff/active");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  unBlockIn(req, res) {
    staffModel
      .findByIdAndUpdate(req.params.id, {
        status: "active",
      })
      .then((result) => {
        console.log("Unblock success", result);
        res.redirect("/admin/staff/inactive");
      })
      .catch((error) => {
        console.log(error);
      });
  }

}

module.exports = new staffController();