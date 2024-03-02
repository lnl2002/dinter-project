import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { getAccessToken } from '../../common/Token';
import { formatDistanceToNow } from 'date-fns';


function LeftBarHomePage(props) {
    const nav = useNavigate();

    const { user, socket, setSocket } = useContext(AuthContext);

    const [activeNavItem, setActiveNavItem] = useState("home");
    const [showNoti, setShowNoti] = useState(false);
    const [listNoti, setListNoti] = useState([]);
    const [numberNoti, setNumberNoti] = useState(0);
    const navRef = useRef();
 
    //getNotifications
    useEffect(() => {
        if(socket === null) return;

        socket.on("getNotification", (res) => {
            console.log("getnotification", res);

            setListNoti([...listNoti, res]);
            setNumberNoti(++numberNoti);

            
        })

        return () => {
            socket.off("getnotification");
        }
    }, [socket, user])

    const handleNavItemClick = (navItem) => {
        setActiveNavItem(navItem);
        if (navItem === 'notification') {
            setShowNoti(true);
        } else {
            setShowNoti(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                // Đóng modal khi click outside
                setShowNoti(false);
                setActiveNavItem("");
            }
        };

        // Đăng ký sự kiện click
        document.addEventListener('click', handleClickOutside);

        // Hủy đăng ký sự kiện khi component bị unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [navRef, showNoti]);

    useEffect(() => {
        if (showNoti) {
            axios.get(`http://localhost:3008/api/v1/notification/${user.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    token: 'Bearer ' + getAccessToken()
                }
            })
                .then(res => {
                    setListNoti(res.data.data);
                    setNumberNoti(res.data.numberNotRead);
                    console.log('notification', res.data);
                })
                .catch(err => console.log(err));
        }

    }, [user, showNoti])

    // set notification status read
    const handleNotificationIsRead = (id, link, isRead) => {
        if(!isRead) {
            axios.post(`http://localhost:3008/api/v1/notification/update-notification-status/${id}`,
            JSON.stringify({
                isRead: true
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    token: 'Bearer ' + getAccessToken()
                }
            })
            .then(res => nav('/login'))
            .catch(err => console.log(err));
        }
    }

    // setnumbernoti when render
    useEffect(() => {
        axios.get(`http://localhost:3008/api/v1/notification/${user.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    token: 'Bearer ' + getAccessToken()
                }
            })
                .then(res => {
                    setNumberNoti(res.data.numberNotRead);
                    console.log('notification2', res.data);
                })
                .catch(err => console.log(err));
    }, [])

    return (
        <div
            className="bg-white circle"
            style={{ marginTop: "30px", fontSize: "18px" }}
            ref={navRef}
        >
            <div
                className={`d-flex align-items-center cursor-pointer navbar-item ${activeNavItem === "home" ? "nav-active" : ""}`}
                style={{ padding: "30px 35px" }}
                onClick={() => handleNavItemClick("home")}
            >
                <ion-icon name="home-outline"></ion-icon>
                <span style={{ marginLeft: "20px", fontWeight: "700" }}>
                    Home
                </span>
            </div>
            <div
                className='position-relative'
                onClick={() => handleNavItemClick("notification")}
            >
                <div className={`d-flex align-items-center cursor-pointer navbar-item ${activeNavItem === "notification" ? "nav-active" : ""}`}
                    style={{ padding: "30px 35px" }}>
                    <div className={`position-relative ${setNumberNoti === 0 ? 'd-none' : ''}`}>
                        <ion-icon name="notifications-outline"></ion-icon>
                        <span
                            style={{
                                width: "20px",
                                height: "20px",
                                backgroundColor: "#fb4f4d",
                                color: "#fff",
                                padding: "3px",
                                borderRadius: "50%",
                                fontSize: "10px",
                                position: "absolute",
                                top: "-5px",
                                right: "-5px",
                                textAlign: "center",
                            }}>{numberNoti > 9 ? `9+` : numberNoti}</span>

                    </div>
                    <span style={{ marginLeft: "20px", fontWeight: "700" }}>
                        Notification
                    </span>
                </div>

                <div>
                    <div className='position-absolute notification-popup'
                        style={{
                            top: "0",
                            left: "105%",
                            width: "30rem",
                            background: "#fff",
                            borderRadius: "20px",
                            padding: "10px",
                        }}
                        hidden={!showNoti}
                    >
                        {
                            listNoti && listNoti.map(noti => {
                                return (
                                    <Row style={{ margin: "14px 0" }} className={`notification-popup-item d-flex align-items-center ${noti.isRead ? 'read' : ''}`}
                                        onClick={e => handleNotificationIsRead(noti._id, noti.link, noti.isRead)}>
                                        <Col md={2}>
                                            <div style={{
                                                width: "50px",
                                                height: "50px"
                                            }}>
                                                <img src={noti.sender.avatar} alt='avatar' width={"100%"}
                                                    style={{ borderRadius: "50%", overflow: "hidden" }} />
                                            </div>
                                        </Col>
                                        <Col md={9}>
                                            <div className=''>
                                                <strong>{noti.sender.username} </strong>
                                                <span>
                                                    {
                                                        noti.type
                                                    }
                                                </span>
                                            </div>
                                            <small>
                                                {
                                                    formatDistanceToNow(noti.createdAt, {
                                                        addSuffix: true,
                                                    })
                                                }
                                            </small>
                                        </Col>
                                        <Col md={1}>
                                            <div className={noti.isRead ? '' : 'not-read'}></div>
                                        </Col>
                                    </Row>

                                )
                            })
                        }


                    </div>
                </div>

            </div>
            <Link to={"/messages"} style={{ textDecoration: "none", color: "#000" }}>
                <div
                    className="d-flex align-items-center cursor-pointer navbar-item"
                    style={{ padding: "30px 35px" }}
                >
                    <div className='position-relative'>
                        <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                        <span
                            style={{
                                width: "20px",
                                height: "20px",
                                backgroundColor: "#fb4f4d",
                                color: "#fff",
                                padding: "3px",
                                borderRadius: "50%",
                                fontSize: "10px",
                                position: "absolute",
                                top: "-5px",
                                right: "-5px",
                                textAlign: "center",
                            }}>9+</span>

                    </div>
                    <span style={{ marginLeft: "20px", fontWeight: "700" }}>
                        Message
                    </span>

                </div>
            </Link>
            <div
                className="d-flex align-items-center cursor-pointer navbar-item"
                style={{ padding: "30px 35px" }}
            >
                <div className='position-relative'>
                    <ion-icon name="id-card-outline"></ion-icon>
                    <span
                        style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: "#fb4f4d",
                            color: "#fff",
                            padding: "3px",
                            borderRadius: "50%",
                            fontSize: "10px",
                            position: "absolute",
                            top: "-5px",
                            right: "-5px",
                            textAlign: "center",
                        }}>9+</span>

                </div>
                <span style={{ marginLeft: "20px", fontWeight: "700" }}>
                    Match
                </span>
            </div>
        </div>
    );
}

export default LeftBarHomePage;