import React from 'react';

function Login(props) {
    return (
        <div className="form-container sign-in-container">
            <form className='login-form' action="#">
                <h1 className='login-h1'>Sign in</h1>
                <div className="social-container">
                    <a className='login-a social' href="#" ><ion-icon name="logo-facebook"></ion-icon></a>
                    <a className='login-a social' href="#" ><ion-icon name="logo-google"></ion-icon></a>
                </div>
                <span className='login-span'>or use your account</span>
                <input className='login-input' type="email" placeholder="Email" />
                <input className='login-input' type="password" placeholder="Password" />
                <a className='login-a' href="#">Forgot your password?</a>
                <button className='login-button'>Sign In</button>
            </form>
        </div>
    );
}

export default Login;