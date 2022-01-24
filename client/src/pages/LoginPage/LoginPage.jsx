import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.scss';

export default class LoginPage extends Component {

    // state that says whether user is logged in or not

    render() {
        return (
            <div className='login'>
                <p className='login__title'>Log In</p>
                <form className='login__form'>
                    <input className='login__email' type="text" id='email' name='email' placeholder='EMAIL' />
                    <input className='login__password' type="password" id='password' name='password' placeholder='PASSWORD' />
                </form>
                <button className='login__button'>Log In</button>
                <p className='login__span'>Don't have an account?</p>
                <Link to='/signup'>
                    <button className='login__button'>Sign Up</button>
                </Link>
            </div>
        );
    }
}
