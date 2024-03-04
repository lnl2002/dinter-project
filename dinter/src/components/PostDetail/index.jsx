import React from 'react';
import { Modal } from 'react-bootstrap';
import CommentsFrameLayout from '../Comments_frame_layout/CommentsFrameLayout';
import '../PostDetail/PostDetail.css'
import { BACK_END_HOST } from '../../utils/AppConfig';


function PostDetail({
  visible,
  post,
  user,
  onHideCallBack,
}) {
    return (
      <Modal show={visible} onHide={onHideCallBack} contentClassName='model-content' dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
        <Modal.Body className='post-detail justify-content-center align-items-center' style={{padding:0}}>
            <div style={{height: '90vh'}} className="d-flex flex-row justify-content-between header align-items-center">
                <div className='d-flex justify-content-center' style={{padding:0, maxWidth: 750, height:'100%', width: 'fit-content', overflow: 'hidden'}}>
                  <img alt='post-view' height='100%' src={BACK_END_HOST+post.images[0]}/>
                </div>
                <div style={{height: '100%', border: '1px solid #7c7c7c30' ,padding:0, width: '35vw' ,maxWidth: 500, minWidth: 405}}>
                  <CommentsFrameLayout user={user} postId={post._id}></CommentsFrameLayout>
                </div>
            </div>
        </Modal.Body>
        <button onClick={onHideCallBack} className='close-button'>
          <svg style={{color:'white'}} class="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Close</title><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></polyline><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
        </button>
      </Modal>
    );
}

export default PostDetail;