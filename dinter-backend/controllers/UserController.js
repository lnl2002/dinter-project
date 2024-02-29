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
    const {email, password} = req.body;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isCheckEmail = reg.test(email);
    if(!isCheckEmail) {
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
      if(!token) {
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
      console.log('headers',req.headers);
      const token = req.headers.token.split(' ')[1];
      console.log('token',token);
      if(!token) {
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

export {
  createUser,
  login,
  refreshToken,
  getUserInfoByAccessToken
};

export default {
  createUser,
  login,
  refreshToken,
  getUserInfoByAccessToken
};