import React from 'react';
import './DisplayPicture.scss';

export default function DisplayPic(props) {
  return (
        <div>
            <img className='profile-picture' src={props.profilePic} alt="profile picture" />
        </div>
    );
}
