import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import uniqid from 'uniqid';
import './SignUpPage.scss';

export default class SignUp extends Component {

    // event handler for when user signs up - will make axios post request to backend to create a new user with credentials that are inputted
    handleSubmit = (event) => {
        event.preventDefault();

        const validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!event.target.email.value || !event.target.userName.value || !event.target.firstName.value || !event.target.lastName.value || !event.target.password.value || !event.target.confirmPassword.value) {
            return alert ('please fill in all fields')
        }

        // if (!event.target.email.value.match(validRegexEmail)) {
        //     return alert("Please enter a valid email address.")
        // }

        if (event.target.password.value !== event.target.confirmPassword.value) {
            return alert ('passwords do not match');
        }

        // axios post request here to the back end to post newly signed up user to JSON data
        axios
            .post('http://localhost:8080/users', {
                id: uniqid(),
                email: event.target.email.value,
                firstName: event.target.firstName.value,
                lastName: event.target.lastName.value,
                userName: event.target.userName.value,
                password: event.target.password.value,
                certification: "",
                yearsExperience: null,
                displayPicture: ""
            })
            .then((response) => {
                console.log(response);
            })
            .then(() => {
                console.log(this.props.history);
            })
            .catch((error) => {
                console.log(error);
            });

    };

    render() {
        return (
            <div className='sign-up'>
                <p className='sign-up__title'>Sign Up</p>
                {/* this needs to having a signup form that makes an axios request to backend for registering a new user, as well as links to sign up page and another link to login page */}
                <form onSubmit={this.handleSubmit} className='sign-up__form' id="signup">
                    <input className='sign-up__input' type="text" name='userName' id='userName' placeholder='User Name' />
                    <input className='sign-up__input' type="text" name='firstName' id='firstName' placeholder='First Name' />
                    <input className='sign-up__input' type="text" name='lastName' id='lastName' placeholder='Last Name' />
                    <input className='sign-up__email' type="text" name='email' id='email' placeholder='Email' />
                    <input className='sign-up__password' type="password" name='password' id='password' placeholder='Password' />
                    <input className='sign-up__password' type="password" name='confirmPassword' id='confirmPassword' placeholder='Confirm Password' />

                </form>
                <button className='sign-up__button' form='signup'>Sign Up</button>
                <p className='sign-up__span'>Have an account?</p>
                <Link to='/'>
                    <button className='sign-up__button'>Log In</button>
                </Link>
            </div>
        )
    }
}
