const jwt = require('jsonwebtoken');

const staffModel = require('../models/admin.model.js')
const customerModel = require('../models/customer.model.js')

const mongoose = require("mongoose");

exports.checkToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      
    }
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1]; //lấy token từ tiêu đề
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      if (decoded) {
        next();
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

exports.checkTokenAdmin = async (req, res, next) => {
  try {
    // if(!req.headers.authorization){

    // }
    const token = req.cookies.adminAccessToken;

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (decoded) {
      next();
    } else {
      return res.redirect('/admin/login');
    }
  } catch (error) {
    console.log('error', error)
    return res.redirect('/admin/login');

  }
};

exports.checkTokenStaff = async (req, res, next) => {
  try {
    // if(!req.headers.authorization){

    // }
    const token = req.cookies.staffAccessToken;

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (decoded) {
      const id = decoded.payload.id;
      staffModel.findById(id).then(staff => {
        if (!staff) {
          return res.status(401).send('Invalid Token');
        }
        res.locals.staff = staff;
      })
      next();
    } else {
      return res.redirect('/admin/login');
    }
  } catch (error) {
    console.log('error', error)
    return res.redirect('/admin/login');
  }
};
exports.checkTokenCustomer = async (req, res, next) => {
  try {
    console.log('checkTokenCustomer')
    const token = req.cookies.customerAccessToken;  // Lấy token từ cookies của khách hàng
    if (token) {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);  // Xác thực token với JWT
      console.log('decoded', decoded)
      const email = decoded.payload.email;  // Lấy ID khách hàng từ token
      console.log('email', email)
      const id = decoded.payload.id;
      console.log('id', id)
      let customer = null;  // Khai bao bien customer
      if (email) {
        customer = await customerModel.findOne({ email: email });
      }
      if (id) {
        customer = await customerModel.findById(id);  // Chờ đợi truy vấn cơ sở dữ liệu
      }

      console.log(customer, 'customer')
      
      if (!customer) {
        return res.status(401).send('Invalid Token');  // Gửi thông báo 'Invalid Token'
      }
      
      res.locals.customer = customer;  // Lưu thông tin khách hàng vào response locals
    }
    
    next();  // Tiếp tục middleware tiếp theo
  } catch (error) {
    console.error('Error verifying customer token:', error);  // Log lỗi chi tiết hơn
    return res.status(500).send('Internal Server Error');  // Gửi thông báo lỗi máy chủ
  }
};
