import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.scss';

export default class LoginPage extends Component {

    // state that says whether user is logged in or not
    state = {
        loggedIn: false
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (!event.target.email.value || !event.target.password.value) {
            return alert('Email and Password are necessary')
        }

        axios
            .post('http://localhost:8080/users/login', {
                email: event.target.email.value,
                password: event.target.password.value
            })
            .then((response) => {
                console.log(response);
            })
    };

    render() {
        return (
            <div className='login'>
                <p className='login__title'>Log In</p>
                <form onSubmit={this.handleSubmit} className='login__form' id='login'>
                    <input className='login__email' type="text" id='email' name='email' placeholder='EMAIL' />
                    <input className='login__password' type="password" id='password' name='password' placeholder='PASSWORD' />
                </form>
                <button className='login__button' form='login'>Log In</button>
                <p className='login__span'>Don't have an account?</p>
                <Link to='/signup'>
                    <button className='login__button'>Sign Up</button>
                </Link>
            </div>
        );
    }
}
