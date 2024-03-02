import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

import './style/singpost.css'
import axios from 'axios';
function SinglePost({ post, handleShow, index }) {
    const [currentImage, setCurImg] = useState(0);
    const [like, setLike] = useState(post.favorited);
    const handleSetCurImg = (num) => {
        setCurImg(num + currentImage)
    }
    console.log(like);
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
        if (post.favorited) {
            setLike(false);
            await axios.delete(`http://localhost:3008/api/v1/post/favorite/${post._id}`, {
                headers: {
                    "Token": `Bearer ${getCookie('access_token')}`
                }
            })
        } else {
            setLike(true);
            await axios.post(`http://localhost:3008/api/v1/post/favorite/${post._id}`, {}, {
                headers: {
                    "Token": `Bearer ${getCookie('access_token')}`
                }
            })
        }
    }
    return (
        <>
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
                            <FontAwesomeIcon icon="ellipsis" onClick={() => handleShow(post._id, index)} />
                        </span>
                    </div>
                    <div style={{ marginTop: "5px", marginLeft: "2px" }}>
                        <p style={{ whiteSpace: "pre-line" }}>{post.content}</p>
                    </div>
                    <div className="photo">
                        {
                            currentImage > 0 && (
                                <div className='sg-pre-img' onClick={() => handleSetCurImg(-1)}>
                                    <ion-icon name="chevron-back-outline"></ion-icon>
                                </div>
                            )
                        }
                        <img src={'http://localhost:3008/' + post.images[currentImage]} alt="" width={650} />
                        {
                            currentImage < post.images.length - 1 && (
                                <div className='sg-next-img' onClick={() => handleSetCurImg(1)}>
                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                </div>
                            )
                        }
                        {
                            post.images.length > 1 && (
                                <div className='sg-img-point'>{
                                    post.images.map((image, index) => {
                                        return (
                                            <div className={index === currentImage ? 'sg-cur-img' : 'sg-img'}>
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
                                <FontAwesomeIcon icon="heart" onClick={handleLike} className={like === true ? 'liked' : ''} /><i> </i>
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
            </div >

        </>
    )
}

export default SinglePost
