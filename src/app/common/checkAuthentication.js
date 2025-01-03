const jwt = require('jsonwebtoken');

const staffModel = require('../models/admin.model.js')
const customerModel = require('../models/customer.model.js')

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
    // if(!req.headers.authorization){

    // }
    const token = req.cookies.customerAccessToken;

    if (token) {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      const id = decoded.payload.id;
      customerModel.findById(id).then(customer => {
        if (!customer) {
          return res.status(401).send('Invalid Token');
        }
        res.locals.customer = customer;
      })
      next();
    } else {
      next();
    }
  } catch (error) {
    console.log('error', error)
    next();
  }
};
