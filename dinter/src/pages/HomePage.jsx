import React from "react";
import HeaderHome from "../components/HeaderComponents/HeaderHome";
import "./style/HomePage.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBookmark, faComments, faEdit, faEllipsis, faHeader, faHeart, faSearch, faShare, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faEllipsis,faHeart,faComments,faShareAlt,faBookmark,faEdit,faSearch);
function HomePage(props) {
  return (
    <div>
      <HeaderHome />
      <Container style={{ paddingTop: "80px" }}>
        <Row>
          {/* LEFT */}
          <Col md={3}>
            <div style={{ position: "fixed", width: "calc(16%)" }}>
              <div>
                <div
                  className="d-flex bg-white circle w-100 align-items-center"
                  style={{ padding: "16px" }}
                >
                  <div className="avatar">
                    <img src="images/common/avatar.png" alt="Avatar" />
                  </div>
                  <div className="user-infor" style={{ marginLeft: "10px" }}>
                    <strong>Lại Ngọc Lâm</strong>
                  </div>
                </div>
                <div
                  className="bg-white circle"
                  style={{ marginTop: "10px", fontSize: "18px" }}
                >
                  <div
                    className="d-flex align-items-center"
                    style={{ padding: "30px 35px" }}
                  >
                    <ion-icon name="home-outline"></ion-icon>
                    <span style={{ marginLeft: "20px", fontWeight: "700" }}>
                      Home
                    </span>
                  </div>
                  <div
                    className="d-flex align-items-center"
                    style={{ padding: "30px 35px" }}
                  >
                    <ion-icon name="home-outline"></ion-icon>
                    <span style={{ marginLeft: "20px", fontWeight: "700" }}>
                      Explore
                    </span>
                  </div>
                  <div
                    className="d-flex align-items-center"
                    style={{ padding: "30px 35px" }}
                  >
                    <ion-icon name="home-outline"></ion-icon>
                    <span style={{ marginLeft: "20px", fontWeight: "700" }}>
                      Messagse
                    </span>
                  </div>
                  <div
                    className="d-flex align-items-center"
                    style={{ padding: "30px 35px" }}
                  >
                    <ion-icon name="home-outline"></ion-icon>
                    <span style={{ marginLeft: "20px", fontWeight: "700" }}>
                    Setting
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          {/* Middle */}
          <Col md={6}>
            <Row>
              <Col md={2}>
                <div className="stories">
                    <div className="story">
                    <div className="profile-photo">
                        <img src="images/common/avatar.png" alt="" width={35} />
                    </div>
                    <div className="name">Trương Trọng Hưng</div>
                    </div>
                </div>
              </Col>
              <Col md={2}>
                <div className="stories">
                    <div className="story">
                    <div className="profile-photo">
                        <img src="images/common/avatar.png" alt="" width={35} />
                    </div>
                    <div className="name">You Story</div>
                    </div>
                </div>
              </Col><Col md={2}>
                <div className="stories">
                    <div className="story">
                    <div className="profile-photo">
                        <img src="images/common/avatar.png" alt="" width={35} />
                    </div>
                    <div className="name">You Story</div>
                    </div>
                </div>
              </Col><Col md={2}>
                <div className="stories">
                    <div className="story">
                    <div className="profile-photo">
                        <img src="images/common/avatar.png" alt="" width={35} />
                    </div>
                    <div className="name">You Story</div>
                    </div>
                </div>
              </Col><Col md={2}>
                <div className="stories">
                    <div className="story">
                    <div className="profile-photo">
                        <img src="images/common/avatar.png" alt="" width={35} />
                    </div>
                    <div className="name">You Story</div>
                    </div>
                </div>
              </Col><Col md={2}>
                <div className="stories">
                    <div className="story">
                    <div className="profile-photo">
                        <img src="images/common/avatar.png" alt="" width={35} />
                    </div>
                    <div className="name">You Story</div>
                    </div>
                </div>
              </Col>
            </Row>

            {/* Creat Post */}
          <Form className="create-post">
          <div className="profile-photo1">
                        <img src="images/common/avatar.png" alt="" width={40}/>
                    </div>
                    <input type="text" placeholder="New ? " id="create-post" />
                    <input type="submit" value="Post" className="btn btn-primary" />
          </Form>

          {/* New Feeds */}
          <div className="feeds">
            <div className="feed">
                <div className="head">
                    <div className="user">
                        <div className="profile-photo1">
                            <img src="images/common/avatar.png" alt="" width={50}/>
                        </div>
                        <div className="ingo">
                            <h5>Truong Hung</h5>
                            <small>FPT, 1g</small>
                        </div>
                        
                    </div>
                    <span className="edit">
                        <FontAwesomeIcon icon="ellipsis" />
                        </span>
                </div>

                <div className="photo">
                    <img src="images/common/anhbia.jpg" alt="" width={650}/>
                </div>
                
                <div className="action-buttons">
                    <div className="inter-buttons">
                    <span >
                        <FontAwesomeIcon icon="heart" /><i> </i>
                        <FontAwesomeIcon icon="comments" /><i> </i>
                        <FontAwesomeIcon icon="share-alt" /><i> </i>
                        </span>
                    </div>
                    <div className="booknark">
                    <span >
                    <FontAwesomeIcon icon={faBookmark} />
                        </span>
                    </div>
                </div>
                <div className="liked-by">
                    <span><img src="images/common/avatar.png" alt="" width={25} /></span>
                    <span><img src="images/common/avatar.png" alt="" /></span>
                    <span><img src="images/common/avatar.png" alt="" /></span>
                     <a>Liked by <b>Truong Hung</b> and <b>100 other</b></a>
                </div>
                <div className="caption">
                    <a><b>Truong Hung</b> asdhasjdhasjdhjsd <span className="harsh-tag">#hello</span></a>
                </div>
                <div className="text-muted">View all 277 comment</div>
            </div>
          </div>

          <div className="feeds">
            <div className="feed">
                <div className="head">
                    <div className="user">
                        <div className="profile-photo1">
                            <img src="images/common/avatar.png" alt="" width={50}/>
                        </div>
                        <div className="ingo">
                            <h5>Truong Hung</h5>
                            <small>FPT, 1g</small>
                        </div>
                        
                    </div>
                    <span className="edit">
                        <FontAwesomeIcon icon="ellipsis" />
                        </span>
                </div>

                <div className="photo">
                    <img src="images/common/anhbia.jpg" alt="" width={650}/>
                </div>
                
                <div className="action-buttons">
                    <div className="inter-buttons">
                    <span >
                        <FontAwesomeIcon icon="heart" /><i> </i>
                        <FontAwesomeIcon icon="comments" /><i> </i>
                        <FontAwesomeIcon icon="share-alt" /><i> </i>
                        </span>
                    </div>
                    <div className="booknark">
                    <span >
                    <FontAwesomeIcon icon={faBookmark} />
                        </span>
                    </div>
                </div>
                <div className="liked-by">
                    <span><img src="images/common/avatar.png" alt="" width={25} /></span>
                    <span><img src="images/common/avatar.png" alt="" /></span>
                    <span><img src="images/common/avatar.png" alt="" /></span>
                     <a>Liked by <b>Truong Hung</b> and <b>100 other</b></a>
                </div>
                <div className="caption">
                    <a><b>Truong Hung</b> asdhasjdhasjdhjsd <span className="harsh-tag">#hello</span></a>
                </div>
                <div className="text-muted">View all 277 comment</div>
            </div>
          </div>
          </Col>

          {/* Right */}
          <Col md={3}>
            <div className="right">
                <div className="messages">
                    <div className="heading">
                        <h5>Messages</h5><i><FontAwesomeIcon icon={faEdit} /></i>
                    </div>
                    {/* search bar*/}
                    <div className="search-bar">
                    <FontAwesomeIcon icon={faSearch} />
                    <input type="search" placeholder="Search messages" id="message-search" />
                    </div>
                     {/* mess category*/}
                     <div className="category">
                        <h6 className="actives">Primary</h6>
                        <h6>General</h6>
                        <h6 className="message-requests">Requests(1)</h6>
                     </div>
                     {/* messagaes*/}
                     <div className="message">
                        <div className="profile-photo1">
                            <img src="images/common/avatar.png" alt="" width={50}/>
                        </div>
                        <div className="message-body">
                            <h6>Edem Quist <br /><span className="text-muted">Just woke up bruh</span></h6>
                        
                        </div>
                     </div><div className="message">
                        <div className="profile-photo1">
                            <img src="images/common/avatar.png" alt="" width={50}/>
                            <div className="actives"></div>
                        </div>
                        <div className="message-body">
                            <h6>Edem Quist <br /><span className="text-bold">Just woke up bruh</span></h6>
                        
                        </div>
                     </div>
                     <div className="message">
                        <div className="profile-photo1">
                            <img src="images/common/avatar.png" alt="" width={50}/>
                        </div>
                        <div className="message-body">
                            <h6>Edem Quist <br /><span className="text-bold">Just woke up bruh</span></h6>
                        
                        </div>
                     </div>
                     <div className="message">
                        <div className="profile-photo1">
                            <img src="images/common/avatar.png" alt="" width={50}/>
                        </div>
                        <div className="message-body">
                            <h6>Edem Quist <br /><span className="text-muted">Just woke up bruh</span></h6>
                        
                        </div>
                     </div>
                </div>

                {/* Friend Accept */}
                <div className="friend-requests">
                    <h5>Requests</h5>
                    <div className="request">
                        <div className="info">
                        <div className="profile-photo1">
                            <img src="images/common/avatar.png" alt="" width={50}/>
                        </div>
                        <div>
                        <h6>Tuan Joker</h6>
                        <p className="text-muted">8 mutual friends</p>
                        </div>
                        </div>
                        <div className="action">
                            <button className="btn btn-primary">
                                Accept
                            </button>
                            <button className="btn"> 
                                Decline
                            </button>
                        </div>
                    </div>
                    <div className="request">
                        <div className="info">
                        <div className="profile-photo1">
                            <img src="images/common/avatar.png" alt="" width={50}/>
                        </div>
                        <div>
                        <h6>Tuan Joker</h6>
                        <p className="text-muted">8 mutual friends</p>
                        </div>
                        </div>
                        <div className="action">
                            <button className="btn btn-primary">
                                Accept
                            </button>
                            <button className="btn"> 
                                Decline
                            </button>
                        </div>
                    </div>
                    <div className="request">
                        <div className="info">
                        <div className="profile-photo1">
                            <img src="images/common/avatar.png" alt="" width={50}/>
                        </div>
                        <div>
                        <h6>Tuan Joker</h6>
                        <p className="text-muted">8 mutual friends</p>
                        </div>
                        </div>
                        <div className="action">
                            <button className="btn btn-primary">
                                Accept
                            </button>
                            <button className="btn"> 
                                Decline
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
