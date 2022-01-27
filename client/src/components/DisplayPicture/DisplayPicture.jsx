import React from 'react';
import './DisplayPicture.scss';

import demoPic from '../../assets/photos/sebastian-pena-lambarri-7i5HMCGupVw-unsplash.jpg';


export default function DisplayPicture() {
    return (
        <img className='profile-picture' src={demoPic} alt="profile picture" />
    );
}
