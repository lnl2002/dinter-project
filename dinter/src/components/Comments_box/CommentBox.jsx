import React, { useState } from 'react';
import '../Comments_box/CommentBox.css'
import { motion } from "framer-motion"

function CommentBox({
  comment_data,
  onReplyComment,
  user
}) {
  const[isLiked, setIsLiked] = useState(false);
  const LikePost = ()=>{
    setIsLiked(!isLiked);
  }
    return (
      <div className='d-flex flex-row justify-content-between' style={{gap: '10px'}}>

        <div className='d-flex flex-row' style={{gap: '10px'}}>

          <AvatarDiv image={user.avatar}></AvatarDiv>

          <div className='d-flex flex-column  justify-content-center' style={{gap: '5px'}}>
            <div className='d-flex' style={{gap: '5px'}}>
              <p className='text-app-bold'>{user.username}</p>
              <p className='text-app-comment-normal'>{comment_data}</p>
            </div>
            
            {comment_data ? <div className='d-flex' style={{gap: '15px'}}>
              <p className='text-app-light'>15h</p>
              <p className='text-app-medium'>1910 likes</p>
              <button className='btn-app-func'>
                <p className='text-app-medium'>Reply</p>
              </button>
            </div> : ''}
          </div>

        </div>

        <div className='d-flex align-items-center'>
          {
            comment_data ?
              (
                <button className='btn-app-func' onClick={() => LikePost()}>
                  {
                    isLiked? 
                    <motion.svg 
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    aria-label="Unlike" class="x1lliihq x1n2onr6 xxk16z8" fill="red" height="13" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></motion.svg>  
                  :                
                  <svg aria-label="Like" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="13" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                }
                </button>
              )
              : 
            <svg aria-label="More options" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>          
          }
        </div>

      </div>
    );
}

const AvatarDiv = ({ image }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 40,
        borderRadius: "100%",
        overflow: "hidden",
      }}
    >
      <img src={image} style={{ width: "100%" }} alt="Avatar" />
    </div>
  );
};


export default CommentBox;