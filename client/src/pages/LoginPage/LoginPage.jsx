import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import HeaderLoggedOut from '../../components/HeaderLoggedOut/HeaderLoggedOut';
import './LoginPage.scss';

export default class LoginPage extends Component {

    state = {
        loggedIn: false,
        error: "",
        userId: null
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
                if (response.data === 'Invalid password.') {
                    this.setState({ error: "Invalid Email/Password" })
                }
                sessionStorage.setItem("token", response.data.token);
                this.setState({ loggedIn: true, error: "", userId: response.data.userId })
            })
            .catch(() => {
                this.setState({ error: 'Incorrect username or password!' })
            });
    };

    render() {
        return (
            <div className='login'>
                <HeaderLoggedOut />
                <p className='login__title'>Log In</p>
                <form onSubmit={this.handleSubmit} aria-label='Log In Form' className='login__form' id='login'>
                    <input className='login__email' aria-label='Email Input' type="text" id='email' name='email' placeholder='EMAIL' />
                    <input className='login__password' aria-label='Password Input' type="password" id='password' name='password' placeholder='PASSWORD' />
                </form>
                {this.state.error && <p className='login__error'>{this.state.error}</p>}
                <button className='login__button' form='login'>Log In</button>
                {this.state.loggedIn && <Redirect to={"/" + this.state.userId} />}
                <div className='login__container'>
                    <p className='login__span'>Don't have an account?</p>
                    <Link to='/signup'>
                        <button className='login__button'>Sign Up</button>
                    </Link>
                </div>
            </div>
        );
    }
}
