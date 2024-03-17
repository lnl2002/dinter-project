import HobbyService from "../services/HobbyService.js";

const getAllHobby = async (req, res) =>{
    try{
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;
        const hobbies = await HobbyService.getAllHobby(limit, offset);
        return res.status(200).json({
            message: "get posts success",
            data: hobbies
        })
    }catch (error) {
        res.status(500).json({
            messages: error.toString()
        })
    }
}

const getAllHobbyByKeyWord = async (req, res) =>{
    try{
        const keyWord = req.params.keyWord;
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;
        const hobbies = await HobbyService.getAllHobbyByKeyWord(limit, offset, keyWord);
        return res.status(200).json({
            message: "get posts success",
            data: hobbies
        })
    }catch (error) {
        res.status(500).json({
            messages: error.toString()
        })
    }
}

export default{
    getAllHobby,
    getAllHobbyByKeyWord,
}