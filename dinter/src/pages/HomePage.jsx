import React, { useEffect, useRef, useState } from "react";
import HeaderHome from "../components/HeaderComponents/HeaderHome";
import "./style/HomePage.css";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBookmark, faComments, faEdit, faEllipsis, faHeader, faHeart, faSearch, faShare, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import PostCreation from "./PostCreation";
import SinglePost from "./SinglePost";
import PostEdition from "./PostEdition";
library.add(faEllipsis, faHeart, faComments, faShareAlt, faBookmark, faEdit, faSearch);
function HomePage(props) {
  const [listPost, setListPost] = useState([]);
  const [isLoad, setIsLoad] = useState(1);
  const [offset, setOffset] = useState(0);
  const [currentPost, setCurrentPost] = useState();
  const [indexPost, setIndexPost] = useState();
  const [showCreate, setShowCreate] = useState(false);
  const [showPostOption, setShowPostOption] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const modal = useRef();

  const handleClose = () => setShowPostOption(false);
  const handleShow = (id, index) => {
    setShowPostOption(true);
    setCurrentPost(id);
    setIndexPost(index)
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
  const handleGetPost = async () => {
    try {
      const data = await axios.get(`http://localhost:3008/api/v1/post?limit=3&offset=${offset}`, {
        headers: {
          "Token": `Bearer ${getCookie('access_token')}`
        }
      });
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
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const openEdit = () => {
    setShowEdit(true);
    setShowPostOption(false);
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
              listPost.length !== 0 && listPost.map((post, index) => {
                return (
                  <SinglePost post={post} handleShow={handleShow} showEdit={showEdit} setShowEdit={setShowEdit} operEdit={openEdit}
                    index={index} />
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
            <li onClick={openEdit}>Edit</li>
          </ul>
        </Modal>
      </Container>
      <PostCreation show={showCreate} close={handleCreateClose} setListPost={setListPost} listPost={listPost} setShowCreate={setShowCreate} />
      <PostEdition show={showEdit} setShow={setShowEdit} post={listPost[indexPost]} setListPost={setListPost} listPost={listPost} />
    </div>
  );
}

export default HomePage;
