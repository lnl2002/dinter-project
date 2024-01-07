import React from 'react';
import HeaderHome from '../components/HeaderComponents/HeaderHome';
import './style/HomePage.css'
import { Col, Container, Row } from 'react-bootstrap';
function HomePage(props) {
    return (
        <div>
            <HeaderHome/>
            <Container style={{paddingTop: "80px"}}>
                <Row>
                    {/* LEFT */}
                    <Col md={3}>
                        <div style={{position: "fixed", width: "calc(100%/7)"}}>
                            <div>
                                <div className='d-flex bg-white circle w-100 align-items-center'
                                    style={{padding: "16px"}}
                                >
                                    <div className="avatar">
                                        <img src='images/common/avatar.png' alt='Avatar'/>
                                    </div>
                                    <div className="user-infor" style={{marginLeft: "10px"}}>
                                        <strong>Lại Ngọc Lâm</strong>
                                    </div>
                                </div>
                                <div className='bg-white circle' style={{marginTop: "10px", fontSize: "18px"}}>
                                    <div className='d-flex align-items-center' style={{padding: "30px 35px"}}>
                                        <ion-icon name="home-outline"></ion-icon>
                                        <span style={{marginLeft: "20px", fontWeight: "700"}}>Home</span>
                                    </div>
                                    <div className='d-flex align-items-center' style={{padding: "30px 35px"}}>
                                        <ion-icon name="home-outline"></ion-icon>
                                        <span style={{marginLeft: "20px", fontWeight: "700"}}>Home</span>
                                    </div>
                                    <div className='d-flex align-items-center' style={{padding: "30px 35px"}}>
                                        <ion-icon name="home-outline"></ion-icon>
                                        <span style={{marginLeft: "20px", fontWeight: "700"}}>Home</span>
                                    </div>
                                    <div className='d-flex align-items-center' style={{padding: "30px 35px"}}>
                                        <ion-icon name="home-outline"></ion-icon>
                                        <span style={{marginLeft: "20px", fontWeight: "700"}}>Home</span>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </Col>
                    {/* Middle */}
                    <Col md={6}>
                        Middle
                    </Col>
                    {/* Right */}
                    <Col md={3}>
                        Right
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HomePage;