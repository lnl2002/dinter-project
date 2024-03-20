import React, { useContext, useEffect, useInsertionEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HeaderHome from "../components/HeaderComponents/HeaderHome";
import "./style/HomePage.css";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBookmark, faComments, faEdit, faEllipsis, faHeader, faHeart, faMessage, faSearch, faShare, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LeftBarHomePage from "../components/LeftBar/LeftBarHomePage";
import axios from 'axios'
import PostCreation from "./PostCreation";
import SinglePost from "./SinglePost";
import PostEdition from "./PostEdition";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import { BACK_END_HOST } from "../utils/AppConfig";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/services";
import userCommon from '../common/User.js';
library.add(faEllipsis, faHeart, faComments, faShareAlt, faBookmark, faMessage, faSearch);
function HomePage(props) {

  const { onlineUsers } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('User'));
  const [listPost, setListPost] = useState([]);
  const [isLoad, setIsLoad] = useState();
  const [offset, setOffset] = useState(0);
  const [currentPost, setCurrentPost] = useState();
  const [indexPost, setIndexPost] = useState();
  const [showCreate, setShowCreate] = useState(false);
  const [showPostOption, setShowPostOption] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [story, setStory] = useState([]);
  const [unwatchNews, setUnWatchNews] = useState([]);
  const [watchedNews, setWatchedNews] = useState([]);
  const [listFriends, setListFriends] = useState([]);
  const middle = useRef();
  const pageContent = useRef();
  const modal = useRef();
  const handleClose = () => setShowPostOption(false);
  const nav = useNavigate();
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
    handleGetStory();
    setIsLoad(false);
    pageContent.current.addEventListener('scroll', handleScroll);
    // return () => pageContent.current.removeEventListener('scroll', handleScroll);
  }, [])

  useEffect(() => {
    setIsLoad(true);
  }, [offset])

  useEffect(() => {
    isLoad && handleGetPost();
  }, [isLoad])
  const handleScroll = () => {
    if (
      window.innerHeight + pageContent.current.scrollTop >= middle.current.offsetHeight - 500
    ) {
      pageContent.current.removeEventListener('scroll', handleScroll);
      console.log(offset);
      setOffset(offset + 3);
    }
  }

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
      const posts = [...listPost];
      posts.push(...data.data.data);
      setListPost(posts);
      if (data.data.data.length === 3) {
        pageContent.current.addEventListener('scroll', handleScroll);
      }
      setIsLoad(false);

    } catch (error) {
      console.log(error);
    }
  }
  const handleGetStory = async () => {
    try {
      const data = await axios.get(`http://localhost:3008/api/v1/story`, {
        headers: {
          "Token": `Bearer ${getCookie('access_token')}`
        }
      });
      setStory(data.data.data);
      const uwArr = [];
      const wArr = [];
      const userId = JSON.parse(localStorage.getItem("User")).id;
      data.data.data.forEach((user) => {
        let watched = true;
        user.stories.forEach((str) => {
          if (!str.viewed.includes(userId)) {
            watched = false;
          }
        })
        if (watched) wArr.push(user);
        else uwArr.push(user);
      })
      setWatchedNews(wArr);
      setUnWatchNews(uwArr);
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
  const handleNavStory = (id) => {
    nav('/story/' + id);
  }
  console.log(unwatchNews);

  useEffect(() => {
    if (user) {
      api.get(`/user/get-friends-list/${user.id}`)
        .then(res => {
          // console.log('res.data.friends', res.data.friends);
          // console.log('online', onlineUsers);
          // console.log('intersection ==============', 
          // removeDuplicates(intersection(res.data.friends, onlineUsers))
          // );
          setListFriends(res.data.friends);

        })

    }
  }, [onlineUsers, user])

  function intersection(arr1, arr2) {
    return arr1.filter(obj => arr2.some(otherObj => (otherObj.userId === obj._id && otherObj.userId !== user.id)));
  }

  function removeDuplicates(arr) {
    const uniqueIds = new Set();
    return arr.filter(obj => {
      if (!uniqueIds.has(obj._id)) {
        uniqueIds.add(obj._id);
        return true;
      }
      return false;
    });
  }


  return (
    <div ref={pageContent} className="home-page">
      <HeaderHome />
      <Container style={{ paddingTop: "80px" }}>
        <Row>
          {/* LEFT */}
          <Col md={3}>
            <div style={{ position: "fixed", width: "calc(16%)", zIndex: "99" }}>
              <div>
                <Link to={"/profile"} style={{ textDecoration: "none", color: "#000" }}>
                  <div
                    className="d-flex bg-white circle w-100 align-items-center"
                    style={{ padding: "16px" }}
                  >
                    <div className="avatar">
                      <img src={BACK_END_HOST + user.avatar} alt="Avatar" />
                    </div>
                    <div className="user-infor" style={{ marginLeft: "10px" }}>
                      <strong>{user.username}</strong>
                    </div>
                  </div>
                </Link>

                <LeftBarHomePage />
              </div>
            </div>
          </Col>
          {/* Middle */}
          <Col md={6} ref={middle}>
            <Row>
              <Col xs={12} className="story-container">
                {
                  unwatchNews.length === 0 && watchedNews.length === 0 && (
                    <div className="story-item" onClick={() => { nav('/story/create') }}>
                      <img src={"http://localhost:3008/" + JSON.parse(localStorage.getItem('User')).avatar} alt="error" className="avatar-story" />
                      <p className="story-name">Add Story</p>
                      <img src={"/images/common/tinder.png"} className="story-background" />
                    </div>
                  )
                }
                {
                  unwatchNews && unwatchNews.map((str) => {
                    return (
                      <div className="story-item" onClick={() => handleNavStory(str.userId)}>
                        <img src={"http://localhost:3008/" + str.avatar} alt="error" className="avatar-story" />
                        <p className="story-name">{JSON.parse(localStorage.getItem("User")).username === str.username ? "Your story" : str.username}</p>
                        <img src={"http://localhost:3008/" + str.stories[0].thumbnail} alt="error" />
                      </div>
                    )
                  })}
                {
                  watchedNews && watchedNews.map((str) => {
                    return (
                      <div className="story-item" onClick={() => handleNavStory(str.userId)}>
                        <img src={"http://localhost:3008/" + str.avatar} alt="error" className="avatar-story" />
                        <p className="story-name">{JSON.parse(localStorage.getItem("User")).username === str.username ? "Your story" : str.username}</p>
                        <img src={"http://localhost:3008/" + str.stories[0].thumbnail} alt="error" />
                      </div>
                    )
                  })
                }
              </Col>
            </Row>

            {/* Creat Post */}
            <Form className="create-post" onClick={handleCreateShow} style={{ marginBottom: '20px' }}>
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
                    listPost={listPost}
                    index={index} key={index} />
                )
              })

            }
            <SkeletonTheme baseColor="#E9EAED" highlightColor="#F8F8F8">
              <div className="loading-post">
                <div style={{ display: "flex" }}>
                  <Skeleton circle width={40} height={40} containerClassName="flex-1" />
                  <div style={{ width: "30%" }}>
                    <Skeleton height={10} />
                    <Skeleton height={10} />
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Skeleton count={1} width={100} />
                  <Skeleton count={1} width={100} />
                  <Skeleton count={1} width={100} />
                </div>
              </div>
            </SkeletonTheme>
          </Col>

          {/* Right */}
          <Col md={3}>
            <div className="right">
              <div className="messages">
                <div className="heading">
                  <h5>Online User</h5><i><FontAwesomeIcon icon={faMessage} /></i>
                </div>
                {/* search bar*/}
                <div className="search-bar">
                  <FontAwesomeIcon icon={faSearch} />
                  <input type="search" placeholder="Search messages" id="message-search" />
                </div>

                {/* messagaes*/}
                {
                  listFriends && listFriends.map(friend => (
                    <Link to={`/messages`} style={{ textDecoration: "none", color: '#000' }}>
                      <div className="message d-flex align-items-center" style={{margin: '10px 0'}}>
                        <div className="position-relative">
                          <div className="avatar" style={{ width: '50px', height: '50px' }}>
                            <img src={userCommon.getOtherImage(friend.avatar)} alt="" />
                          </div>
                          {
                            onlineUsers.some((u) => u?.userId == friend._id) ?
                              (
                                <div
                                  style={{
                                    width: "15px",
                                    height: "15px",
                                    background: "#00FF00",
                                    borderRadius: "99px",
                                    position: "absolute",
                                    right: "0px",
                                    bottom: "0",
                                  }}>
                                </div>
                              ) :
                              (<></>)
                          }

                        </div>
                        <div className="message-body">
                          <h6>{friend.username}</h6>
                        </div>
                      </div>
                    </Link>

                  ))
                }


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
      <PostCreation show={showCreate} close={handleCreateClose} setListPost={setListPost} listPost={listPost} setShowCreate={setShowCreate}
        offset={offset} setOffset={setOffset} />
      <PostEdition show={showEdit} setShow={setShowEdit} post={listPost[indexPost]} setListPost={setListPost} listPost={listPost} />
    </div>
  );
}

export default HomePage;
