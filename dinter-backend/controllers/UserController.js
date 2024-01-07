const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");


const createUser = async (req, res) => {
  try {
    //checkemail
    const { name, email, password, confirmPassword } = req.body;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isCheckEmail = reg.test(email);

    if (!name || !email || !password || !confirmPassword) {
      console.log(req.body);
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is not email",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The password is equal confirm password",
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isCheckEmail = reg.test(email);
    if(!isCheckEmail) {
      return res.status(404).json({
        status: "ERROR",
        message: "This is not a email"
      })
    } else {
      const response = await UserService.login(req.body);
      res.status(200).json(response);
    }
  } catch (error) {
    return res.status(400).json({
      message: error
    })
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
      res.status(200).json(response);
      
    
  } catch (error) {
    return res.status(400).json({
      status: "ERR",
      message: "Something went wrong",
    })
  }
}

module.exports = {
  createUser,
  login,
  refreshToken,
};