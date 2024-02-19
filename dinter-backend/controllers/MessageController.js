import message from '../models/Message.js';


//create a new message
const createMessage = async (req, res) => {
    const {conversationId, senderId, text} = req.body;

    console.log(conversationId, senderId, text);
    if(!conversationId || !senderId || !text) {
        return res.status(500).json({
            message: "ERROR"
        });
    }
        
    try {
        const newMessage = await message.create({
            conversationId, 
            senderId, 
            text
        })
        return res.status(200).json(newMessage);
    } catch (error) {
        res.status(500).json(error);
    }
};

//getMessagess
const getMessages = async (req, res) => {
    const {conversationId} = req.params;
    console.log(conversationId);
    try {
        const messages = await message.find({
            conversationId: conversationId
        }).sort({createdAt: -1});
        return res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
    }
};

export {
    createMessage,
    getMessages
}

export default{
    createMessage,
    getMessages
}