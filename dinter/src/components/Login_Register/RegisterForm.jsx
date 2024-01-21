import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Bounce, toast } from 'react-toastify';
import $ from 'jquery';

function Register(props) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validated, setValidated] = useState(false);

    const handleRegister = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

            setValidated(true);
        } else {
            event.preventDefault();
            axios.post('http://localhost:3008/api/v1/user/register', {
                username,
                email,
                password,
                confirmPassword
            })
                .then(response => {
                    setValidated(false);
                    // Reset form
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    form.reset();

                    // Notify
                    toast.success(response.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });

                    // Change to login form
                    $("#signIn").click();
                })
                .catch(error => {
                    setValidated(false);
                    if(error.response.status === 404) {
                        toast.error(error.response.data.message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                            });
                    }
                })
        }

        
    }

    return (
        <div className="form-container sign-up-container">
            <Form noValidate validated={validated} className='login-form' action="#" onSubmit={handleRegister}>
                <h1 className='login-h1'>Create Account</h1>
                <div className="social-container">
                    <a className='login-a social' href="#" ><ion-icon name="logo-facebook"></ion-icon></a>
                    <a className='login-a social' href="#" ><ion-icon name="logo-google"></ion-icon></a>
                </div>
                <span className='login-span'>or use your email for registration</span>
                <Form.Group style={{width: "100%"}}>
                    <Form.Control 
                        className='login-input' 
                        type="text" 
                        placeholder="Username" 
                        onChange={e => setUsername(e.target.value)} 
                        required
                        pattern='.{3,}'
                        style={{
                            backgroundColor: "#eee",
                            border: "none",
                            padding: "12px 15px",
                            margin:" 8px 0",
                            width: "100%"
                        }}
                    />
                    <Form.Control.Feedback type='invalid'>
                        Username requires more than 3 characters
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group style={{width: "100%"}}>
                    <Form.Control 
                        className='login-input' 
                        type="email" 
                        placeholder="Email" 
                        onChange={e => setEmail(e.target.value)} 
                        required
                        style={{
                            backgroundColor: "#eee",
                            border: "none",
                            padding: "12px 15px",
                            margin:" 8px 0",
                            width: "100%"
                        }}
                    />
                </Form.Group>

                <Form.Group style={{width: "100%"}}>
                    <Form.Control 
                        className='login-input' 
                        type="password"  
                        placeholder="Password"  
                        onChange={e => setPassword(e.target.value)} 
                        required
                        style={{
                            backgroundColor: "#eee",
                            border: "none",
                            padding: "12px 15px",
                            margin:" 8px 0",
                            width: "100%"
                        }}
                    />
                </Form.Group>

                <Form.Group style={{width: "100%"}}>
                    <Form.Control 
                        className='login-input' 
                        type="password"  
                        placeholder="Confirm Password"  
                        onChange={e => setConfirmPassword(e.target.value)} 
                        required
                        style={{
                            backgroundColor: "#eee",
                            border: "none",
                            padding: "12px 15px",
                            margin:" 8px 0",
                            width: "100%"
                        }}
                    />
                </Form.Group>

                <button 
                    className='login-button' 
                    type='submit'
                    style={{marginTop: "10px"}}
                >Sign Up</button>
            </Form>
        </div>
    );
}

export default Register;