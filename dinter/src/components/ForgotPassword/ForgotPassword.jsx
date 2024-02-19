import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ForgotPassword = ({props}) => {
    console.log('props',props);
    const { show, setShow, handleClose, handleShow} = props;
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Forgot Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{justifyContent: "center"}}>
                <button type='submit' className='login-button' onClick={handleClose}>Send login link</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ForgotPassword;