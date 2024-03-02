import React, { useRef } from 'react'
import { Form, Modal } from 'react-bootstrap'
import axios from 'axios'
function PostEdition({ show, setShow, post, setListPost, listPost }) {
    const close = () => setShow(false);
    // console.log(post);
    const content = useRef();
    const handleEditPost = async () => {
        try {
            const postEdit = await axios.patch(`http://localhost:3008/api/v1/post/${post._id}`, {
                content: content.current.value
            });
            const arrPost = listPost.map((a) => {
                if (a._id === post._id) {
                    return postEdit.data.post
                }
                return a
            })
            setListPost(arrPost);
            close();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Modal show={show} onHide={close} centered>
            <Modal.Header>
                <span style={{ cursor: "pointer", color: "#fd2965" }} onClick={close}>Cancle</span>
                <span style={{ fontSize: "20px" }}>Create new post</span>
                <span style={{ cursor: "pointer", color: "#fd2965" }} onClick={handleEditPost}>Edit</span>
            </Modal.Header>
            <div className='form-post'>

                <div className='post-caption'>
                    <div className='user-info'>
                        <img src='images/common/avatar.png' alt='error' />
                        {post && <span>{post.author.username}</span>}
                    </div>
                    <div>
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Control as="textarea" rows={10} placeholder='Write a caption' defaultValue={post ? post.content : ""}
                                    ref={content} />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
        </Modal >
    )
}

export default PostEdition
