import React, { Component } from 'react';
import './ProfilePage.scss';
import DisplayPicture from '../../components/DisplayPicture/DisplayPicture';
import profilePic from "../../assets/photos/sebastian-pena-lambarri-7i5HMCGupVw-unsplash.jpg";

export default class ProfilePage extends Component {

    // I think this will state, and it'll be whichever user is currently logged in, which will then populate the details of this component
    state = {
        user: {
            id: "1234",
            email: "",
            firstName: "John",
            lastName: "Doe",
            userName: "ScubaJohn",
            certification: "PADI Dive Master",
            yearsExperience: 17,
            URL: "https://unsplash.com/photos/_8b7AW-p3Js"
        }
    }

    render() {
        return (
            <div className='profile'>
                <DisplayPicture profilePic={this.state.user.URL} />
                <article className='profile__info-card'>
                    <div className='profile__personal-details'>
                        <p className='profile__user-name'>{this.state.user.userName}</p>
                        <p className='profile__cert'>Certification: <span>{this.state.user.certification}</span></p>
                        <p className='profile__years'>Years of experience: <span>{this.state.user.yearsExperience}</span></p>
                    </div>
                    <div className='profile__personal-details'>
                        <p className='profile__about'>About: This is an about section and will need to be populated with information from the backend in the JSON file</p>
                    </div>
                </article>
            </div>
        );
    }
}
