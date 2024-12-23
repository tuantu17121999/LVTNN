const jwt = require('jsonwebtoken');

exports.checkToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
    }
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
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

    const decoded = await jwt.verify(token, 'abc123');
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

    const decoded = await jwt.verify(token, 'abc123');
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
