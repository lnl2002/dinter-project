import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { BACK_END_HOST } from '../../utils/AppConfig';

function CallVideoRequestModal(props) {
    const { requestCallVideoInfo, setRequestCallVideoInfo } = useContext(AuthContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const user = JSON.parse(localStorage.getItem('User'));

    useEffect(() => {
        if (requestCallVideoInfo) {
            handleShow();
        }
    }, [requestCallVideoInfo]);

    const pickUp = () => {
        window.location.href = `/call-video/${requestCallVideoInfo.uuid}`;
    }

    console.log('requestCallVideoInfo', requestCallVideoInfo);

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                
                <Modal.Body>
                    <div>
                        <div className='d-flex justify-content-center'>
                            <div style={{
                                width: '90px',
                                height: '90px',
                                borderRadius: '50%',
                                overflow: 'hidden'
                            }}>
                                <img width={'100%'} src={requestCallVideoInfo && (BACK_END_HOST + requestCallVideoInfo.user.avatar)} alt="avatar" />
                            </div>
                        </div>
                        <div className='text-center'>
                            <strong>
                            {requestCallVideoInfo && requestCallVideoInfo.user.username}
                            </strong>
                            <span> is calling for you.</span>
                        </div>
                        <div className='d-flex justify-content-center align-items-center'>
                            <div style={{
                                background: '#ff443d',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                color: 'white',
                                padding: '10px',
                                margin: '10px',
                                cursor: 'pointer'
                            }}>
                                <ion-icon style={{fontSize: '26px'}} name="close-outline"></ion-icon>
                            </div>
                            <div style={{
                                background: '#39cc4d',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                color: 'white',
                                padding: '10px',
                                margin: '10px',
                                cursor: 'pointer'
                            }}
                                onClick={pickUp}
                            >
                                <ion-icon style={{fontSize: '26px'}} name="videocam-outline"></ion-icon>
                            </div>
                        </div>
                    </div>

                </Modal.Body>

            </Modal>
        </>
    );
}

export default CallVideoRequestModal;