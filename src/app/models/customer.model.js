const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  username: {
    type: String,
    validate: {
      validator: function (value) {
        // Nếu type là 'username', thì username phải tồn tại
        if (this.type === "username") {
          return !!value; // Trả về true nếu username không rỗng
        }
        return true; // Không cần kiểm tra nếu type không phải là 'username'
      },
      message: "Username là bắt buộc.",
    },
  },
  password: {
    type: String,
    validate: {
      validator: function (value) {
        // Nếu type là 'username', thì password phải tồn tại
        if (this.type === "username") {
          return !!value; // Trả về true nếu email không rỗng
        }
        return true; // Không cần kiểm tra nếu type không phải là 'google'
      },
      message: "Mật khẩu là bắt buộc.",
    },
  },
  type: {
    type: String,
    enum: ["username", "google"],
    default: "username",
  },
  email: {
    type: String,
    validate: {
      validator: function (value) {
        // Nếu type là 'google', thì email phải tồn tại
        if (this.type === "google") {
          return !!value; // Trả về true nếu email không rỗng
        }
        return true; // Không cần kiểm tra nếu type không phải là 'google'
      },
      message: "Email is required when type is google.",
    },
    sparse: true, //cho phép null trùng
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    validate: {
      validator: function (value) {
        // Nếu type là 'google', thì email phải tồn tại
        if (this.type === "username") {
          return !!value; // Trả về true nếu email không rỗng
        }
        return true; // Không cần kiểm tra nếu type không phải là 'google'
      },
      message: "Số điện thoại là bắt buộc.",
    },
  },
  sex: {
    type: String,
    enum: ["male", "female"],
    default: "male",
  },
  avatar: {
    type: String,
    maxLength: 255,
  },
  addressDefault: {
    type: Schema.Types.ObjectId,
    ref: "Address",
    maxLength: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("customer", customerSchema);
