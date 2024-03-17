import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import CommentsFrameLayout from '../Comments_frame_layout/CommentsFrameLayout';
import '../PostDetail/PostDetail.css'
import { BACK_END_HOST } from '../../utils/AppConfig';
import Carousel from 'react-bootstrap/Carousel';
import { create } from 'zustand';

function PostDetail({
  visible,
  post,
  user,
  onHideCallBack,
}) {
  const [indexImage, setIndexImage] = useState(0);
    //zustand user global state 
    const likesArray = usePostDetailStore((state) => state.likesArray)
    const setLikesArray = usePostDetailStore((state) => state.setLikesArray)

  useEffect(()=>{
    setIndexImage(0)
    setLikesArray(post.likes)
  },[post])

  const NavButton = ({ isNext, onClick }) => {
    return (
      <div>
        <button onClick={onClick} className='nav-button' style={{ background: 'none', display: (isNext && indexImage == post.images.length -1) || ( !isNext && indexImage==0) ? "none" : "block" }}>
          <svg fill="#f2f2f2" height="30px" width="30px" version="1.1" id="Layer_1" viewBox="0 0 512 512" stroke="#f2f2f2" transform={isNext ? "matrix(1, 0, 0, 1, 0, 0)" : "matrix(-1, 0, 0, 1, 0, 0)"}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M335.083,271.083 L228.416,377.749c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251c-8.341-8.341-8.341-21.824,0-30.165 L289.835,256l-91.584-91.584c-8.341-8.341-8.341-21.824,0-30.165s21.824-8.341,30.165,0l106.667,106.667 C343.424,249.259,343.424,262.741,335.083,271.083z"></path> </g> </g> </g></svg>
        </button>
      </div>
    )
  }

  return (
    <Modal show={visible} onHide={onHideCallBack} contentClassName='model-content' dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
      <Modal.Body className='post-detail justify-content-center align-items-center' style={{ padding: 0 }}>
        <div style={{ height: '90vh' }} className="d-flex flex-row justify-content-between header align-items-center">
          <div className='d-flex justify-content-center align-items-center' style={{ padding: 0, maxWidth: 750, height: '100%', width: 'fit-content', overflow: 'hidden' }}>

            <Carousel id='caro' controls={false} interval={null} style={{ height: '100%' }} activeIndex={indexImage}>
              {post.images.map(pi =>
                <Carousel.Item style={{ height: '100%' }}>
                  <img alt='post-view' width={'100%'} height='100%' src={BACK_END_HOST + pi} style={{objectFit: 'contain'}}/>
                </Carousel.Item>
              )}
            </Carousel>
            <div className='d-flex justify-content-between align-items-center' style={{ position: 'absolute', width: '100%', maxWidth: '750px', paddingLeft: '10px', paddingRight: '10px' }}>
              <NavButton onClick={() => setIndexImage(indexImage - 1)} isNext={false}></NavButton>
              <NavButton onClick={() => setIndexImage(indexImage + 1)} isNext={true}></NavButton>
            </div>
          </div>
          <div style={{ height: '100%', border: '1px solid #7c7c7c30', padding: 0, width: '35vw', maxWidth: 500, minWidth: 405 }}>
            <CommentsFrameLayout 
              user={user} 
              postId={post._id} 
              content={post.content} 
              likes={likesArray}
              date={post.createdAt}></CommentsFrameLayout>
          </div>
        </div>
      </Modal.Body>
      <button onClick={onHideCallBack} className='close-button'>
        <svg style={{ color: 'white' }} class="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Close</title><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></polyline><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
      </button>
    </Modal>
  );
}

export const usePostDetailStore = create((set) => ({
  likesArray: [],
  setLikesArray: (likesArray) => set((state) => ({ likesArray: likesArray}))
}))

export default PostDetail;