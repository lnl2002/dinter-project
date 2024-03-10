import React, { useEffect, useRef, useState } from 'react';

import CommentBox, { UserBox } from '../Comments_box/CommentBox';
import { motion } from "framer-motion"
import EmojiPicker from 'emoji-picker-react';
import '../PostDetail/PostDetail.css'
import axios from 'axios';
import { BACK_END_HOST } from '../../utils/AppConfig';
import { getAccessToken } from '../../common/Token';
import { TextWeb } from '../../pages/ProfileScreen';

function CommentsFrameLayout({
  user,
  postId,
  likes,
  content,
  date
}) {
  const sessionUser = JSON.parse(localStorage.getItem('User'));
  const [isLiked, setIsLiked] = useState(false);

  //for switching between comment and reply
  const [isCommenting, setIsCommenting] = useState(true)

  //normal comment
  const [commentValue, setCommentValue] = useState('');
  const [commentData, setCommentData] = useState([]);

  //replied comment
  const [repliedUserData, setRepliedUserData] = useState();
  const [repliedCommentData, setRepliedCommentData] = useState();
  const [repliedCommentId, setRepliedCommentId] = useState();

  const [isOpenImoji, setIsOpenEmoji] = useState(false);
  const commentInputRef = useRef(null)

  const LikePost = () => {
    setIsLiked(!isLiked);
  }
  const handleOnchangeCommentInput = (value) => {
    setCommentValue(value)
  }
  const handleOnSubmitForm = async (event) => {
    event.preventDefault();
    if(isCommenting){
      if (commentValue != '') {
        await postComment(commentValue);
      }
    } else{
      if (commentData != '') {
        await postReplyComment(commentValue, repliedUserData._id);
      }
    }
    setIsCommenting(true);
    setCommentValue('');
    setRepliedUserData({});
  };
  const getCommentsOfPost = async (postId, limit, offset) => {
    axios.get(BACK_END_HOST + "api/v1/comment/all-from/" + postId).then(res => {
      setCommentData(res.data.data);
    });
  }
  const postComment = async (value) => {
    let requestData = {
      postId: postId,
      content: value
    };
    let headers = {
      token: 'Bearer ' + getAccessToken(),
      'Content-Type': 'application/json',
    };
    axios.post(BACK_END_HOST + "api/v1/comment/post-comment/", requestData, { headers })
      .then((response) => {
        let newComment = response.data;
        const updatedComment = [{
          ...newComment,
          userId: {
            ...response.userId,
            _id: sessionUser.id,
            avatar: sessionUser.avatar,
            username: sessionUser.username
          }
        }, ...commentData]

        setCommentData(updatedComment)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const postReplyComment = async (value, replyToUserId) => {
    let requestData = {
      postId: postId,
      replyTo: replyToUserId,
      parentComment: repliedCommentId,
      content: value
    };
    let headers = {
      token: 'Bearer ' + getAccessToken(),
      'Content-Type': 'application/json',
    };
    axios.post(BACK_END_HOST + "api/v1/comment/post-comment/", requestData, { headers })
      .then((response) => {
        let newComment = response.data;
        setRepliedCommentData({
          ...newComment,
          userId: {
            ...response.userId,
            _id: sessionUser.id,
            avatar: sessionUser.avatar,
            username: sessionUser.username
          },
          replyTo:{
            ...repliedUserData
          }
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const focusReplyComment = (user, repliedCommentId) => {
    commentInputRef.current.focus();
    setIsCommenting(false);
    setRepliedCommentId(repliedCommentId);
    setRepliedUserData(user);
  }

  useEffect(() => {
    getCommentsOfPost(postId)
  }, [])

  return (
    <div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
      <div className='d-flex flex-column top-bar-comment-box p-3'>
        <UserBox user={user} comment_data={" • " + calculateTimeDifference(date)}></UserBox>
        <TextWeb className={'mt-2'} style={{ whiteSpace: 'pre-line' }} text={content}></TextWeb>
      </div>
      <div className='above-part' style={{ height: '80%' }}>
        <div className='d-flex flex-column comments-box p-3' style={{ gap: '30px' }}>
          {
            commentData?.map((c) =>
              <CommentBox key={c._id} repliedCommentData={repliedCommentId == c._id ? repliedCommentData : ''} isParentComment={true} user={c.userId} comment={c} onFinishSetUpComment={()=> setRepliedCommentData('')} onClickReplyComment={() => focusReplyComment(c.userId, c._id)} ></CommentBox>
            )
          }
        </div>
      </div>

      <div className='footer-box' style={{ height: '20%' }}>
        <div className='d-flex interact-comment-box flex-column p-3' style={{ gap: 10 }}>
          <div className='d-flex' style={{ gap: 15 }}>

            <button className='btn-app-func' onClick={() => LikePost()}>
              {isLiked ?
                <motion.svg
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  aria-label="Unlike" class="x1lliihq x1n2onr6 xxk16z8" fill="red" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></motion.svg>
                :
                <svg aria-label="Like" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
              }
            </button>

            <button className='btn-app-func' onClick={() => { }}>
              <svg aria-label="Comment" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
            </button>

          </div>

          <div className='d-flex flex-column'>
            <p className='text-app-bold'>{formatNumber(likes?.length)} likes</p>
            <p className='text-app-light'>{formatDate(date)}</p>
          </div>
        </div>

        <div className='d-flex input-comment-box p-3 align-items-center' style={{ gap: 10 }}>
          <EmojiPicker onEmojiClick={(emojiData) => { setCommentValue(emojiData.emoji); setIsOpenEmoji(false) }} open={isOpenImoji} style={{ position: 'absolute', marginBottom: '510px' }} />
          <button onClick={() => { setIsOpenEmoji(!isOpenImoji) }} style={{ background: 'none' }}>
            <svg aria-label="Emoji" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
          </button>
          <form style={{ width: '100%' }} className='p-0 d-flex input-comment-box justify-content-between' onSubmit={(e) => handleOnSubmitForm(e)}>
            {
              repliedUserData &&
              <button style={{ whiteSpace: 'nowrap', marginRight: '5px', background: '#ffdae2' }}>
                <TextWeb text={repliedUserData.username}></TextWeb>
              </button>
            }
            <input
              onKeyDown={(e) => {
                if (commentValue === '' && e.key === 'Backspace') {
                  setRepliedUserData({})
                  setIsCommenting(true)
                }
              }}
              style={{ width: '100%' }}
              ref={commentInputRef}
              value={commentValue}
              onChange={(e) => handleOnchangeCommentInput(e.target.value)}
              placeholder='Add a comment...' />
            <button type='submit' className='btn-app-func'>
              <p className='post-btn-title'>Post</p>
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}

export const formatNumber = (num) => {
  // Convert the number to a string
  const numStr = num.toString();

  // Split the string into groups of three digits
  const groups = [];
  for (let i = numStr.length; i > 0; i -= 3) {
    groups.unshift(numStr.slice(Math.max(i - 3, 0), i));
  }

  // Join the groups with commas
  return groups.join(',');
}

export const formatDate = (inputDate) => {
  const date = new Date(inputDate); // Parse the input string
  const day = date.getDate();
  const month = date.getMonth(); // Note: Months are zero-based (0 = January, 1 = February, etc.)
  const year = date.getFullYear();

  // Format the month name
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const formattedMonth = monthNames[month];

  // Format the day with the appropriate suffix
  let dayPrefix;
  if (day < 10) {
    dayPrefix = "0"
  }

  // Construct the final formatted string
  const formattedDate = `${formattedMonth} ${dayPrefix}${day}, ${year}`;
  return formattedDate;
}

export function calculateTimeDifference(isoDateString) {
  const givenDate = new Date(isoDateString);
  const currentDate = new Date();

  const timeDifferenceMs = currentDate - givenDate;
  const timeDifferenceSeconds = Math.floor(timeDifferenceMs / 1000);
  const timeDifferenceMinutes = Math.floor(timeDifferenceSeconds / 60);
  const timeDifferenceHours = Math.floor(timeDifferenceMinutes / 60);
  const timeDifferenceDays = Math.floor(timeDifferenceHours / 24);
  const timeDifferenceMonths = Math.floor(timeDifferenceDays / 31);
  const timeDifferenceYears = Math.floor(timeDifferenceMonths / 12);

  if (timeDifferenceMinutes < 60) {
    return `${timeDifferenceMinutes} minute${timeDifferenceMinutes === 1 ? '' : 's'}`;
  } else if (timeDifferenceHours < 24) {
    return `${timeDifferenceHours} hour${timeDifferenceHours === 1 ? '' : 's'}`;
  } else if (timeDifferenceDays < 31) {
    return `${timeDifferenceDays} day${timeDifferenceDays === 1 ? '' : 's'}`;
  } else if (timeDifferenceMonths < 12) {
    return `${timeDifferenceMonths} month${timeDifferenceMonths === 1 ? '' : 's'}`;
  } else {
    return `${timeDifferenceYears} year${timeDifferenceYears === 1 ? '' : 's'}`;
  }
}

export default CommentsFrameLayout;