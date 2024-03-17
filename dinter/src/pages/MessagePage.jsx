import React, { useContext, useEffect, useRef, useState } from 'react'
import HeaderHome from '../components/HeaderComponents/HeaderHome'
import MatchesPage from './MatchesPage';
import './style/messages.css'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { getAccessToken } from '../common/Token';
import InputEmoji from 'react-input-emoji';
import api from '../utils/services';
import { Col, Row, Spinner } from 'react-bootstrap';
import EmptyConversation from '../components/EmptyConversation/EmptyConversation';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function MessagePage() {

    const { socket, setSocket, onlineUsers, setOnlineUsers } = useContext(AuthContext);

    const user = JSON.parse(localStorage.getItem('User'));

    const [options, setOptions] = useState(1);
    const [currentFriend, setCurrentFriend] = useState(null);
    const [viewInfo, setViewInfo] = useState(true);
    const [listConversation, setListConversation] = useState([]);
    const [currentConversationId, setCurrentConversationId] = useState(null);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [recipientUser, setRecipientUser] = useState({});
    const [textMessage, setTextMessage] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [isScrolling, setIsScrolling] = useState(false);

    const messageContainerRef = useRef();
    const [showLoadMessage, setShowLoadMessage] = useState(false);
    const [skipMessage, setSkipMessage] = useState(0);

    const nav = useNavigate();

    // send message
    useEffect(() => {
        if (socket === null) return;

        socket.emit("sendMessage", { ...newMessage, recipientId: recipientUser._id })
    }, [newMessage])

    // receive Message
    useEffect(() => {
        if (socket === null) return;

        socket.on("getMessage", (res) => {
            console.log("getMessage", res);
            updateUpdatedAtConversations(listConversation, res.conversationId, res.createdAt, {
                message: res.text,
                senderId: res.senderId
            });
            updateNotRead(res.conversationId, res.recipientId);
            if (currentConversationId == res.conversationId) {
                setCurrentConversation([res, ...currentConversation]);
            }


        })

        return () => {
            socket.off("getMessage");
        }
    }, [socket, currentConversation])

    const handleChooseOption = (option) => {
        setOptions(option);
    }
    const handleSetCurFri = (cf, conversationId) => {
        setCurrentFriend(cf);
        setTextMessage("");
        setCurrentConversationId(conversationId);
        updateRead(conversationId, user.id);
        console.log(conversationId);

        let temp = listConversation.find(conversation => conversation.conversationId == conversationId);
        setRecipientUser(temp.info);
    }
    const handleFocusInputMessage = () => {
        updateRead(currentConversationId, user.id);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const sendMessage = () => {
        if (textMessage != "" || textMessage != null) {
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
                    updateUpdatedAtConversations(listConversation, response.data.conversationId, new Date(), {
                        message: response.data.text,
                        senderId: user.id
                    });
                    setNewMessage(response.data);
                    setCurrentConversation([response.data, ...currentConversation]);
                    setTextMessage("");
                })
                .catch(error => console.log(error));
        }
    }

    useEffect(() => {
        api.get(`/conversation/find-user-chats/${user.id}`)
            .then(response => {
                const conversations = response.data;
                console.log('conversations', conversations);
                var conversationList = [];
                let i = 0;
                conversations.forEach(conversation => {
                    let conversationTemp = {};
                    conversationTemp.number = i++;
                    conversationTemp.info = conversation.members.find(member => member._id != user.id)
                    conversationTemp.updatedAt = conversation.updatedAt;
                    conversationTemp.conversationId = conversation._id;
                    conversationTemp.isRead = conversation.isRead;
                    conversationTemp.previewMessage = conversation.newMessage;
                    conversationList.push(conversationTemp);
                });
                conversationList.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                setListConversation(conversationList);
            })
            .catch(error => console.log(error));
    }, [])

    // load messages of conversation
    useEffect(() => {
        console.log(currentConversationId);
        api.get(`/message/get-messages/${currentConversationId}?limit=${30}&skip=${0}`)
            .then(response => {
                console.log('currentConversation2', response.data);
                setCurrentConversation(response.data);
                setSkipMessage(response.data.length);
                setOptions(2);
            })
            .catch(error => console.log(error));
    }, [currentConversationId])

    // scroll on top -> load more messages
    var handleLoadMoreMessages = async (e) => {
        try {
            const chatContainer = e.target; // Lấy đối tượng đoạn chat từ sự kiện

            const scrollRatio = chatContainer.scrollTop / (chatContainer.scrollHeight - chatContainer.clientHeight);
            // Kiểm tra xem đã đến đầu trang hay chưa (đang lăn lên và ở đầu trang)
            if (!isScrolling && scrollRatio === -1) {
                setIsScrolling(true);

                setShowLoadMessage(true); //Loading

                await loadMoreMessages(skipMessage);

                setShowLoadMessage(false); // Off loading

                setIsScrolling(false);
            }


        } catch (error) {
            console.error('Error handling load more messages:', error);
        }

    }

    const loadMoreMessages = async (skip) => {
        if (skipMessage !== -1) {
            await api.get(`/message/get-messages/${currentConversationId}?limit=${30}&skip=${skip}`)
                .then(response => {

                    console.log('skip', skip);
                    console.log('currentConversation3', response.data.length);
                    if (response.data.length === 0) {
                        setSkipMessage(-1); // loaded all messages
                    } else {
                        setCurrentConversation(prev => [...prev, ...response.data]);
                        setSkipMessage(skipMessage + response.data.length);
                    }
                })
                .catch(error => console.log(error));
        }

    }

    const updateUpdatedAtConversations = (listConversation, conversationId, updatedAt, newMessage) => {
        let tempList = listConversation;
        console.log('test', conversationId, updatedAt, newMessage);
        console.log('phai duoc ', listConversation);
        tempList.forEach(conversation => {
            if (conversation.conversationId == conversationId) {
                conversation.updatedAt = updatedAt;
                conversation.previewMessage = newMessage;
                return;
            }
        });

        if (listConversation) {
            let temp = tempList.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            setListConversation(temp);
        }


    }

    // const sortConversations = (conversations) => {
    //     conversations.sort()
    // }

    const updateRead = (conversationId, readerId) => {
        api.post('/conversation/update-read', {
            conversationId,
            userId: readerId
        })
            .then(res => {
                console.log('res', res);
                let tempList = listConversation;
                tempList.forEach(conversation => {
                    if (conversation.conversationId === conversationId) {
                        conversation.isRead.push(readerId);
                    }
                })
                setListConversation(tempList);
            })
            .catch(err => console.log('updateReadErr', err));
    }
    const updateNotRead = async (conversationId, unReaderId) => {
        let tempList = listConversation;
        tempList.forEach(conversation => {
            if (conversation.conversationId === conversationId) {
                let newList = conversation.isRead.filter(id => id !== unReaderId);
                conversation.isRead = newList;
            }
        })
        setListConversation(tempList);
    }

    const handleCallVideo = () => {
        var uuid = uuidv4();
        sendRoomId(uuid);
        nav(`/call-video/${uuid}`)
    }

    const sendRoomId = (uuid) => {
        socket.emit('sendRoomId', {
            uuid,
            receiverId: recipientUser._id,
            user
        })
    }

    console.log('currentConversation', currentConversation);
    console.log('recipientUser', recipientUser);
    console.log('listConversation', listConversation);
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
                        <div className='mp-user-list container'>
                            {
                                listConversation && listConversation.map((conversation, index) => (
                                    <Row
                                        className={`${currentFriend === conversation.number && 'mg-active'} mp-user`}
                                        onClick={() => handleSetCurFri(conversation.number, conversation.conversationId)}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        key={index}
                                    >
                                        <Col md={2} className='mp-avartar'>
                                            <div style={{ position: "relative" }}>
                                                <img src={conversation.info.avatar} alt='error-img' />
                                                {
                                                    onlineUsers.some((u) => u?.userId == conversation.info._id) ?
                                                        (
                                                            <div
                                                                style={{
                                                                    width: "15px",
                                                                    height: "15px",
                                                                    background: "#00FF00",
                                                                    borderRadius: "99px",
                                                                    position: "absolute",
                                                                    right: "-8px",
                                                                    bottom: "0",
                                                                }}>
                                                            </div>
                                                        ) :
                                                        (<></>)
                                                }

                                            </div>
                                        </Col>
                                        <Col md={8} className='mp-info'>
                                            <p>{conversation.info.username}</p>
                                            <p className={conversation.isRead.includes(user.id) ? '' : 'message-not-read'}
                                                style={{ fontSize: '14px' }}>
                                                {
                                                    conversation.previewMessage && conversation.previewMessage.message ?
                                                        (
                                                            conversation.previewMessage.senderId === user.id ? `You: ${conversation.previewMessage.message}` : conversation.previewMessage.message
                                                        )
                                                        :
                                                        ''
                                                }
                                            </p>
                                        </Col>
                                        <Col md={1}>
                                            {
                                                conversation.isRead.includes(user.id) ? '' : (<div className='not-read'></div>)
                                            }
                                        </Col>
                                    </Row>
                                ))
                            }
                        </div>
                    </div>
                    {
                        options === 2 && currentConversation && (
                            <>
                                <div className={`${viewInfo === true ? 'col-6' : 'col-9'} zoom mg-box-chat`}>
                                    <div className='mg-boxchat-header'>
                                        <div className='mg-user-info'>
                                            <div className='mg-avatar-boxchat avatar'>
                                                <img src={recipientUser.avatar} alt='error-img' />
                                            </div>
                                            <div>
                                                <p>{recipientUser.username}</p>
                                                <p className='d-flex justify-content-start align-items-center'>
                                                    {
                                                        onlineUsers.some((u) => u?.userId == recipientUser._id) ?
                                                            (
                                                                <>
                                                                    Online
                                                                    <div
                                                                        style={{
                                                                            width: "8px",
                                                                            height: "8px",
                                                                            background: "#00FF00",
                                                                            borderRadius: "50%",
                                                                        }}>
                                                                    </div>
                                                                </>
                                                            ) :
                                                            (
                                                                <>
                                                                    Offline
                                                                    <div
                                                                        style={{
                                                                            width: "8px",
                                                                            height: "8px",
                                                                            background: "#808080",
                                                                            borderRadius: "50%",

                                                                        }}>
                                                                    </div>
                                                                </>
                                                            )
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className='boxchat-option'>
                                            <ion-icon name="call" className="bc-option"></ion-icon>
                                            <ion-icon name="videocam" className="bc-option" onClick={handleCallVideo} ></ion-icon>
                                            <ion-icon name="alert-circle" onClick={() => setViewInfo(!viewInfo)}></ion-icon>
                                        </div>
                                    </div>
                                    <div className="chat-messages" id='chat-box' ref={messageContainerRef} onScroll={e => handleLoadMoreMessages(e)}>
                                        {
                                            currentConversation && currentConversation.map((message, index) => {
                                                if (message.senderId == user.id) {
                                                    return (
                                                        <div className="message my-message" key={index}>
                                                            <div className="message-text">{message.text}</div>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div className='other-messages-container' key={index}>
                                                            <img src='images/common/avatar.png' alt='error' />
                                                            <div className="message other-message">
                                                                <div className="message-text">{message.text}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        <div style={{ textAlign: 'center' }} hidden={!showLoadMessage} >
                                            <Spinner animation="grow" style={{ background: 'linear-gradient(30deg, #fd297b , #ff655b)' }} />
                                        </div>

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
                                                onFocus={() => handleFocusInputMessage()}
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
                    {/* EMPTY PAGE */}
                    {
                        options === 2 && !currentConversation && (
                            <EmptyConversation />
                        )
                    }
                    {
                        options === 1 && (
                            <MatchesPage />
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default MessagePage
