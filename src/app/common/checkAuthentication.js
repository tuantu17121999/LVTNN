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
    console.log("checkTokenAdmin", req);
    // if(!req.headers.authorization){

    // }
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      console.log("checkTokenAdmin", decoded);
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

exports.checkTokenStaff = async (req, res, next) => {
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
