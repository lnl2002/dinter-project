import React, { useEffect, useRef, useState } from "react";
import HeaderHome from "../components/HeaderComponents/HeaderHome";
import "./style/HomePage.css";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBookmark, faComments, faEdit, faEllipsis, faHeader, faHeart, faSearch, faShare, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import PostCreation from "./PostCreation";
library.add(faEllipsis, faHeart, faComments, faShareAlt, faBookmark, faEdit, faSearch);
function HomePage(props) {
  const [listPost, setListPost] = useState([]);
  const [isLoad, setIsLoad] = useState(1);
  const [offset, setOffset] = useState(0);
  const [currentPost, setCurrentPost] = useState();
  const [showCreate, setShowCreate] = useState(false);
  const [showPostOption, setShowPostOption] = useState(false);
  const modal = useRef();

  const handleClose = () => setShowPostOption(false);
  const handleShow = (id) => {
    setShowPostOption(true);
    setCurrentPost(id);
  }

  const handleCreateShow = () => {
    setShowCreate(true);
  }
  const handleCreateClose = () => {
    setShowCreate(false);
  }
  useEffect(() => {
    handleGetPost();
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modal.current && !modal.current.contains(event.target)) {
        setShowPostOption(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal]);

  const handleGetPost = async () => {
    try {
      const data = await axios.get(`http://localhost:3008/api/v1/post?limit=3&offset=${offset}`);
      const posts = data.data;
      setListPost(posts.data);
      setOffset(offset + 3);
    } catch (error) {
      console.log(error);
    }
  }

  const deletePost = async () => {
    try {
      if (currentPost) {
        await axios.delete(`http://localhost:3008/api/v1/post/${currentPost}`);
        const arr = [...listPost].filter((a) => {
          return a._id !== currentPost
        });
        setListPost(arr);
      }
      // console.log(currentPost);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(listPost);
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

                      <a href="/messages">Message</a>
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
            <Form className="create-post" onClick={handleCreateShow} >
              <div className="profile-photo1">
                <img src="images/common/avatar.png" alt="" width={40} />
              </div>
              <input type="text" placeholder="New ? " id="create-post" />
              <input type="submit" value="Post" className="btn btn-primary" onClick={(e) => { e.preventDefault() }} />
            </Form>

            {/* New Feeds */}
            {
              listPost.length !== 0 && listPost.map((post) => {
                return (
                  <div className="feeds" key={post._id}>
                    <div className="feed">
                      <div className="head">
                        <div className="user">
                          <div className="profile-photo1">
                            <img src="images/common/avatar.png" alt="" width={50} />
                          </div>
                          <div className="ingo">
                            <h5>{post.author.username}</h5>
                            <small>{post.createdAt}</small>
                          </div>

                        </div>
                        <span className="edit">
                          <FontAwesomeIcon icon="ellipsis" onClick={() => handleShow(post._id)} />
                        </span>
                      </div>
                      <div style={{ marginTop: "5px", marginLeft: "2px" }}>
                        <p style={{ whiteSpace: "pre-line" }}>{post.content}</p>
                      </div>
                      <div className="photo">
                        <img src={'http://localhost:3008/' + post.images[0]} alt="" width={650} />
                      </div>

                      <div className="action-buttons">
                        <div className="inter-buttons">
                          <span >
                            <FontAwesomeIcon icon="heart" /><i> </i>
                            <FontAwesomeIcon icon="comments" /><i> </i>
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
                )
              })

            }

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
                    <img src="images/common/avatar.png" alt="" width={50} />
                  </div>
                  <div className="message-body">
                    <h6>Edem Quist <br /><span className="text-muted">Just woke up bruh</span></h6>

                  </div>
                </div><div className="message">
                  <div className="profile-photo1">
                    <img src="images/common/avatar.png" alt="" width={50} />
                    <div className="actives"></div>
                  </div>
                  <div className="message-body">
                    <h6>Edem Quist <br /><span className="text-bold">Just woke up bruh</span></h6>

                  </div>
                </div>
                <div className="message">
                  <div className="profile-photo1">
                    <img src="images/common/avatar.png" alt="" width={50} />
                  </div>
                  <div className="message-body">
                    <h6>Edem Quist <br /><span className="text-bold">Just woke up bruh</span></h6>

                  </div>
                </div>
                <div className="message">
                  <div className="profile-photo1">
                    <img src="images/common/avatar.png" alt="" width={50} />
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
                      <img src="images/common/avatar.png" alt="" width={50} />
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
                      <img src="images/common/avatar.png" alt="" width={50} />
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
                      <img src="images/common/avatar.png" alt="" width={50} />
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
        <Modal show={showPostOption} onHide={handleClose} className="modal-editpost" centered animation >
          <ul className="post-option" ref={modal}>
            <li onClick={deletePost}>Delete</li>
            <hr style={{ margin: "0" }}></hr>
            <li>Edit</li>
          </ul>
        </Modal>
      </Container>
      <PostCreation show={showCreate} close={handleCreateClose} setListPost={setListPost} listPost={listPost} setShowCreate={setShowCreate} />
    </div>
  );
}

export default HomePage;
