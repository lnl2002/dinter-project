import React, { useEffect, useState } from 'react';
import '../Comments_box/CommentBox.css'
import { motion } from "framer-motion"
import { calculateTimeDifference, formatNumber } from '../Comments_frame_layout/CommentsFrameLayout';
import { BACK_END_HOST } from '../../utils/AppConfig';
import axios from 'axios';

const CommentBox = React.memo(({
  comment,
  isParentComment,
  onClickReplyComment,
  onFinishSetUpComment,
  repliedCommentData,
  style,
  user
}) => {
  const [repliedComment, setRepliedComment] = useState([])
  const [isShowReply, setIsShowReply] = useState(false)
  const [isShowReplyPreview, setIsShowReplyPreview] = useState(false)
  const [repliedCommentNumber, setRepliedCommentNumber] = useState(0)
  const [isLiked, setIsLiked] = useState(false);
  const LikePost = () => {
    setIsLiked(!isLiked);
  }

  const getRepliedCommentNumber = async () => {
    axios.get(BACK_END_HOST + "api/v1/comment/count-reply/" + comment._id).then(response => {
      setRepliedCommentNumber(response.data)
    })
  }

  const getRepliedComment = async () => {
    axios.get(BACK_END_HOST + "api/v1/comment/all-reply-from/" + comment._id).then(response => {
      setRepliedComment(response.data)
    })
  }

  useEffect(() => {
    if (isParentComment) {
      getRepliedCommentNumber()
      // getRepliedComment()
    }
  }, [])

  useEffect(() => {
    if ( repliedCommentData && repliedCommentData != '') {
      setRepliedComment([
        ...repliedComment,
        repliedCommentData
      ])
      onFinishSetUpComment()
      if(!isShowReply){
        if(repliedCommentNumber == 0){
          setIsShowReply(true)
          setRepliedCommentNumber(1)
        }else{
          setIsShowReplyPreview(true)
        }
      }
    } 
    console.log(repliedCommentData)
  }, [repliedCommentData])

  return (
    comment ? <div style={style}>

    <div style={{ width: '100%', gap: '10px' }} className='d-flex flex-row justify-content-between'>
      {
        user &&
        <UserBox user={user} repliedUserTagData={comment.replyTo} comment_data={comment.content}>
          <div className='d-flex' style={{ gap: '15px' }}>
            <p className='text-app-light'>{calculateTimeDifference(comment.createdAt)}</p>
            <p className='text-app-medium'>{formatNumber(comment.liked?.length ?? 0)} likes</p>
            <button onClick={() => { onClickReplyComment() }} className='btn-app-func'>
              <p className='text-app-medium'>Reply</p>
            </button>
          </div>
        </UserBox>
      } 

      <div className='d-flex align-items-center'>
        <button className='btn-app-func' onClick={() => LikePost()}>
          {
            isLiked ?
              <motion.svg
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                aria-label="Unlike" class="x1lliihq x1n2onr6 xxk16z8" fill="red" height="13" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></motion.svg>
              :
              <svg aria-label="Like" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="13" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
          }
        </button>
      </div>
    </div>

    {
      repliedCommentNumber && repliedCommentNumber > 0 ?
        <div style={{ marginLeft: '50px' }}>
          <button onClick={() => { getRepliedComment(); setIsShowReply(!isShowReply);setIsShowReplyPreview(false) ;getRepliedCommentNumber() }} style={{ background: 'none' }}>
            <div className='d-flex align-items-center' style={{ gap: '10px' }}>
              <div style={{ width: '25px', height: '1px', background: '#8b8b8b' }}></div>
              <p className='text-app-medium'>{isShowReply ? 'Hide replies' : `View replies (${repliedCommentNumber})`}</p>
            </div>
          </button>
          <div style={{ display: isShowReply ? 'block' : 'none' }}>
            {
              repliedComment && repliedComment.length > 0 && repliedComment?.map(cr => <CommentBox isParentComment={false} style={{ marginTop: '20px' }} onClickReplyComment={onClickReplyComment} comment={cr} user={cr?.userId}></CommentBox>)
            }
          </div>
          <div style={{ display: isShowReplyPreview ? 'block' : 'none' }}>
            {
              <CommentBox isParentComment={false} style={{ marginTop: '20px' }} onClickReplyComment={onClickReplyComment} comment={repliedComment[repliedComment.length-1]} user={repliedComment[repliedComment.length-1]?.userId}></CommentBox>
            }
          </div>
        </div> : <></>
    }

  </div> : <></>
  );
});

export const UserBox = ({ user, comment_data, repliedUserTagData, children }) => {

  return (
    <div className='d-flex flex-row' style={{ gap: '10px' }}>

      <AvatarDiv image={BACK_END_HOST + user.avatar ?? 'images/common/card.png'}></AvatarDiv>

      <div className='d-flex flex-column  justify-content-center' style={{ gap: '5px' }}>
        <span className='text-app-comment-normal' style={{ gap: '5px' }}>
          <button style={{ marginRight: '5px' }} className='btn-app-func' onClick={() => { window.location.href = ('/profile/' + user._id) }}><p className='text-app-bold'>{user.username}</p></button>
          {
            repliedUserTagData &&
            <>
              <svg width={'8px'} height={'8px'} viewBox="-3 0 28 28" version="1.1" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>play</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" > <g id="Icon-Set-Filled" transform="translate(-419.000000, -571.000000)" fill="#707070"> <path d="M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,583.554" id="play" > </path> </g> </g> </g></svg>
              <button style={{ whiteSpace: 'nowrap', marginRight: '5px', background: '#ffdae2', borderRadius: '5px', paddingLeft: '5px', paddingRight: '5px' }}>
                <p className='text-app-bold'>@{repliedUserTagData.username}</p>
              </button>
            </>
          }
          {comment_data}
        </span>
        {children}
      </div>

    </div>
  )
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