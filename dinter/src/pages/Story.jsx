import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Nav, Row } from 'react-bootstrap'
import './style/story.css'
import StoryCreation from './StoryCreation';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Story() {
    const nav = useNavigate();
    const { storyId } = useParams();
    const video = useRef();
    const [videoState, setVideoState] = useState(true);
    const [audioState, setAudioState] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(0);
    const [story, setStory] = useState([]);
    const [currentUser, setCurrentUser] = useState(0);
    const [start, setStart] = useState(true);
    const [create, setCreate] = useState(false);
    const [myStory, setMyStory] = useState();
    const videoBox = useRef();
    const videoContainer = useRef();
    const [viewed, setViewed] = useState([]);
    useEffect(() => {
        handleGetStory();
    }, [])
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    const handleGetStory = async () => {
        try {
            const data = await axios.get(`http://localhost:3008/api/v1/story`, {
                headers: {
                    "Token": `Bearer ${getCookie('access_token')}`
                }
            });
            const uwArr = [];
            const wArr = [];
            const userId = JSON.parse(localStorage.getItem("User")).id;

            const userStory = data.data.data.filter((d) => {
                return d.userId !== JSON.parse(localStorage.getItem('User')).id;
            })

            console.log(data.data.data);
            const myStr = data.data.data.find((d) => {
                return d.userId === JSON.parse(localStorage.getItem('User')).id;
            })
            console.log(myStr);
            if (myStr && myStr.userId === storyId) {
                console.log('vaoday');
                setCurrentUser(-1);
                setMyStory(myStr);
            } else if (myStr && myStr.userId !== storyId) {
                setMyStory(myStr)
            }
            userStory.forEach((user) => {
                let watched = true;
                user.stories.forEach((str) => {
                    if (!str.viewed.includes(userId)) {
                        watched = false;
                    }
                })
                if (watched) wArr.push(user);
                else uwArr.push(user);
            })
            const firstUser = userStory.find((e) => {
                return e.userId === storyId
            })
            const str = [...uwArr.filter((u) => {
                return u.userId !== storyId;
            })];
            str.push(...wArr.filter((u) => {
                return u.userId !== storyId;
            }));
            if (firstUser)
                str.unshift(firstUser);
            setStory(str);
        } catch (error) {
            console.log(error);
        }
    }
    const handleSetVideo = (state) => {
        if (state) {
            video.current.play();
        } else {
            video.current.pause();
        }
        setVideoState(state);
    }
    const handleSetAudio = (state) => {
        if (state) {
            video.current.muted = false;
        } else {
            video.current.muted = true;
        }
        setAudioState(state);
    }
    useEffect(() => {
        console.log('nhayvaoday');
        console.log(video);
        console.log(currentUser);
        console.log(currentVideo);
        if (story.length !== 0) {
            if (currentUser === -1) {
                console.log('nhayvaoday');
                video.current.load();
                video.current.play();
            }
            else if (currentVideo < story[currentUser].stories.length) {
                if (!story[currentUser].stories[currentVideo].viewed.includes(JSON.parse(localStorage.getItem("User")).id)) {
                    viewedVideo();
                }
                video.current.load();
                video.current.play();
            }
        } else if (myStory) {
            video.current.load();
            video.current.play();
        }
    }, [currentVideo, currentUser])


    const handleChangeStory = (num) => {
        if (num < currentVideo) {
            if (num < 0) {
                if (currentUser === 0 && myStory) {
                    setCurrentUser(-1);
                    setCurrentVideo(myStory.stories.length - 1);
                } else if (currentUser !== -1 && myStory) {
                    setCurrentUser(currentUser - 1);
                    setCurrentVideo(story[currentUser - 1].stories.length - 1);
                }
            } else {
                setCurrentVideo(num);
            }
        }
        else if (num > currentVideo) {
            console.log('THHHs');
            if (currentUser === -1) {
                console.log('THHH1');
                if (num < myStory.stories.length) {
                    setCurrentVideo(num)
                }
                else {
                    if (story.length !== 0) {
                        console.log('TH');
                        setCurrentUser(0);
                        setCurrentVideo(0);
                    }

                }
            } else {
                if (num < story[currentUser].stories.length) {
                    console.log('TH2');
                    setCurrentVideo(num)
                }
                else {
                    if (currentUser < story.length - 1) {
                        setCurrentUser(currentUser + 1);
                        setCurrentVideo(0);
                    }
                }
            }
        }
    }

    const viewedVideo = async () => {
        try {
            await axios.post("http://localhost:3008/api/v1/story/video", {
                storyId: story[currentUser].stories[currentVideo]._id
            }, {
                headers: {
                    "Token": `Bearer ${getCookie('access_token')}`
                }
            })
            const arr = [...story];
            arr[currentUser].stories[0].viewed.push(JSON.parse(localStorage.getItem("User")).id);
            setStory(arr);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChangeUser = (index) => {
        if (index === -1 && myStory) {
            setCurrentUser(index);
            setCurrentVideo(0);
            setVideoState(true);
        } else if (index !== -1) {
            setCurrentUser(index);
            setCurrentVideo(0);
            setVideoState(true);
        }

    }

    const handleFavorite = async (e) => {
        var icon = document.createElement('ion-icon');
        icon.setAttribute('name', 'heart');
        icon.classList.add('favorite-story');
        icon.classList.add('favorite-story-opacity');
        icon.style.position = 'absolute';
        icon.style.left = e.clientX + 'px';
        icon.style.top = e.clientY + 'px';
        document.body.appendChild(icon);
        const removeChild = setInterval(() => {
            document.body.removeChild(icon);
            clearInterval(removeChild);
        }, 500);
        try {
            if (currentUser !== -1 &&
                !story[currentUser].stories[currentVideo].liked.includes(JSON.parse(localStorage.getItem("User")).id)) {
                await axios.post("http://localhost:3008/api/v1/story/like", {
                    storyId: story[currentUser].stories[currentVideo]._id
                }, {
                    headers: {
                        "Token": `Bearer ${getCookie('access_token')}`
                    }
                })
                const arr = [...story];
                arr[currentUser].stories[currentVideo].liked.push(JSON.parse(localStorage.getItem("User")).id);
                setStory(arr);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     console.log('vaoday');
    //     if (viewed && videoContainer)
    // }, [viewed])
    const handleOpenViewed = async (e) => {
        try {
            const viewed = await axios.get('http://localhost:3008/api/v1/story/viewed/' + myStory.stories[currentVideo]._id, {
                headers: {
                    "Token": `Bearer ${getCookie('access_token')}`
                }
            }
            );
            console.log(viewed.data);
            setViewed(viewed.data.data)
            videoContainer.current.style.display = 'block';

        } catch (error) {
            console.log(error);
        }
    }

    const handleCloseView = (e) => {
        e.stopPropagation();
        videoContainer.current.style.display = 'none';
    }

    console.log(myStory);
    console.log(story);
    return (
        <>
            <Container fluid={true} style={{ background: "#1a1a1a", height: "100vh" }}>
                <Row>
                    <Col xs={3} className='story-list'>
                        <h3 style={{ marginTop: "20px" }}>Story</h3>
                        <h5 style={{ marginTop: "30px" }}>Your Story</h5>
                        <div className={`story ${currentUser === -1 ? 'currentStory' : ""}`} onClick={() => handleChangeUser(-1)}>
                            <div className='story-image'>
                                <img src='/images/common/avatar.png' alt='error-img' />
                            </div>
                            <div className='story-info'>
                                <div className='story-user-name'>{JSON.parse(localStorage.getItem("User")).username}</div>
                                <div className='story-time'>22 gio</div>
                            </div>
                            <div className='add-story' onClick={() => nav('/story/create')}>
                                <ion-icon name="add-outline"></ion-icon>
                            </div>
                        </div>
                        <h5 style={{ marginTop: "20px" }}>All Story</h5>
                        {
                            story.map((str, index) => {
                                return (
                                    <div className={`story ${currentUser === index ? "currentStory" : ""}`} onClick={() => handleChangeUser(index)}>
                                        <div className='story-image story-other'>
                                            <img src='/images/common/avatar.png' alt='error-img' />
                                        </div>
                                        <div className='story-info story-other-info'>
                                            <div className='story-user-name'>{str.username}</div>
                                            <div className='story-time'><span className='story-tags'>{str.stories.length} thẻ mới</span> -  22 gio</div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </Col>
                    <Col xs={9} className='video-container'>
                        <Row>

                            <Col xs={4} className='move-left' onClick={() => handleChangeStory(currentVideo - 1)}>
                                <div>
                                    <ion-icon name="chevron-back-outline"></ion-icon>
                                </div>
                            </Col>
                            <Col xs={4} style={{ textAlign: "center", height: "100vh" }}>
                                {
                                    (myStory || story.length !== 0) && (
                                        <div className="story-video" ref={videoBox}>
                                            <div className="video-box" >{
                                                (myStory || story.length !== 0) && (<video ref={video} autoPlay muted onEnded={() => handleChangeStory(currentVideo + 1)} onDoubleClick={(e) => handleFavorite(e)} >
                                                    <source type='video/mp4' src={currentUser >= 0 ? `http://localhost:3008/${story[currentUser].stories[currentVideo].path}` : `http://localhost:3008/${myStory.stories[currentVideo].path}`} />
                                                    Have some problem with your internet
                                                </video>
                                                )
                                            }
                                            </div>
                                            <div className='video-controls' onClick={() => handleSetVideo(!videoState)}>
                                                {
                                                    videoState === true ? <ion-icon name="pause"></ion-icon> : <ion-icon name="play"></ion-icon>
                                                }
                                            </div>
                                            <div className='video-audio' onClick={() => handleSetAudio(!audioState)}>
                                                {
                                                    audioState === true ? <ion-icon name="volume-high"></ion-icon> : <ion-icon name="volume-mute"></ion-icon>
                                                }
                                            </div>
                                            {
                                                currentUser === -1 ? (
                                                    <p className='viewed-story' onClick={handleOpenViewed}><ion-icon name="chevron-up-outline" ></ion-icon>  {myStory.stories[currentVideo].viewed.length} người xem</p>
                                                ) : <p style={{ color: "black" }}>kkkkk</p>
                                            }

                                            {
                                                currentUser === -1 && (
                                                    <div className='viewed-container' ref={videoContainer} onClick={handleOpenViewed}>
                                                        <p style={{ color: "white", fontWeight: "bold" }}>Story Detail</p>
                                                        <ion-icon name="close" style={{ position: "absolute", color: "white", top: "10px", right: "10px", fontSize: "20px", cursor: "pointer" }}
                                                            onClick={handleCloseView}></ion-icon>
                                                        <div style={{ width: "95%", height: "1px", background: "white", margin: "auto" }}></div>
                                                        <p style={{ color: "white", textAlign: "left", marginTop: "10px", marginLeft: "5px" }}><ion-icon name="eye-outline"></ion-icon>  {myStory.stories[currentVideo].viewed.length} nguowif xem</p>
                                                        <div className='friendcontainer'>
                                                            {
                                                                viewed.map((view) => {
                                                                    return (
                                                                        <div className='friendtag'>
                                                                            <div className='fr-info'>
                                                                                <img src='/images/common/avatar.png' alt='error-img' />
                                                                                <p>{view.username}</p>
                                                                            </div>
                                                                            {
                                                                                myStory.stories[currentVideo].liked.includes(view._id) && (
                                                                                    <ion-icon name="heart"></ion-icon>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    )
                                }

                            </Col>
                            <Col xs={4} className='move-right' onClick={() => handleChangeStory(currentVideo + 1)}>
                                <ion-icon name="close-circle-outline" id='story-close' onClick={() => {
                                    nav('/');
                                }}></ion-icon>
                                <div>
                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Story
