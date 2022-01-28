import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import uniqid from 'uniqid';
import './SignUpPage.scss';

export default class SignUp extends Component {

    state = {
        error: "",
        success: false,
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!event.target.email.value || !event.target.password.value || !event.target.confirmPassword.value) {
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
            .post('http://localhost:8080/users/signup', {
                id: uniqid(),
                email: event.target.email.value,
                firstName: "",
                lastName: "",
                password: event.target.password.value,
                certification: "",
                yearsExperience: null,
                displayPicture: "/photos/default_profile.jpeg"
            })
            .then(() => {
                this.setState({
                    success: true,
                    error: ""
                })
                event.target.reset();
            })
            .catch((error) => {console.log(error)});
    };

    render() {
        return (
            <div className='sign-up'>
                <p className='sign-up__title'>Sign Up</p>
                <form onSubmit={this.handleSubmit} className='sign-up__form' id="signup">
                    <input className='sign-up__email' type="text" name='email' id='email' placeholder='Email' />
                    <input className='sign-up__password' type="password" name='password' id='password' placeholder='Password' />
                    <input className='sign-up__password' type="password" name='confirmPassword' id='confirmPassword' placeholder='Confirm Password' />
                </form>
                <button className='sign-up__button' form='signup'>Sign Up</button>
                <div className='sign-up__container'>
                    <p className='sign-up__span'>Have an account?</p>
                    {this.state.success && <div className='sign-up__success'>Signed Up! Please Log In Below</div>}
                    <Link to='/'>
                        <button className='sign-up__button'>Log In</button>
                    </Link>
                </div>
            </div>
        )
    }
}
