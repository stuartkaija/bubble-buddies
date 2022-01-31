import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import WaterIcon from '@mui/icons-material/Water';
import arrow from '../../assets/icons/arrow_back-24px.svg';

export default class Header extends Component {

    state = {
        menu: null
    }
    
    openMenu = () => {
        if (this.state.menu) {            
            this.setState({menu: null});
            return
        }
        this.setState({menu: true})
    };

    render() {
        return (
            <nav className='header-nav'>
                <Link to ='/'>
                    <img src={arrow} alt="back arrow icon" />
                </Link>
                <h1 className='header-nav__title'>Bubble Buddies</h1>
                <button className='header-nav__menu-button' onClick={this.openMenu}><WaterIcon className='test'/></button>
                <div id='hidden-menu' className={this.state.menu ? 'header-nav__visible-menu' : 'header-nav__hidden-menu'}>
                    <Link className='header-nav__menu-links' to=''>find a buddy</Link>
                    <Link className='header-nav__menu-links' to=''>search for a spot</Link>
                    <Link className='header-nav__menu-links' to=''>edit profile</Link>
                    <Link className='header-nav__menu-links' to=''>logout</Link>
                </div>
            </nav>
        );
    }
}