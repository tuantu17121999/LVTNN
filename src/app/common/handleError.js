const mongoose = require("mongoose");

exports.validateErrorHandler = (
  template,
  error,
  req,
  res,
  layout = null
) => {
  if (error instanceof mongoose.Error.ValidationError) {
    const errors = {};
    Object.keys(error.errors).forEach((field) => {
      errors[field] = error.errors[field].message;
    });

    return res.render(template, {
      errors: errors,
      formData: req.body,
      formImage: req.file,
      layout: req.originalUrl.startsWith("/admin")
        ? "admin"
        : req.originalUrl.startsWith("/staff")
          ? "staff"
          : "main",
    });
  }

  if (error.code === 11000) {
    const duplicatedField = Object.keys(error.keyValue)[0];
    const duplicatedValue = error.keyValue[duplicatedField];
    return res.render(template, {
      errors: {
        message: `Giá trị '${duplicatedValue}' cho trường '${duplicatedField}' đã tồn tại.`,
      },
      formData: req.body, // Giữ lại dữ liệu đã nhập
      layout: req.originalUrl.startsWith("/admin")
        ? "admin"
        : req.originalUrl.startsWith("/staff")
          ? "staff"
          : "main",
    });
  }

  return res.render(template, {
    errors: {
      message: "Đã xảy ra lỗi hệ thống",
    },
    layout:
      layout || req.originalUrl.startsWith("/admin")
        ? "admin"
        : req.originalUrl.startsWith("/staff")
          ? "staff"
          : "main",
  });
};
