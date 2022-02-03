import React, { Component } from 'react';
import './ProfilePage.scss';
import Header from '../../components/Header/Header';
import HeaderLoggedOut from '../../components/HeaderLoggedOut/HeaderLoggedOut';
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
                <div className='catch'>
                    <HeaderLoggedOut />
                    <p className='catch__sentence'>You must be logged in to see this page.</p>
                    <Link className='catch__button' to='/'>Log In</Link>
                </div>
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
                <Header 
                    logout={this.handleLogout}
                    id={id}
                    />
                <DisplayPicture 
                    displayPicture={displayPicture}
                    name={firstName + " " + lastName}
                    certification={certification}
                    experience={yearsExperience}
                    />
                <article className='profile__info-card'>
                        <p className='profile__about'>{about}</p>
                </article>
                <div className='profile__link-container'>
                    <Link to='/search' className='profile__link'>Search for a dive location!</Link>
                    <Link to={'/' + id + '/find'} className='profile__link'>Find a buddy!</Link>
                </div>
                {/* <button className='profile__logout' onClick={this.handleLogout}>Log Out</button> */}
            </div>
        );
    }
}
