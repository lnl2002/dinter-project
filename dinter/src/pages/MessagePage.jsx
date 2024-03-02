import React, { useContext, useEffect, useState } from 'react'
import HeaderHome from '../components/HeaderComponents/HeaderHome'
import MatchesPage from './MatchesPage';
import $ from 'jquery';
import './style/messages.css'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { getAccessToken } from '../common/Token';
import InputEmoji from 'react-input-emoji';
import { io } from "socket.io-client";

function MessagePage() {

    const { user, socket, setSocket, onlineUsers, setOnlineUsers } = useContext(AuthContext);

    const [options, setOptions] = useState(1);
    const [currentFriend, setCurrentFriend] = useState(0);
    const [viewInfo, setViewInfo] = useState(true);
    const [listConversation, setListConversation] = useState([]);
    const [currentConversationId, setCurrentConversationId] = useState(null);
    const [currentConversation, setCurrentConversation] = useState({});
    const [recipientUser, setRecipientUser] = useState({});
    const [textMessage, setTextMessage] = useState("");
    const [newMessage, setNewMessage] = useState("");
    

     // send message
     useEffect(() => {
        if(socket === null) return;

        socket.emit("sendMessage", {...newMessage, recipientId: recipientUser._id })
    },[newMessage])

    // receive Message
    useEffect(() => {
        if(socket === null) return;

        socket.on("getMessage", (res) => {
            console.log("getMessage",res);
            if(currentConversationId != res.conversationId) return;

            setCurrentConversation([ res, ...currentConversation]);
        })

        return () => {
            socket.off("getMessage");
        }
    },[socket, currentConversation])

    const handleChooseOption = (option) => {
        setOptions(option);
    }
    const handleSetCurFri = (cf, conversationId) => {
        setCurrentFriend(cf);
        setTextMessage("");
        setCurrentConversationId(conversationId);
        console.log(conversationId);

        let temp = listConversation.find(conversation => conversation.conversationId == conversationId);
        setRecipientUser(temp.info);
    }
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const sendMessage = () => {
        if(textMessage != "" || textMessage != null) {
            console.log(currentConversationId, user.id, textMessage);
            axios.post(
                `http://localhost:3008/api/v1/message/create-message`, 
                JSON.stringify({
                    conversationId: currentConversationId,
                    senderId: user.id,
                    text: textMessage
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        token: 'Bearer ' + getAccessToken()
                    }
                }
            )
                .then(response => {
                    setNewMessage(response.data);
                    setCurrentConversation([ response.data, ...currentConversation]);
                    setTextMessage("");
                })
                .catch(error => console.log(error));
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:3008/api/v1/conversation/find-user-chats/${user.id}`, {
            headers: {
                token: 'Bearer ' + getAccessToken()
            }
        })
            .then(response => {
                const conversations = response.data;
                var conversationList = [];
                let i = 0;
                conversations.forEach(conversation => {
                    let conversationTemp = {};
                    conversationTemp.number = i++;
                    conversationTemp.info = conversation.members.find( member => member._id != user.id )
                    conversationTemp.updatedAt = conversation.updatedAt;
                    conversationTemp.conversationId = conversation._id;
                    conversationList.push(conversationTemp);
                });
                conversationList.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
                setListConversation(conversationList);
            })
            .catch(error => console.log(error));
    },[])

    useEffect(() => {
        console.log(currentConversationId);
        axios.get(`http://localhost:3008/api/v1/message/get-messages/${currentConversationId}`, {
            headers: {
                token: 'Bearer ' + getAccessToken()
            }
        })
            .then(response => {
                console.log('currentConversation2', response.data);
                setCurrentConversation(response.data);
            })
            .catch(error => console.log(error));
    }, [currentConversationId])
    return (
        <div>
            <HeaderHome />
            <div className='container-fluid' style={{ paddingTop: "68px", backgroundColor: "white" }}>
                <div className='row'>
                    <div className='col-3' style={{ padding: "0" }}>
                        <div id='mp-mes-header'>
                            <input type="text" class="form-control" placeholder="Search Messages" />
                        </div>
                        <div className='mp-nav'>
                            <div className={options === 1 ? 'active' : ''} onClick={() => handleChooseOption(1)}><span>Matches</span></div>
                            <div className={options === 2 ? 'active' : ''} onClick={() => handleChooseOption(2)}><span>Messages</span></div>
                        </div>
                        <div className='mp-user-list'>
                            {
                                listConversation.map(conversation => (
                                    <div className={`${currentFriend === conversation.number && 'mg-active'} mp-user`} onClick={() => handleSetCurFri(conversation.number, conversation.conversationId)}
                                        >
                                        <div className='mp-avartar'>
                                            <div style={{position: "relative"}}>
                                                <img src={conversation.info.avatar} alt='error-img' />
                                                {
                                                    onlineUsers.some((u) => u?.userId == conversation.info._id ) ?
                                                    (
                                                        <div 
                                                            style={{
                                                                width: "8px",
                                                                height: "8px",
                                                                background: "#00FF00",
                                                                borderRadius: "99px",
                                                                position: "absolute",
                                                                right: "54px",
                                                                bottom: "0",
                                                            }}>
                                                        </div>
                                                    ) : 
                                                    (<></>)
                                                }
                                                
                                            </div>
                                        </div>
                                        <div className='mp-info'>
                                            <p>{conversation.info.username}</p>
                                            <p>Lo</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {
                        options === 2 && (
                            <>
                                <div className={`${viewInfo === true ? 'col-6' : 'col-9'} zoom mg-box-chat`}>
                                    <div className='mg-boxchat-header'>
                                        <div className='mg-user-info'>
                                            <div className='mg-avatar-boxchat'>
                                                <img src={recipientUser.avatar} alt='error-img' />
                                            </div>
                                            <div>
                                                <p>{recipientUser.username}</p>
                                                <p>Đang hoạt động</p>
                                            </div>
                                        </div>
                                        <div className='boxchat-option'>
                                            <ion-icon name="call" className="bc-option"></ion-icon>
                                            <ion-icon name="videocam" className="bc-option"></ion-icon>
                                            <ion-icon name="alert-circle" onClick={() => setViewInfo(!viewInfo)}></ion-icon>
                                        </div>
                                    </div>
                                    <div className="chat-messages" id='chat-box'>
                                        {
                                            currentConversation && currentConversation.map((message, index) => {
                                                if(message.senderId == user.id) {
                                                    return (
                                                        <div className="message my-message">
                                                            <div className="message-text">{message.text}</div>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div className='other-messages-container'>
                                                            <img src='images/common/avatar.png' alt='error' />
                                                            <div className="message other-message">
                                                                <div className="message-text">{message.text}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        
                                    </div>
                                    <div className='send-messages'>
                                        <div className='chat-feature'>
                                            <div><ion-icon name="images"></ion-icon></div>
                                            <div><ion-icon name="images-outline"></ion-icon></div>
                                            <div><ion-icon name="images-outline"></ion-icon></div>
                                        </div>
                                        <div className='w-100'>
                                            <InputEmoji 
                                                value={textMessage} 
                                                onChange={setTextMessage} 
                                                fontFamily='nunito' 
                                                borderColor='rgba(72, 112, 223, 0.2)'
                                                onKeyDown={handleKeyPress}
                                                />
                                        </div>
                                    </div>
                                </div>
                                {
                                    viewInfo === true && (
                                        <div className='col-3' style={{ padding: "0px" }}>
                                            <div className='mp-anh-bia'>
                                                <img src='images/common/anhbia.jpg' alt='error' />
                                            </div>

                                            <div className='mp-c3-user-info'>
                                                <p>Ha Trang</p>
                                                <p><ion-icon name="home-outline"></ion-icon> Live in Hanoi</p>
                                                <p><ion-icon name="person-outline"></ion-icon> Woman</p>
                                                <p><ion-icon name="trail-sign-outline"></ion-icon> 32 kilometers away</p>

                                            </div>
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                    {
                        options === 1 && (
                            <MatchesPage/>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default MessagePage
