import React from 'react';
import './DisplayPicture.scss';

import demoPic from '../../assets/photos/sebastian-pena-lambarri-7i5HMCGupVw-unsplash.jpg';


export default function DisplayPicture({ name, certification, experience }) {
    return (
        <div className='display-pic'>
            <img className='display-pic__image' src={demoPic} alt="profile picture" />
            <div className='display-pic__details'>
                <p className='display-pic__details--name'>Name: {name}</p>
                <p className='display-pic__details--cert'>Certification: {certification}</p>
                <p className='display-pic__details--exp'>Years of experiece: {experience}</p>
            </div>
        </div>
    );
}
