import React from 'react';
import './style/login.css'
import RegisterForm from '../components/Login_Register/RegisterForm';
import LoginForm from '../components/Login_Register/LoginForm';
import $ from 'jquery'
import { ToastContainer } from 'react-toastify';

function Login(props) {
    $(document).ready(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');
        
        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });
    
        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    })
    return (
        <div className='login-body'>
            <ToastContainer />
            <div className="login-container" id="container">

                <RegisterForm/>
                <LoginForm/>
                
                <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1 className='login-h1'>Welcome Back!</h1>
                        <p className='login-p'>To keep connected with us please login with your personal info</p>
                        <button className='login-button ghost' id="signIn">Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1 className='login-h1'>Hello, Friend!</h1>
                        <p className='login-p'>Enter your personal details and start the journey with us</p>
                        <button className='login-button ghost'  id="signUp">Sign Up</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Login;