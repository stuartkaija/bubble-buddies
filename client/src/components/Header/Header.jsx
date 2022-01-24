import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export default function Header() {
  return (
    <nav className='header-nav'>
        {/* if user has a profile, this will link to it, otherwise will link to create profile page */}
        {/* <Link to ='/'>Image here</Link> */}
        <h1 className='header-nav__title'>Bubble Buddies</h1>
        {/* this will link to drop down burger style menu with options to meet people tinder style, or check out sea conditions with Magic Seaweed API, need to figure out how to make this style menu */}
        {/* <Link to='/'></Link> */}
    </nav>
  );
}
