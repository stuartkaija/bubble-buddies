import React, { Component } from 'react';
import './LoginPage.scss';

export default class LoginPage extends Component {
    render() {
        return (
            <div className='login'>
                <p className='login__title'>Log In</p>
                <form className='login__form'>
                    <input className='login__email' type="text" id='email' name='email' placeholder='Email' />
                    <input className='login__password' type="password" id='password' name='password' placeholder='Password' />
                </form>
                <button className='login__button'>Log In</button>
            </div>
        );
    }
}
