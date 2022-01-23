import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.scss';

export default class LandingPage extends Component {

    // event handler for when user signs up - will make axios post request to backend to create a new user with credentials that are inputted
    handleSubmit = (event) => {
        event.preventDefault();

        const validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!event.target.email.value.match(validRegexEmail)) {
            return alert("Please enter a valid email address.")
        }

        if (!event.target.email.value || !event.target.password.value || !event.target.confirmPassword.value) {
            return alert ('please fill in all fields')
        }

        if (event.target.password.value !== event.target.confirmPassword.value) {
            return alert ('passwords do not match');
        }

        // axios post request here to the back end to post newly signed up user to JSON data

    };

    render() {
        return (
            <div className='sign-up'>
                <p className='sign-up__title'>Sign Up</p>
                {/* this needs to having a signup form that makes an axios request to backend for registering a new user, as well as links to sign up page and another link to login page */}
                <form onSubmit={this.handleSubmit} className='sign-up__form' id="signup">
                    <input className='sign-up__email' type="text" name='email' id='email' placeholder='Email' />
                    <input className='sign-up__password' type="password" name='password' id='password' placeholder='Password' />
                    <input className='sign-up__password' type="password" name='confirmPassword' id='confirmPassword' placeholder='Confirm Password' />   
                </form>
                <button className='sign-up__button' form='signup'>Sign Up</button>
                <p className='sign-up__span'>Have an account?</p>
                {/* this login button will LINK to the login page thus it needs to be in a link tag */}
                <Link to='/login'>
                    <button className='sign-up__button'>Log In</button>
                </Link>
            </div>
        )
    }
}
