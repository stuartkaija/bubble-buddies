import React from 'react';
import './DisplayPicture.scss';

export default function DisplayPic(props) {
  return (
        <img className='profile-picture' src={props.profilePic} alt="profile picture" />
        
    );
}
