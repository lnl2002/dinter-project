// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { config } = require('dotenv');
// const { generalRefreshToken, generalAccessToken } = require("./JwtService");

import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { generalRefreshToken, generalAccessToken } from './JwtService.js';

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
                refreshToken: refreshToken,
                data: {
                  id : user._id,
                  username: user.username,
                  avatar: user.avatar, 
                }
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

const getUserInfoByAccessToken = (accessToken) => {
  return new Promise( async (resolve, reject) => {
    try {
      jwt.verify(accessToken, process.env.PRIVATE_KEY, async (err, user) => {
        if (err) {
            reject({
                status: "ERR",
                message: "The authentication"
            })
        } 
        const {id} = user;
        const userInfo = await User.findOne({
          _id: id
        })

        if(userInfo) {
          resolve({
              status: "OK",
              message: "SUCCESS",
              data: {
                username: userInfo.username,
                avatar: userInfo.avatar,
                isAdmin: userInfo.isAdmin
              }
          })
        } 

        reject({
            status: "ERR",
            message: "The authentication"
        })
        
      })
    } catch (error) {
      reject(error);
    }
  })
}
const getAllUser = async () => {
  try {
      const listUser = await User.find({}).exec();
      console.log(listUser);
      return listUser;
  } catch (error) {
      throw new Error(error.toString());
  }
}

export {
  createUser,
  login,
  getUserInfoByAccessToken,
  getAllUser
};

export default {
  createUser,
  login,
  getUserInfoByAccessToken,
  getAllUser
};