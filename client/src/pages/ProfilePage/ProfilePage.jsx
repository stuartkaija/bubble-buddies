import React, { Component } from 'react';
import './ProfilePage.scss';
import DisplayPicture from '../../components/DisplayPicture/DisplayPicture';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

export default class ProfilePage extends Component {

    state = {
        user: null,
        failedAuth: false
    }

    componentDidMount () {
        const token = sessionStorage.getItem('token');

        if (!token) {
            this.setState({ failedAuth: true });
            return;
        }

        axios
            .get('http://localhost:8080/users/current', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then((response) => {
                this.setState({
                    user: response.data
                })
            })
            .catch(error => console.log(error));
    }

    handleLogout = () => {
        sessionStorage.removeItem("token");
        this.setState({
            user: null,
            failedAuth: true
        })
    };


    render() {
        if (this.state.failedAuth || !this.state.user) {
            return (
                <div>You must be logged in to see this page. <Link to='/'>Log In</Link></div>
            )
        }

        if (!this.state.user) {
            return (
                <div>Loading...</div>
            )
        }

        const { displayPicture, id, firstName, lastName, certification, yearsExperience, about } = this.state.user

        return (
            <div className='profile'>
                <DisplayPicture 
                    displayPicture={displayPicture}
                    name={firstName + " " + lastName}
                    certification={certification}
                    experience={yearsExperience}
                    />
                <article className='profile__info-card'>
                    {/* <div className='profile__personal-details'>
                        <p className='profile__user-name'>{firstName} {lastName}</p>
                        <p className='profile__cert'>Certification: <span>{certification}</span></p>
                        <p className='profile__years'>Years of experience: <span>{yearsExperience}</span></p>
                    </div> */}
                    <div className='profile__personal-details'>
                        <p className='profile__about'>{about}</p>
                    </div>
                </article>
                <div className='profile__link-container'>
                    <Link to='/search' className='profile__link'>Search for a dive location!</Link>
                    <Link to={'/' + id + '/find'} className='profile__link'>Find a buddy!</Link>
                </div>
                <button className='profile__logout' onClick={this.handleLogout}>Log Out</button>
            </div>
        );
    }
}
