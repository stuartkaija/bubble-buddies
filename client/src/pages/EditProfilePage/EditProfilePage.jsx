import axios from 'axios';
import React, { Component } from 'react';
import Input from '../../components/Input/Input';
import './EditProfilePage.scss';

export default class EditProfilePage extends Component {

    state = {
        user: null,

    }

    handleEditSubmit = (event) => {
        event.preventDefault();

        const { firstname, lastname, exp, cert, about } = event.target

        axios
            .put('http://localhost:8080/users/edit', {
                id: this.props.location.user,
                firstName: firstname.value,
                lastName: lastname.value,
                certification: cert.value,
                yearsExperience: exp.value,
                about: about.value
            })
            .then(response => console.log(response))
            .then(event.target.reset())
            .catch(error => console.log(error));

    };

    
    render() {

        return (
            <div className='edit'>
                <h2 className='edit__title'>Edit your profile</h2>
                <form onSubmit={this.handleEditSubmit} className='edit__form' action="" id='edit-profile'>
                    <Input label='First Name' type='text' name='firstname' id='firstname' />
                    <Input label='Last Name' type='text' name='lastname' id='lastname' />
                    <Input label='Years of Experience' type='text' name='exp' id='exp' />
                    <Input label='Certification' type='text' name='cert' id='cert' />
                    <label className='edit__about-label' htmlFor="about">Share some fun facts about yourself here!</label>
                    <textarea className='edit__about-input' name="about" id="about" cols="30" rows="7"></textarea>
                </form>
                <button className='edit__button' form='edit-profile'>Submit</button>
            </div>
        );
    }
}
