import React, { useRef, useEffect, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Peer } from "https://esm.sh/peerjs@1.5.2?bundle-deps"
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
    const peer = new Peer();
    const [myVideoStream, setMyVideoStream] = useState(null);
    const [myId, setMyId] = useState(null);
    const [newUserJoined, setNewUserJoined] = useState(null);
    const [answerUser, setAnswerUser] = useState(false);
    const [count, setCount] = useState(5);
    const [startCountdown, setStartCountdown] = useState(false);

    const { roomId } = useParams();
    const { socket } = useContext(AuthContext);
    const nav = useNavigate();
    console.log('roomId', roomId);

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
                        console.log('errr1', err);
                        alert(err);
                    })

                    call.on("close", () => {
                        console.log(friendVideoRef.current);
                    })

                    console.log('call.peer', call.peer);
                    console.log('call1', call);
                    peerConnections[call.peer] = call;
                    console.log('peerConnections', peerConnections);
                })
            }).catch(err => {
                console.log('errr2', err);
                alert(err.message)
            })

            peer.on('open', (id) => {
                setMyId(id);
                console.log('test', id, roomId);
                socket.emit("newUser", { id, roomId });
            })

            peer.on('error', (err) => {
                console.log('errr3', err);
                alert(err);
            });


        } catch (error) {
            console.error('Error accessing user media:', error);
        }


    }, [socket, roomId]);


    useEffect(() => {
        socket.on('userJoined', (id) => {
            setNewUserJoined(id);
            const call = peer.call(id, myVideoStream);
            const vid = friendVideoRef.current;
            console.log('callerr', call);
            if (call) {
                call.on('error', (err) => {
                    console.log('errr4', err);
                    alert(err);
                })
                call.on('stream', userStream => {
                    console.log('stream', userStream);
                    vid.srcObject = userStream;
                })
                call.on('close', () => {
                    console.log("user disconect")
                })
                peerConnections[id] = call;
            }

        })
    }, [socket, myVideoStream, roomId])

    useEffect(() => {
        socket.on('userDisconnect', id => {
            console.log('userDisconnect1', id);
            if (peerConnections[id]) {
                peerConnections[id].close();
            }
        })
    }, [socket, roomId])

    //send end call video
    const handleCloseCall = () => {
        socket.emit('endCallVideo', {
            id: myId,
            roomId
        })
    }

    //close call
    useEffect(() => {
        socket.on('closeCall', (id) => {
            // Lấy tất cả các track đang hoạt động
            if (myVideoStream) {
                console.log('myVideoStream', myVideoStream);
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


    console.log('peerConnections', peerConnections);

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
                        <h3 style={{color: 'white', marginTop: '20px'}}>End call. Dinter will redirect in {count}s</h3>
                    )
                }
            </div>

        </div>
    );
}

export default CallVideo;
