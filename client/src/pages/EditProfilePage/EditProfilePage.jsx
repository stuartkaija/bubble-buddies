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

        console.log(exp.value);

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
                    <div className='edit__years-container'>
                        <label className='edit__years-label' htmlFor="exp">Years Experience</label>
                        <select className='edit__years-select' name="exp" id="exp" defaultValue='0-2'>
                            <option value="0-2">0-2</option>
                            <option value="3-5">3-5</option>
                            <option value="6-9">6-9</option>
                            <option value="10+">10+</option>
                        </select>
                    </div>
                    <div className='edit__cert-container'>
                        <label className='edit__cert-label' htmlFor="cert">Certification</label>
                        <select className='edit__cert-select' name="cert" id="cert" defaultValue='New Diver'>
                            <option value="New Diver">New Diver</option>
                            <option value="Open Water Diver">Open Water Diver</option>
                            <option value="Adventure Diver">Adventure Diver</option>
                            <option value="Advanced Open Water">Advanced Open Water</option>
                            <option value="Rescue Diver">Rescue Diver</option>
                            <option value="Master Scuba Diver">Master Scuba Diver</option>
                        </select>
                    </div>
                    <label className='edit__about-label' htmlFor="about">Share some fun facts about yourself here!</label>
                    <textarea className='edit__about-input' name="about" id="about" cols="30" rows="7"></textarea>
                </form>
                <button className='edit__button' form='edit-profile'>Submit</button>
            </div>
        );
    }
}
