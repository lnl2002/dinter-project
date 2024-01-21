const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require('dotenv');
const { generalRefreshToken, generalAccessToken } = require("./JwtService");
config();

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { username, email, password } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        reject({
          status: "ERR",
          message: "The email is already existed",
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        username,
        email,
        password: hash,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "Created successfully!",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const login = (userInfo) => {
  return new Promise((resolve, reject) => {
    const { email, password } = userInfo;
    User.findOne({ email: email })
    .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
              const accessToken = generalAccessToken({
                id: user._id
              });

              const refreshToken = generalRefreshToken({
                id: user._id
              });

              resolve({
                status: "OK",
                message: "SUCCESS",
                accessToken: accessToken,
                refreshToken: refreshToken
              });
            } else {
              reject({
                status: "ERR",
                message: "Wrong password",
              });
            }
          });
        } else {
          reject({
            status: "ERR",
            message: "Wrong email",
          });
        }
      })
    .catch((e) => {
        reject(e);
      });
  })
}



module.exports = {
  createUser,
  login,
};