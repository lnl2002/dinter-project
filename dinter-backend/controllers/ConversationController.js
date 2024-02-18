const Conversations = require('../models/Conversations');

//createChat
const createChat = async (req,res) => {
    const {firstId, secondId} = req.body;

    try {
        const chat = await Conversations.findOne({
            members: {$all: [firstId, secondId]}
        })

        if(chat) {
            return res.status(200).json(chat);
        }

        const newConversations = await Conversations.create({
            members: [firstId, secondId]
        })
        
        return res.status(201).json(newConversations);
        
    } catch (error) {
        res.status(500).json(error);
    }
};

//getUserChats
const findUserChats = async (req, res) => {
    const userId = req.params.userId ;
    console.log(userId);
    try {
        const chats = await Conversations.find({
            // members: {$elemMatch: {"_id": userId}}
            members: {$in: [userId]}
        }).populate('members', 'username avatar');
        console.log(chats);
        return res.status(200).json(chats);
    } catch (error) {
        res.status(500).json(error);
    }
};

//findChat
const findChat = async (req, res) => {
    const { firstId, secondId } = req.params;
    console.log(req.params);
    try {
        const chat = await Conversations.findOne({
            members: {$all: [firstId, secondId]}
        })
        return res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    createChat,
    findUserChats,
    findChat
}