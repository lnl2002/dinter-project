import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import emailjs from '@emailjs/browser'
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = ({props}) => {
    console.log('props',props);
    const { show, setShow, handleClose, handleShow} = props;
    const [email, setEmail] = useState('');

    function sendMail(email) {
        const token = uuidv4();
        var params = {
            name: email,
            email: email,
            message: `http://localhost:3000/reset-password/${email}-${token}`,
        };
        const serviceID = "service_59t7ojj";
        const templateID = "template_6e30u9m";
        const publicKey = "71YulOO_zQhIllKwe";
        emailjs.send(serviceID, templateID, params, publicKey)
            .then(res => {
                console.log('res================', res);
                axios.post('http://localhost:3008/api/v1/user/reset-password', {
                    email: email,
                    uuid: token
                })
                 .then(res => {
                    setEmail("");
                    toast.success("Email was sent");
                    handleClose()
                 })
                 .catch(err => {
                    toast.error("Something went wrong");
                 })
                
            })
            .catch(err => {
                toast.error("Something went wrong");
                console.log(err);
            });
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
                            onChange = { e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{justifyContent: "center"}}>
                <button type='submit' className='login-button' onClick={() => sendMail(email)}>Send login link</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ForgotPassword;