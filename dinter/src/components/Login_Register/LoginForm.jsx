import React, { useContext, useState } from 'react';
import axios from 'axios'
import { Bounce, toast } from 'react-toastify';
import { setTokenToCookies } from '../../common/Token';
import {Form} from 'react-bootstrap'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function Login(props) {
    const nav = useNavigate();
    const {setUser} = useContext(AuthContext);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);

    const handleSignIn = (event) => {

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            axios.post('http://localhost:3008/api/v1/user/login', {email, password})
                .then(response => {
                    setTokenToCookies(response.data.accessToken, response.data.refreshToken);
                    localStorage.setItem('User', JSON.stringify(response.data.data)); 
                    setUser(response.data.data);
                    nav('/');
                })
                .catch(error => {
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
                });
        }

        setValidated(true);

    }   

    return (
        <div className="form-container sign-in-container">
            <Form noValidate validated={validated} className='login-form' action="#" onSubmit={handleSignIn}>
                <h1 className='login-h1'>Sign in</h1>
                <div className="social-container">
                    <a className='login-a social' href="#" ><ion-icon name="logo-facebook"></ion-icon></a>
                    <a className='login-a social' href="#" ><ion-icon name="logo-google"></ion-icon></a>
                </div>
                <span className='login-span'>or use your account</span>
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
                
                <a className='login-a' href="#">Forgot your password?</a>
                <button type='submit' className='login-button'>Sign In</button>
            </Form>
        </div>
    );
}

export default Login;