import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import emailjs from '@emailjs/browser';

const ForgotPassword = ({props}) => {
    const { show, setShow, handleClose, handleShow} = props;

    // Forgot password
    const sendEmail = () => {
        emailjs.init({
            publicKey: "71YulOO_zQhIllKwe",
        });

        var templateParams = {
            email: 'binhtrong1601@gmail.com',
            name: 'Bình Oxi',
            message: 'link abc'
        };
          
        emailjs.send('service_59t7ojj', 'template_6e30u9m', templateParams).then(
            (response) => {
              console.log('SUCCESS!', response.status, response.text);
            },
            (error) => {
              console.log('FAILED...', error);
            },
        );
    }
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
                <button type='submit' className='login-button' onClick={handleClose, sendEmail}>Send login link</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ForgotPassword;