const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

exports.generateToken = async (payload, secretSignature) => {
  try {
    const token = await jwt.sign(
      {
        payload,
      },
      secretSignature,
      {
        algorithm: "HS256", //mã băm
        expiresIn: 900000,
      }
    );
    return token;
  } catch (error) {
    console.log(`Error in generate access token:  + ${error}`);
    return null;
  }
};
