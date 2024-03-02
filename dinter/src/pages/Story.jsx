import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './style/story.css'

function Story() {
    const video = useRef();
    const listVideo = [
        "videos/5146709415724.mp4",
        "videos/5147386025823.mp4"
    ]
    const [videoState, setVideoState] = useState(true);
    const [audioState, setAudioState] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(0);
    const [start, setStart] = useState(true);
    console.log(audioState);
    const handleSetVideo = (state) => {
        if (state) {
            video.current.play();
        } else {
            video.current.pause();
        }
        setVideoState(state);
    }
    const handleSetAudio = (state) => {
        console.log(state);
        if (state) {
            video.current.muted = false;
        } else {
            video.current.muted = true;
        }
        setAudioState(state);
    }
    useEffect(() => {
        if(start){
            if (currentVideo !== 0 && currentVideo < listVideo.length) {
                video.current.load();
                video.current.play();
            }
        }
        else{
            if (currentVideo < listVideo.length) {
                video.current.load();
                video.current.play();
            }
        }
        if(currentVideo === listVideo.length){
            setAudioState(false);
        }
    }, [currentVideo])

    // const handleChangeStory = (index) => {
    //     setCurrentVideo(index);
    //     setStart(false);
    // }

    const handleChangeStory = (num) => {
        if(num >= 0 && num <= listVideo.length){
            setCurrentVideo(num);  
        }
        setStart(false);
    }
    console.log(listVideo[currentVideo]);
    return (
        <Container fluid={true} style={{ background: "#1a1a1a", height: "100vh" }}>
            <Row>
                <Col xs={3} className='story-list'>
                    <h3 style={{ marginTop: "20px" }}>Story</h3>
                    <h5 style={{ marginTop: "30px" }}>Your Story</h5>
                    <div className='story'>
                        <div className='story-image'>
                            <img src='images/common/avatar.png' alt='error-img' />
                        </div>
                        <div className='story-info'>
                            <div className='story-user-name'>Khai Dao</div>
                            <div className='story-time'>22 gio</div>
                        </div>
                        <div className='add-story'>
                            <ion-icon name="add-outline"></ion-icon>
                        </div>
                    </div>
                    <h5 style={{ marginTop: "20px" }}>All Story</h5>
                    <div className='story'>
                        <div className='story-image story-other'>
                            <img src='images/common/avatar.png' alt='error-img' />
                        </div>
                        <div className='story-info story-other-info'>
                            <div className='story-user-name'>Khai Dao</div>
                            <div className='story-time'><span className='story-tags'>1 thẻ mới</span> -  22 gio</div>
                        </div>
                    </div>

                    <div className='story'>
                        <div className='story-image story-other'>
                            <img src='images/common/avatar.png' alt='error-img' />
                        </div>
                        <div className='story-info story-other-info'>
                            <div className='story-user-name'>Khai Dao</div>
                            <div className='story-time'><span className='story-tags'>1 thẻ mới</span> -  22 gio</div>
                        </div>
                    </div>

                    <div className='story'>
                        <div className='story-image story-other'>
                            <img src='images/common/avatar.png' alt='error-img' />
                        </div>
                        <div className='story-info story-other-info'>
                            <div className='story-user-name'>Khai Dao</div>
                            <div className='story-time'><span className='story-tags'>1 thẻ mới</span> -  22 gio</div>
                        </div>
                    </div>

                    <div className='story'>
                        <div className='story-image story-other'>
                            <img src='images/common/avatar.png' alt='error-img' />
                        </div>
                        <div className='story-info story-other-info'>
                            <div className='story-user-name'>Khai Dao</div>
                            <div className='story-time'><span className='story-tags'>1 thẻ mới</span> -  22 gio</div>
                        </div>
                    </div>

                    <div className='story'>
                        <div className='story-image story-other'>
                            <img src='images/common/avatar.png' alt='error-img' />
                        </div>
                        <div className='story-info story-other-info'>
                            <div className='story-user-name'>Khai Dao</div>
                            <div className='story-time'><span className='story-tags'>1 thẻ mới</span> -  22 gio</div>
                        </div>
                    </div>

                    <div className='story'>
                        <div className='story-image story-other'>
                            <img src='images/common/avatar.png' alt='error-img' />
                        </div>
                        <div className='story-info story-other-info'>
                            <div className='story-user-name'>Khai Dao</div>
                            <div className='story-time'><span className='story-tags'>1 thẻ mới</span> -  22 gio</div>
                        </div>
                    </div>

                    <div className='story'>
                        <div className='story-image story-other'>
                            <img src='images/common/avatar.png' alt='error-img' />
                        </div>
                        <div className='story-info story-other-info'>
                            <div className='story-user-name'>Khai Dao</div>
                            <div className='story-time'><span className='story-tags'>1 thẻ mới</span> -  22 gio</div>
                        </div>
                    </div>

                    <div className='story'>
                        <div className='story-image story-other'>
                            <img src='images/common/avatar.png' alt='error-img' />
                        </div>
                        <div className='story-info story-other-info'>
                            <div className='story-user-name'>Khai Dao</div>
                            <div className='story-time'><span className='story-tags'>1 thẻ mới</span> -  22 gio</div>
                        </div>
                    </div>

                </Col>
                <Col xs={9} className='video-container'>
                    <Row>
                        <Col xs={4} className='move-left' onClick={() => handleChangeStory(currentVideo-1)}>
                            <div>
                                <ion-icon name="chevron-back-outline"></ion-icon>
                            </div>
                        </Col>
                        <Col xs={4} style={{ textAlign: "center", height: "100vh" }}>
                            <div className={currentVideo < listVideo.length ? "story-video" : "story-video-2"}>
                                <div className={currentVideo < listVideo.length ? "video-box" : "add-story-box"}>{
                                    currentVideo < listVideo.length ? (<video ref={video} autoPlay muted onEnded={() => handleChangeStory()}>
                                        <source src={listVideo[currentVideo]} type='video/mp4' />
                                        Have some problem with your internet
                                    </video>) : (
                                        <>
                                            <h3>Tiếp tục tạo tin</h3>
                                            <p>Bạn bè mong bạn lắm ddaays</p>
                                            <p style={{ textAlign: "center" }}>Hãy chia sẻ khoảnh khắc gần đây để họ biết tình hình hiện tại của bạn nhé.</p>
                                            <button>Tạo tin</button>
                                        </>)
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
                                    currentVideo < listVideo.length && (
                                        <div className='story-react'>
                                            <input type='text' placeholder='Tra loi...' />
                                            <button>
                                                <ion-icon name="heart-outline"></ion-icon>
                                            </button>
                                        </div>
                                    )
                                }

                            </div>
                        </Col>
                        <Col xs={4} className='move-right' onClick={() => handleChangeStory(currentVideo+1)}>
                            <div>
                                <ion-icon name="chevron-forward-outline"></ion-icon>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Story
