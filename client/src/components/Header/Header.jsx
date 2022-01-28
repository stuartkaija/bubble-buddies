import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
// import WaterIcon from '@mui/icons-material/Water';

export default function Header() {

    const openMenu = () => {
        
    };

    return (
        <nav className='header-nav'>
            {/* if user has a profile, this will link to it, otherwise will link to create profile page */}
            {/* <Link to ='/'>Image here</Link> */}
            <h1 className='header-nav__title'>Bubble Buddies</h1>
            {/* this will link to drop down burger style menu with options to meet people tinder style, or check out sea conditions with Magic Seaweed API, need to figure out how to make this style menu */}
            {/* <Link to='/'></Link> */}
            {/* <button className='header-nav__menu-button' onClick={openMenu}><WaterIcon color='primary'/></button>
            <div className='header-nav__hidden-menu'>
              <Link className='header-nav__menu-links' to=''>find a buddy</Link>
              <Link className='header-nav__menu-links' to=''>search for a spot</Link>
              <Link className='header-nav__menu-links' to=''>edit profile</Link>
              <Link className='header-nav__menu-links' to=''>logout</Link>
            </div> */}
        </nav>
    );
}
