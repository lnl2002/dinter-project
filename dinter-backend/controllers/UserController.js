import UserService from '../services/UserService.js';
import JwtService from '../services/JwtService.js';
import User from '../models/User.js';


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
      return res.status(401).json({
        status: "ERR",
        message: "Invalid token"
      })
    }

    const response = await JwtService.refreshToken(token);
    res.status(201).json(response);


  } catch (error) {
    return res.status(401).json(error)
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

const getMatchedUsers = async (req, res) =>{
  try{
    const token = req.headers.token.split(' ')[1];
    const response = await UserService.getUserInfoByAccessToken(token);
    const user = response.data;
    
    const MatchedUserList = await UserService.getMatchedUsers(user.location, user.hobbies, user.attractedBy, user._id)
    return res.status(200).json(MatchedUserList)
  } catch (error) {
    return res.status(404).json(error)
  }
}

const sendMatchRequest = async (req, res) => {
  try{
    const targetUserId = req.body.targetUserId;
    const token = req.headers.token.split(' ')[1];
    const response = await UserService.getUserInfoByAccessToken(token);
    const user = response.data;
    
    await UserService.sendMatchRequest(targetUserId , user._id)
    return res.status(200).json({message: 'successful'})
  } catch (error) {
    return res.status(404).json(error)
  }
}

const getAllRequestMatches = async(req,res) => {
  try{
    const { id } = req.params;
    const requestMatches = await User.findById(id, 'requestMatch').populate('requestMatch', '_id username avatar');
    
    return res.status(200).json(requestMatches)
  } catch (error) {
    return res.status(404).json(error)
  }
}

const accRequestMatch = async(req,res) => {
  try{
    const { sender, receiver } = req.body;

    
    const requestMatches = await User.findByIdAndUpdate(sender, {
      $addToSet: {
        friends: receiver
      },
      $pull: {
        requestMatch: receiver
      }
    })

    const requestMatchesForReceiver = await User.findByIdAndUpdate(receiver, {
      $addToSet: {
        friends: sender
      },
      $pull: {
        requestMatch: sender
      }
    })
    
    return res.status(200).json(requestMatches)
  } catch (error) {
    return res.status(404).json(error)
  }
}

const deleteRequestMatch = async(req,res) => {
  try{
    const { sender, receiver } = req.body;

    const requestMatches = await User.findByIdAndUpdate(sender, {
      $pull: {
        requestMatch: receiver
      }
    })

    return res.status(200).json(requestMatches)
  } catch (error) {
    return res.status(404).json(error)
  }
}

export {
  createUser,
  login,
  refreshToken,
  getUserInfoByAccessToken,
  getUserAnalysticNumber,
  updateUserBasicInfo,
  getUserInfoById,
  getMatchedUsers,
  sendMatchRequest,
  getAllRequestMatches,
  accRequestMatch,
  deleteRequestMatch
};

export default {
  createUser,
  login,
  refreshToken,
  getUserInfoByAccessToken,
  getUserAnalysticNumber,
  updateUserBasicInfo,
  getUserInfoById,
  getMatchedUsers,
  sendMatchRequest,
  getAllRequestMatches,
  accRequestMatch,
  deleteRequestMatch
};