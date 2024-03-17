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
import Post from '../models/Post.js';
import mongoose from 'mongoose';

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
      console.log("test2");
      const createdUser = await User.create({
        username,
        email,
        password: hash,
      });
      console.log("test1");
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

const updateUserBasicInfo = async (userId, changes) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Update fields if they exist in the 'changed' object
    if (changes.avatar) {
      user.avatar = changes.avatar;
    }
    if (changes.bio) {
      user.bio = changes.bio;
    }
    if (changes.dateOfBirth) {
      user.dateOfBirth = changes.dateOfBirth;
    }
    if (changes.gender) {
      user.gender = changes.gender;
    }
    if (changes.hobby) {
      user.hobby = changes.hobby;
    }

    // Save the updated user
    await user.save();
    return user;
  } catch (error) {
    return `Error updating user information: ${error.message}`;
  }
}

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
                  id: user._id,
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
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(accessToken, process.env.PRIVATE_KEY, async (err, user) => {
        if (err) {
          reject({
            status: "ERR",
            message: "The authentication"
          })
        }
        const { id } = user;
        const userInfo = await User.findOne({
          _id: id
        })

        if (userInfo) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: {
              _id: userInfo._id,
              username: userInfo.username,
              avatar: userInfo.avatar,
              friends: userInfo.friends,
              isAdmin: userInfo.isAdmin,
              bio: userInfo.bio,
              hobbies: userInfo.hobbies,
              gender: userInfo.gender
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

const getUserInfoById = async (userId) => {
  try {
    const userInfo = await User.findById({_id : mongoose.Types.ObjectId.createFromHexString(userId)});
    const userPublicData = {
      _id: userInfo._id,
      username: userInfo.username,
      avatar: userInfo.avatar,
      friends: userInfo.friends,
      isAdmin: userInfo.isAdmin,
      bio: userInfo.bio,
      hobbies: userInfo.hobbies,
      gender: userInfo.gender,
      dateOfBirth: userInfo.dateOfBirth
    }
    return userPublicData;
  } catch (error) {
    throw new Error(error.toString());
  }
}

const getUserAnalysticNumber = async (userId) => {
  try {
    let numberOfPosts = await Post.countDocuments({ author: userId });
    let numberOfLikes = await Post
      .aggregate([
        {
          $match: { author: mongoose.Types.ObjectId.createFromHexString(userId) }
        },
        {
          $project: {
            likesCount: { $size: '$likes' }
          }
        },
        {
          $group: {
            _id: null,
            totalLikes: { $sum: '$likesCount' }
          }
        }
      ]);

    let analyticNumber = {
      numberOfLikes: numberOfLikes && numberOfLikes.length > 0 ? numberOfLikes[0].totalLikes : 0,
      numberOfPosts: numberOfPosts
    }

    return analyticNumber;
  } catch (error) {
    throw new Error(error.toString())
  }
}

const fncGetListRequest = async (req) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('requestMatch', 'username') // Lấy user và populate danh sách yêu cầu kết bạn
    res.json(user.requestMatch) // Trả về danh sách yêu cầu kết bạn
  } catch (error) {
    throw new Error(error.toString())
  }
}

const fncAcceptRequest = async (req) => {
  try {
    const userId = req.params.userId;
    const friendId = req.params.friendId;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    // Xử lý chấp nhận yêu cầu kết bạn
    user.friends.push(friend); // Thêm bạn vào danh sách bạn bè của user
    await user.save();

    // Xóa yêu cầu kết bạn khỏi danh sách yêu cầu của user
    user.requestMatch.pull(friend);
    await user.save();

    res.status(200).json({ message: "Accepted friend request" });
  } catch (error) {
    throw new Error(error.toString())
  }
}

const fncDeleteRequest = async (req) => {
  try {
    const userId = req.params.userId;
    const friendId = req.params.friendId;
    const user = await User.findById(userId);

    // Xóa yêu cầu kết bạn từ danh sách yêu cầu của user
    user.requestMatch.pull(friendId);
    await user.save();

    res.status(200).json({ message: "Deleted friend request" });
  } catch (error) {
    throw new Error(error.toString())
  }
}

export {
  createUser,
  login,
  getUserInfoByAccessToken
};

export default {
  createUser,
  login,
  fncAcceptRequest,
  fncDeleteRequest,
  fncGetListRequest,
  getUserInfoByAccessToken,
  getUserAnalysticNumber,
  updateUserBasicInfo,
  getUserInfoById
};