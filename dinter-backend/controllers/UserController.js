import UserService from '../services/UserService.js';
import JwtService from '../services/JwtService.js';
import User from '../models/User.js';


const createUser = async (req, res) => {
  try {
    //checkemail
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
const getAllUser = async (req, res) => {
  try {
      const result = await UserService.getAllUser();
      res.status(200).json({
          message: "Success",
          user: result
      })
  } catch (error) {
      res.status(500).json({
          message: error.toString()
      })
  }
}
const searchUsers = async (req,res) => {
  try {
    // Tìm kiếm người dùng dựa trên từ khóa
    const keyword = req.params.keyword
    const users = await User.find({
      $or: [
        { username: { $regex: keyword, $options: "i" } },
        // { email: { $regex: keyword, $options: "i" } },
        // { bio: { $regex: keyword, $options: "i" } },
        // { address: { $regex: keyword, $options: "i" } },
      ],
    });

    return res.status(200).json({
      users
    });
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};


const updateUser = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ request params
  const { gender, dateOfBirth, avatar, bio, hobbies } = req.body; // Lấy thông tin cần cập nhật từ request body

  try {
    // Tìm người dùng trong cơ sở dữ liệu bằng ID
    const user = await User.findById(userId);

    // Kiểm tra nếu người dùng không tồn tại
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Cập nhật thông tin người dùng
    user.gender = gender;
    user.dateOfBirth = dateOfBirth;
    user.avatar = avatar;
    user.bio = bio;
    user.hobbies = hobbies;

    // Lưu thông tin người dùng đã được cập nhật vào cơ sở dữ liệu
    await user.save();

    return res.status(200).json({ message: 'User information updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export {
  createUser,
  login,
  refreshToken,
  getUserInfoByAccessToken,
  getAllUser,
  searchUsers,
  updateUser
};

export default {
  createUser,
  login,
  refreshToken,
  getUserInfoByAccessToken,
  getAllUser,
  searchUsers,
  updateUser
};