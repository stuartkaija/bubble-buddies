import React, { Component } from 'react';
import Input from '../../components/Input/Input';
import './EditProfilePage.scss';

export default class EditProfilePage extends Component {

    state = {
        user: null,

    }

    render() {
        return (
            <div className='edit'>
                <h2 className='edit__title'>Edit your profile</h2>
                <form className='edit__form' action="">
                    <Input label='First Name' type='text' name='firstname' id='firstname' />
                    <Input label='Last Name' type='text' name='lastname' id='lastname' />
                    <Input label='Years of Experience' type='text' name='exp' id='exp' />
                    <Input label='Certification' type='' name='' id='' />
                    <label className='edit__about-label' htmlFor="about">Share some fun facts about yourself here!</label>
                    <textarea className='edit__about-input' name="about" id="about" cols="30" rows="7"></textarea>
                </form>
                <button className='edit__button'>Submit</button>
            </div>
        );
    }
}
