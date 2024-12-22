const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: {
    type: String,
    required: [true, "Tên là bắt buộc"],
  },
  username: {
    type: String,
    required: [true, "Tên đăng nhập là bắt buộc"],
    unique: true,
  },
  password: {
    type: String,
    required: [
      function () {
        return this.isNew;
      },
      "Mật khẩu là bắt buộc",
    ],
  },
  avatar: { type: String, maxLength: 255 },
  phone: {
    type: String,
    required: [true, "Số điện thoại là bắt buộc"],
    minlength: [10, "Số điện thoại phải là 10 số"],
    unique: true,
  },
  sex: {
    type: String,
    enum: ["male", "female"],
    default: "male",
  },
  identity: {
    type: String,
    required: [true, "Căn cước công dân là bắt buộc"],
    unique: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  role: {
    type: String,
    enum: ["admin", "staff"],
    default: "staff",
  },
  // isDeleted: {
  //   type: Boolean,
  // },
});

module.exports = mongoose.model("admin", adminSchema);