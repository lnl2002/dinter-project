import React, { useRef, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import './style/storycreation.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function StoryCreation() {
    const inputFile = useRef();
    const videosrc = useRef();
    const [file, setFile] = useState();
    const nav = useNavigate();
    const handleChooseFile = () => {
        if (inputFile) {
            inputFile.current.click();
        }
    }
    const handleVideoChange = (e) => {
        let file = e.target.files[0];
        videosrc.current.src = URL.createObjectURL(file);
        setFile(file)
    }
    const handlePostStory = async () => {
        try {
            if (videosrc.current.duration > 60) {
                alert('Video vuot qua 60s')
                return;
            }
            const form = new FormData();
            form.append('video', file);
            const story = await axios.post('http://localhost:3008/api/v1/story', form, {
                headers: {
                    "Token": `Bearer ${getCookie('access_token')}`
                }
            })
            nav('/');
        } catch (error) {
            console.log(error);
        }
    }

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
    return (
        <>
            <Container fluid style={{ background: "rgb(47, 47, 47)", height: "100vh" }}>
                <Row>
                    <Col xs={3} style={{ borderRight: "1px solid white", height: "100vh" }}>
                        <div style={{ width: "40px", height: "40px", fontSize: "40px", cursor: "pointer", color: "white" }}>
                            <ion-icon name="close-circle-outline"></ion-icon>
                        </div>
                        <h3 style={{ marginTop: "50px", color: "white" }}>Your Story</h3>
                        <div className='story-info2'>
                            <img src='images/common/avatar.png' alt='error-img' />
                            <p>Khai Dao</p>
                        </div>
                        <input type='file' style={{ display: "none" }} ref={inputFile} accept='video/*' onChange={(e) => handleVideoChange(e)} />
                        <Button id='choose-video' onClick={handleChooseFile}>Input video</Button>

                        <Button className='option-video' style={{
                            background: "#494949", borderColor: "#494949", marginLeft: "10px"
                            , marginRight: "20px"
                        }}>Cancel</Button>
                        <Button className='option-video' style={{ background: "#ff655b", borderColor: "#ff655b" }} onClick={handlePostStory}>Post</Button>
                    </Col>
                    <Col xs={9} style={{ height: "100vh", background: "rgb(36, 36, 36)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ width: "80%", height: "80%", background: "rgb(47, 47, 47)", borderRadius: "10px", padding: "20px" }}>
                            <p style={{ color: "white", fontWeight: "bold" }}>Xem Trước</p>
                            <div style={{
                                width: "100%", height: "90%", background: "rgb(36, 36, 36)",
                                display: "flex", justifyContent: "center", alignItems: "center"
                            }}>
                                <div style={{
                                    height: "100%", width: "30%",
                                    display: "flex", justifyContent: "center", alignItems: "center",
                                    background: "black",
                                    borderRadius: "10px"
                                }}>

                                    <video autoPlay muted loop style={{ maxWidth: "100%", maxHeight: "100%" }} ref={videosrc} >
                                        <source type='video/mp4' src='' />
                                        Have some problem with your internet
                                    </video>
                                </div>

                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default StoryCreation
