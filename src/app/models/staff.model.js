const { ServerClosedEvent } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const staffSchema = new Schema({
  name: {
    type: String,
    required: [true, "Tên nhân viên là bắt buộc"],
  },
  username: {
    type: String,
    required: [true, "Tên đăng nhập là bắt buộc"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Mật khẩu là bắt buộc"],
  },
  avatar: { type: String, maxLength: 255 },
  phone: {
    type: String,
    required: [true, "Số điện thoại là bắt buộc"],
    minlength: [10, "Số điện thoại phải là 10 số"],
  },
  sex: {
    type: String,
    enum: ["male", "female"], //du lieu co dinh
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
});

module.exports = mongoose.model("staff", staffSchema);
