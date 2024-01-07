import React from 'react';

function Register(props) {
    return (
        <div className="form-container sign-up-container">
            <form className='login-form' action="#">
                <h1 className='login-h1'>Create Account</h1>
                <div className="social-container">
                    <a className='login-a social' href="#" ><ion-icon name="logo-facebook"></ion-icon></a>
                    <a className='login-a social' href="#" ><ion-icon name="logo-google"></ion-icon></a>
                </div>
                <span className='login-span'>or use your email for registration</span>
                <input className='login-input' type="text" placeholder="Name" />
                <input className='login-input' type="email" placeholder="Email" />
                <input className='login-input' type="password" placeholder="Password" />
                <button className='login-button'>Sign Up</button>
            </form>
        </div>
    );
}

export default Register;