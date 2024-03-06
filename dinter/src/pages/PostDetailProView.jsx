import React, { useEffect, useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import '../components/PostDetail/PostDetail.css'
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from 'react-router-dom';
import { BACK_END_HOST } from '../utils/AppConfig';
import axios from 'axios';
import CommentsFrameLayout from '../components/Comments_frame_layout/CommentsFrameLayout';
import PostDetail from '../components/PostDetail';

function PostDetailProView() {
  const { postId } = useParams();
  const [indexImage, setIndexImage] = useState(0);
  const [post, setPost] = useState(0);
  const [userData, setUserData] = useState();

  const LoadUserPublicInfo = async (userId) => {
    axios.get(BACK_END_HOST + "api/v1/user/public-user-info/" + userId).then(res => {
      setUserData(res.data)
      console.log(res.data)
    });
  }

  const LoadPost = async (postId) => {
    axios.get(BACK_END_HOST + "api/v1/post/" + postId).then(res => {
      setPost(res.data.data);
      LoadUserPublicInfo(res.data.data.author)
    });
  }

  useEffect(() => {
    LoadPost(postId)
  }, [])

  const NavButton = ({ isNext, onClick }) => {
    return (
      <div>
        <button onClick={onClick} className='nav-button' style={{ background: 'none', display: (isNext && indexImage == post.images.length - 1) || (!isNext && indexImage == 0) ? "none" : "block" }}>
          <svg fill="#f2f2f2" height="30px" width="30px" version="1.1" id="Layer_1" viewBox="0 0 512 512" stroke="#f2f2f2" transform={isNext ? "matrix(1, 0, 0, 1, 0, 0)" : "matrix(-1, 0, 0, 1, 0, 0)"}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M335.083,271.083 L228.416,377.749c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251c-8.341-8.341-8.341-21.824,0-30.165 L289.835,256l-91.584-91.584c-8.341-8.341-8.341-21.824,0-30.165s21.824-8.341,30.165,0l106.667,106.667 C343.424,249.259,343.424,262.741,335.083,271.083z"></path> </g> </g> </g></svg>
        </button>
      </div>
    )
  }

  return (
    post && userData ?
      <PostDetail visible={true} onHideCallBack={() => {window.location.href = '/'}} post={post} user={userData} ></PostDetail> :
      ''
  );
}

export default PostDetailProView;