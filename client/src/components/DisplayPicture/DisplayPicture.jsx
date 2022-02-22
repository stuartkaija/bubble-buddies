import React from 'react';
import './DisplayPicture.scss';

export default function DisplayPicture({ displayPicture, name, certification, experience }) {
    return (
        <div className='display-pic'>
            <img className='display-pic__image' src={displayPicture} alt="profile picture" />
            <div className='display-pic__details'>
                <p className='display-pic__details--name'>{name}</p>
                <p className='display-pic__details--cert'>Certification: {certification}</p>
                <p className='display-pic__details--exp'>Years of experiece: {experience}</p>
            </div>
        </div>
    );
}
