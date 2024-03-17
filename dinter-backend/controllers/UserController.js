import UserService from '../services/UserService.js';
import JwtService from '../services/JwtService.js';


const createUser = async (req, res) => {
  try {
    //checkemail
    console.log(req.body);
    const { username, email, password, confirmPassword } = req.body;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isCheckEmail = reg.test(email);

    if (!username || !email || !password || !confirmPassword) {
      return res.status(404).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(404).json({
        status: "ERR",
        message: "The input is not email",
      });
    } else if (password !== confirmPassword) {
      return res.status(404).json({
        status: "ERR",
        message: "Password and Confirm Password do not match",
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isCheckEmail = reg.test(email);
    if (!isCheckEmail) {
      return res.status(404).json({
        status: "ERR",
        message: "This is not a email"
      })
    } else {
      const response = await UserService.login(req.body);
      res.status(200).json(response);
    }
  } catch (error) {
    return res.status(404).json(error)
  }
}

const refreshToken = async (req, res) => {
  try {
    const token = req.headers.token.split(' ')[1];
    if (!token) {
      return res.status(404).json({
        status: "ERR",
        message: "Invalid token"
      })
    }

    const response = await JwtService.refreshToken(token);
    res.status(201).json(response);


  } catch (error) {
    return res.status(404).json(error)
  }
}

const getUserInfoByAccessToken = async (req, res) => {
  try {
    console.log('headers', req.headers);
    const token = req.headers.token.split(' ')[1];
    console.log('token', token);
    if (!token) {
      return res.status(404).json({
        status: "ERR",
        message: "Invalid token"
      })
    }

    const response = await UserService.getUserInfoByAccessToken(token);
    res.status(200).json(response);


  } catch (error) {
    return res.status(404).json(error)
  }
}

const getUserInfoById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const response = await UserService.getUserInfoById(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json(error)
  }
}

const updateUserBasicInfo = async (req, res) => {
  try {
    let changes = req.body.changes;
    if (req.file) {
      changes ={
        avatar: req.file.path
      }
    }
    const token = req.headers.token.split(' ')[1];
    const authorizedUser = await UserService.getUserInfoByAccessToken(token);
    const updatedData = await UserService.updateUserBasicInfo(authorizedUser.data._id, changes)
    return res.status(200).json(updatedData);
  } catch (error) {
    return `Error updating user information: ${error.message}`;
  }
}

//get user likes, posts, and friends number
const getUserAnalysticNumber = async (req, res) => {
  try {
    const userId = req.params.userId;
    const response = await UserService.getUserAnalysticNumber(userId);

    return res.status(200).json(response)
  } catch (error) {
    return res.status(404).json(error)
  }
}

//get request add friend
const getRequestFriend = async (req, res) => {
  try {
    const response = await UserService.fncGetListRequest(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const acceptFriend = async (req, res) => {
  try {
    const response = await UserService.fncAcceptRequest(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const deleteAcceptFriend = async (req, res) => {
  try {
    const response = await UserService.fncDeleteRequest(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

export {
  createUser,
  login,
  refreshToken,
  getRequestFriend,
  acceptFriend,
  deleteAcceptFriend,
  getUserInfoByAccessToken,
  getUserAnalysticNumber,
  updateUserBasicInfo,
  getUserInfoById
};

export default {
  createUser,
  login,
  refreshToken,
  getRequestFriend,
  acceptFriend,
  deleteAcceptFriend,
  getUserInfoByAccessToken,
  getUserAnalysticNumber,
  updateUserBasicInfo,
  getUserInfoById
};