import React from 'react';
import { Container } from 'react-bootstrap';
function HeaderHome(props) {
    return (
        <Container fluid style={{backgroundColor: "#fff", padding: "10px 0", position: "fixed",zIndex:"2"}} className='headerContainer'>
            <Container className=" d-flex justify-content-between header align-items-center">
                <div className='header-logo poin pointer'>
                    <img src='images/common/dinter-logo.png' alt='logo' width={"30px"}/>
                    <strong style={{marginLeft: "5px"}}>DINTER</strong>
                </div>
                <div className="header-search">
                    <div className='d-flex align-items-center'>
                        <ion-icon name="search-outline"></ion-icon>
                        <input type="text" placeholder='Search your friends' />
                    </div>
                </div>
                <div className="header-avatar avatar">
                    <img src="images/common/avatar.png" alt="avatar"/>
                </div>
            </Container>
        </Container>
    );
}

export default HeaderHome;