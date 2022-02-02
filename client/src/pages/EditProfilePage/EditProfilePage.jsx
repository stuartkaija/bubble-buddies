import axios from 'axios';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Header from '../../components/Header/Header';
import './EditProfilePage.scss';

export default class EditProfilePage extends Component {

    state = {
        error: null,
    }

    handleEditSubmit = (event) => {
        event.preventDefault();

        const { firstname, lastname, exp, cert, about } = event.target

        if (!firstname.value || !lastname.value) {
            alert('highlighted fields required!');
            this.setState({error: true})
            return;
        }

        axios
            .put('http://localhost:8080/users/edit', {
                id: this.props.match.params.userId,
                firstName: firstname.value,
                lastName: lastname.value,
                certification: cert.value,
                yearsExperience: exp.value,
                about: about.value
            })
            .then(response => console.log(response))
            .then(event.target.reset())
            .then(this.props.history.push('/' + this.props.match.params.userId))
            .catch(error => console.log(error));
    };

    handleDelete = (event) => {
        event.preventDefault();
        console.log(event);
        console.log(this.props.match.params.userId);

        axios
            .delete('http://localhost:8080/users/delete', {
                data: {id: this.props.match.params.userId}
            })
            .then(response => console.log(response))
            .then(this.props.history.push('/' + this.props.match.params.userId))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className='edit'>
                <Header 
                    // logout={this.handleLogout}
                    id={this.props.match.params.userId}
                    />
                <h2 className='edit__title'>Edit your profile</h2>
                <form className='edit__form' onSubmit={this.handleEditSubmit} action="" id='edit-profile'>
                    <div className='edit__name-container'>
                        <label className='edit__name-label' htmlFor="firstname" name='firstname' >First Name</label>
                        <input className={this.state.error ? 'edit__name-input--error' : 'edit__name-input'} type="text" name='firstname' id='firstname' placeholder='FIRST NAME'/>
                    </div>
                    <div className='edit__name-container'>
                        <label className='edit__name-label' htmlFor="lastname" name='lastname' >Last Name</label>
                        <input className={this.state.error ? 'edit__name-input--error' : 'edit__name-input'} type="text" name='lastname' id='lastname' placeholder='LAST NAME'/>
                    </div>
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
                <div className='edit__button-container'>
                    <button className='edit__button' onClick={this.handleDelete}>Delete Account</button>
                    <button className='edit__button' form='edit-profile'>Submit</button>
                </div>
                <div className='edit__button-container'>
                    {/* <button className='edit__button' onClick={this.handleDelete}>
                        <NavLink to=''>Delete Account</NavLink>
                    </button> */}

                </div>
            </div>
        );
    }
}
