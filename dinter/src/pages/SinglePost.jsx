import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style/singpost.css'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { Button, Modal } from 'react-bootstrap';
import PostDetail from '../components/PostDetail';
function SinglePost({ post, handleShow, index, listPost }) {
    const user = JSON.parse(localStorage.getItem('User'));

    const { sendNotification } = useContext(AuthContext);

    const [currentImage, setCurImg] = useState(0);
    const [like, setLike] = useState(post.favorited);
    const handleSetCurImg = (num) => {
        setCurImg(num + currentImage)
    }
    const nav = useNavigate();
    const [pst, setPost] = useState(post);
    const [show, setShow] = useState(false);
    const [showPrivate, setShowPrivate] = useState(false);
    const [showPostDetail, setShowPostDetail] = useState(false);
    const handleClose = () => setShow(false);
    const handleShowlike = () => setShow(true);
    const handlePrivate = () => {
        setShowPrivate(false);
    }
    useEffect(() => {
        if (post) {
            post.likes.forEach((l) => {
                if (l._id === user.id) {
                    setLike(true);
                    return;
                }
            })
        }
    }, [])

    useEffect(() => {
        setPost(post);
    }, [listPost])
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
    const handleLike = async () => {
        try {
            if (like) {
                const updatePost = await axios.delete(`http://localhost:3008/api/v1/post/favorite/${post._id}`, {
                    headers: {
                        "Token": `Bearer ${getCookie('access_token')}`
                    }
                })
                setPost(updatePost.data)
                setLike(false);
            } else {
                const updatePost = await axios.post(`http://localhost:3008/api/v1/post/favorite/${post._id}`, {}, {
                    headers: {
                        "Token": `Bearer ${getCookie('access_token')}`
                    }
                })
                setPost(updatePost.data)
                setLike(true);
                sendNotification(
                    'like',
                    `/post/${updatePost.data._id}`,
                    updatePost.data.author._id,
                    user.id
                )
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleChangeMode = async (modeB) => {
        try {
            let mode;
            modeB === 1 ? mode = false : mode = true;
            if (pst.isHide === mode) {
                return;
            }
            const updatePost = await axios.post(`http://localhost:3008/api/v1/post/mode/${pst._id}`, {
                mode: mode
            }, {
                headers: {
                    "Token": `Bearer ${getCookie('access_token')}`
                }
            })
            setPost(updatePost.data.data);
            console.log(updatePost.data);
            setShowPrivate(false);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {
                post && (
                    <div className="feeds" key={pst._id}>
                        <PostDetail visible={showPostDetail} onHideCallBack={() => setShowPostDetail(false)} post={post} user={user}></PostDetail>
                        <div className="feed">
                            <div className="head">
                                <div className="user">
                                    <div className="profile-photo2">
                                        <img src={"http://localhost:3008/" + pst.author.avatar} alt="" width={50} />
                                    </div>
                                    <div className="ingo">
                                        <button style={{ background: 'none' }} onClick={() => nav('/profile/' + pst.author._id)}><h5>{pst.author.username}</h5></button>
                                        {
                                            pst.isHide === false ? (
                                                <ion-icon name="earth" style={{ marginLeft: "10px", fontSize: "20px", cursor: "pointer" }} onClick={() => {
                                                    if(pst.author._id === user.id) {
                                                        setShowPrivate(true)
                                                    }
                                                }}></ion-icon>
                                            ) : (
                                                <ion-icon name="lock-closed" style={{ marginLeft: "10px", fontSize: "20px", cursor: "pointer" }} onClick={() => {
                                                    if(pst.author._id === user.id) {
                                                        setShowPrivate(true)
                                                    }
                                                }}></ion-icon>
                                            )
                                        }
                                        <br />
                                        <small>
                                            {
                                                formatDistanceToNow(pst.createdAt, {
                                                    addSuffix: true,
                                                })
                                            }
                                        </small>
                                    </div>

                                </div>
                                {
                                    JSON.parse(localStorage.getItem('User')).id === pst.author._id && (
                                        <span className="edit">
                                            <FontAwesomeIcon icon="ellipsis" onClick={() => handleShow(pst._id, index)} />
                                        </span>
                                    )
                                }
                            </div>
                            <div style={{ marginTop: "5px", marginLeft: "2px" }}>
                                <p style={{ whiteSpace: "pre-line" }}>{pst.content}</p>
                            </div>
                            <div className="photo">
                                {
                                    currentImage > 0 && (
                                        <div className='sg-pre-img' onClick={() => handleSetCurImg(-1)}>
                                            <ion-icon name="chevron-back-outline"></ion-icon>
                                        </div>
                                    )
                                }
                                <img src={'http://localhost:3008/' + pst.images[currentImage]} alt="" id='post-img' />
                                {
                                    currentImage < pst.images.length - 1 && (
                                        <div className='sg-next-img' onClick={() => handleSetCurImg(1)}>
                                            <ion-icon name="chevron-forward-outline"></ion-icon>
                                        </div>
                                    )
                                }
                                {
                                    pst.images.length > 1 && (
                                        <div className='sg-img-point'>{
                                            pst.images.map((image, index) => {
                                                return (
                                                    <div className={index === currentImage ? 'sg-cur-img' : 'sg-img'} key={index}>
                                                    </div>
                                                )
                                            })
                                        }
                                        </div>
                                    )
                                }
                            </div>

                            <div className="action-buttons">
                                <div className="inter-buttons">
                                    <span >
                                        <FontAwesomeIcon icon="heart" onClick={handleLike} className={`favorite-icon ${like === true ? 'liked' : ''}`} /><i> </i>
                                        <FontAwesomeIcon icon="comments" /><i> </i>
                                    </span>
                                </div>
                                <div className="booknark">
                                    <span >
                                        <FontAwesomeIcon icon={faBookmark} />
                                    </span>
                                </div>
                            </div>
                            {
                                (pst.likes.length !== 0) && (
                                    <div className="liked-by" onClick={handleShowlike}>
                                        <a>Liked by <b>{pst.likes.length !== 0 && pst.likes[0].username}</b> {pst.likes.length - 1 !== 0 && (<> and <b>{`${pst.likes.length - 1} other`} </b></>)}</a>
                                    </div>
                                )
                            }
                            <button onClick={() => setShowPostDetail(true)} style={{ background: 'none' }} className="text-muted">View all {pst.comments.length} comment</button>
                        </div>
                    </div >
                )
            }

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body>
                    <div style={{ height: "300px", overflow: "auto" }}>
                        {
                            pst.likes.map((p) => {
                                return (
                                    <div style={{ marginTop: "20px" }}>
                                        <img src={`http://localhost:3008/${p.avatar}`} style={{ height: "50px", width: "50px", borderRadius: "50%", marginRight: "20px" }} />
                                        {p.username}
                                    </div>
                                )
                            })
                        }
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={showPrivate} onHide={handlePrivate} centered>
                <Modal.Body style={{ padding: "0" }}>
                    <ul className="mode-option">
                        <li className={!pst.isHide && 'mode-post'} onClick={() => handleChangeMode(1)}>Public Post</li>
                        <hr style={{ margin: "0" }}></hr>
                        <li className={pst.isHide && 'mode-post'} onClick={() => handleChangeMode(2)}>Private Post</li>
                    </ul>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default SinglePost
