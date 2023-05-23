const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.js");

const getToken = (payload) => {
  return jwt.sign(payload, authConfig.secret, { expiresIn: "24h" });
};

const getTokenData = (token) => {
  let data = null;

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      data = { error: err };
    } else {
      data = decoded;
    }
  });

  return data;
};

module.exports = {
  getToken,
  getTokenData,
};
