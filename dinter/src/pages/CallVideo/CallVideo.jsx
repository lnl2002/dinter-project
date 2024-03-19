import React, { useRef, useEffect, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Peer } from 'peerjs'
import { Spinner } from 'react-bootstrap';
import './style.css'
import Lottie from 'react-lottie';
import * as endCall from '../../utils/lottie/endCall.json'


function CallVideo(props) {
    const myVideoRef = useRef();
    const friendVideoRef = useRef();

    const endCallRef = useRef();

    const [isEndCall, setIsEndCall] = useState(false);
    const peerConnections = {};
    var peer = new Peer({
        port: 3008,
        host: 'localhost',
        path: '/peerjs'
    });
    const [myVideoStream, setMyVideoStream] = useState(null);
    const [myId, setMyId] = useState(null);
    const [newUserJoined, setNewUserJoined] = useState(null);
    const [answerUser, setAnswerUser] = useState(false);
    const [count, setCount] = useState(5);
    const [startCountdown, setStartCountdown] = useState(false);

    const { roomId } = useParams();
    const { socket } = useContext(AuthContext);
    const nav = useNavigate();

    useEffect(() => {
        let timer;
        if (startCountdown && count > 0) {
            timer = setTimeout(() => {
                setCount(count - 1);
            }, 1000);
        } else if (count === 0) {
            // Reset countdown when it reaches 0
            setCount(5);
            setStartCountdown(false);
        }

        return () => clearTimeout(timer);
    }, [count, startCountdown]);

    useEffect(() => {

        try {
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            }).then((stream) => {
                if (!myVideoRef.current) return;

                setMyVideoStream(stream);
                myVideoRef.current.srcObject = stream;
                peer.on('call', call => {
                    setAnswerUser(true);
                    call.answer(stream);

                    call.on('stream', userStream => {
                        friendVideoRef.current.srcObject = userStream;
                        friendVideoRef.current.autoplay = true;
                    })
                    call.on('error', (err) => {
                        alert(err);
                    })

                    call.on("close", () => {
                        console.log(friendVideoRef.current);
                    })

                    peerConnections[call.peer] = call;
                })
            }).catch(err => {
                alert(err.message)
            })

        } catch (error) {
            console.error('Error accessing user media:', error);
        }


    }, [socket, roomId, myVideoRef]);

    useEffect(() => {
        if (socket === null) return;
        socket.on('userJoined', (id) => {
            if (myVideoStream) {
                setTimeout(() => {
                    setNewUserJoined(id);
                    const call = peer.call(id, myVideoStream);
                    const vid = friendVideoRef.current;
                    if (call) {
                        call.on('error', (err) => {
                            alert(err);
                        })
                        call.on('stream', userStream => {
                            vid.srcObject = userStream;
                        })
                        call.on('close', () => {
                            console.log("user disconect")
                        })
                        peerConnections[id] = call;
                    }
                }, 1000)
            }
        })
    }, [socket, myVideoStream, roomId])

    useEffect(() => {
        if (socket === null) return;
        peer.on('open', (id) => {
            setMyId(id);
            socket.emit("newUser", { id, roomId });
        })

        peer.on('error', (err) => {
            alert(err.type);
        });

    }, [socket])





    useEffect(() => {
        if (socket === null) return;
        socket.on('userDisconnect', id => {
            if (peerConnections[id]) {
                peerConnections[id].close();
            }
        })
    }, [socket, roomId])

    //send end call video
    const handleCloseCall = () => {
        if (socket === null) return;
        socket.emit('endCallVideo', {
            id: myId,
            roomId
        })
    }

    //close call
    useEffect(() => {
        if (socket === null) return;
        socket.on('closeCall', (id) => {
            // Lấy tất cả các track đang hoạt động
            if (myVideoStream) {
                const tracks = myVideoStream.getTracks();

                tracks.forEach(track => {
                    track.stop();
                });

                setMyVideoStream(null);
                setAnswerUser(false);

                myVideoRef.current.style.display = 'none';
                friendVideoRef.current.style.display = 'none';
                endCallRef.current.style.display = 'none';
                setIsEndCall(true);
                setStartCountdown(true);

                setTimeout(() => {
                    window.location.href = '/messages';
                }, 5000);
            }
        })
    }, [socket, myVideoStream, roomId])



    return (
        <div className='position-relative'>
            <div>
                <div
                    style={{
                        width: '100%',
                        height: '100vh',
                        background: 'black',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                    <video height={"100%"} ref={friendVideoRef} autoPlay playsInline />

                    {
                        answerUser || newUserJoined ? (
                            <div style={{
                                display: 'flex',
                                padding: '10px',
                                background: '#ff443d',
                                alignItems: 'center',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                color: 'white',
                                position: 'absolute',
                                cursor: 'pointer',
                                bottom: '5px',
                                opacity: 0.3
                            }}
                                className='close-call-video'
                                onClick={handleCloseCall}
                                ref={endCallRef}
                            >
                                <ion-icon style={{ fontSize: '30px' }} name="close-outline"></ion-icon>
                            </div>
                        ) : (
                            <div style={{
                                position: 'absolute',
                                top: '50vh',
                                left: '100vh',
                                textAlign: 'center',
                                color: 'white',
                            }}>
                                <Spinner animation='border' />
                                <div>
                                    Connecting
                                </div>
                            </div>
                        )
                    }
                </div>

                <video width={'100%'} height={'100%'} ref={myVideoRef} autoPlay playsInline
                    style={{
                        background: 'white',
                        width: '30vh',
                        height: '20vh',
                        bottom: '0',
                        right: '0',
                        borderRadius: '10px',
                        marginBottom: '10px',
                        position: 'absolute'
                    }}
                    muted
                />
            </div>

            <div hidden={!isEndCall} style={{
                position: 'absolute',
                top: '20%',
                left: '40%'
            }}>
                <Lottie options={
                    {
                        loop: true,
                        autoplay: true,
                        animationData: endCall,
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice'
                        }
                    }
                }
                    isClickToPauseDisabled="false"
                    height={400}
                    width={400}

                />
                {
                    startCountdown && (
                        <h3 style={{ color: 'white', marginTop: '20px' }}>End call. Dinter will redirect in {count}s</h3>
                    )
                }
            </div>

        </div>
    );
}

export default CallVideo;
